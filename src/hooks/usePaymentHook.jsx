import { useEffect, useState } from "react";
import CostService from "../service/cost.service";
import { getTotalCost } from "../utils/getTotalCost";
import useAuth from "../context/userContext";
import { PAYMENT_STATUS } from "../context/PaymentContext";
import { getApi, postApi } from "../service/axios.service";
const minutesToShow = 5;

export const usePaymentHook = (costId, successFn, failureFn) => {
  let intervalId;
  const { user } = useAuth();
  const costService = new CostService();
  const [cost, setCost] = useState(null);
  const [orderDetails, setOrderDetails] = useState();
  const [isTimerActive, setTimerActive] = useState(false);
  const [timer, setTimer] = useState(minutesToShow * 60);
  const [paymentStatus, setPaymentStatus] = useState("");

  // useEffect to get cost of form
  useEffect(() => {
    const getCost = async () => {
      const res = await costService.getCostById(costId);
      setCost(res?.data?.data);
    };
    getCost();
  }, []);

  // fail the payment
  useEffect(() => {
    if (timer === 0) {
      setPaymentStatus(PAYMENT_STATUS.FAILED);
      setTimerActive(false);
    }
  }, [timer]);

  // fetch payment status
  useEffect(() => {
    if (isTimerActive) {
      intervalId = setInterval(getOrderStatus, 5 * 1000);
      setTimeout(() => {
        setTimerActive(false);
        clearInterval(intervalId);
        setPaymentStatus(PAYMENT_STATUS.FAILED);
        console.log(`Interval cleared after ${minutesToShow} minutes`);
      }, minutesToShow * 60 * 1000);
    } else {
      if (intervalId) clearInterval(intervalId);
    }
  }, [isTimerActive]);

  // tick the timer
  useEffect(() => {
    let timerId;
    if (isTimerActive) {
      timerId = setInterval(() => {
        if (timer > 0) {
          setTimer((prevTime) => prevTime - 1);
        }
      }, 1000);
    } else {
      if (timerId) clearInterval(timerId);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [timer, isTimerActive]);

  // check payment status
  useEffect(() => {
    if (paymentStatus === PAYMENT_STATUS.FAILED) {
      console.log("failed");
      failureFn();
    }
    if (paymentStatus === PAYMENT_STATUS.SUCCESS) {
      console.log("success");
      successFn();
    }
    if (paymentStatus === PAYMENT_STATUS.PROCESSING) {
      console.log("processing");
    }
  }, [paymentStatus]);

  const getOrderStatus = async () => {
    try {
      const order = await getApi(`orders/status/${orderDetails?.id}`);
      console.log("CHECK ORDER STATUS AFTER EVERY 5 SECONDS", order);

      if (order.status === 200) {
        if (order.data.data.status === 1) {
          clearInterval(intervalId);
          setPaymentStatus(PAYMENT_STATUS.SUCCESS);
          setTimerActive(false);
        } else if (order.data.data.status === 0) {
          clearInterval(intervalId);
          setPaymentStatus(PAYMENT_STATUS.FAILED);
          setTimerActive(false);
        }
      }
    } catch (error) {
      console.log("failed to fetch order");
    }
  };

  const initiatePayment = async () => {
    const payload = {
      amount: getTotalCost(Number(cost.amount), cost.tax, cost.delivery_fee),
      cost_id: cost.id ?? 3,
      description: cost.description,
      billing_address: user.user_address,
      user_id: user.id,
      user_name: user?.user_name,
    };

    await ccAvenuePayment(payload);
  };

  const ccAvenuePayment = async (data) => {
    const orderResponse = await postApi(`orders/ccAvenue`, data);
    console.log("orderResponse", orderResponse);
    setOrderDetails(orderResponse.data.data.order);
    setTimerActive(true);
    setPaymentStatus(PAYMENT_STATUS.PROCESSING);
    window.open(orderResponse.data.data.paymentLink, "_blank", "noreferrer");
  };

  const resetHook = () => {
    setPaymentStatus("");
    setOrderDetails();
    setTimerActive(false);
    setTimer(minutesToShow * 60);
  };
  return {
    initiatePayment,
    orderDetails,
    resetHook,
  };
};

// argument types
// costId:number
