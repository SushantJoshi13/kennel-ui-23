import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getApi, postApi } from "../service/axios.service";
import logo from "../assets/Logos/latest_logo.png";
import useAuth from "./userContext";
import Modal from "../components/modal/Modal";
import { padTo2Digits } from "../utils/convertSeconds";
export const PaymentContext = createContext();
export const PAYMENT_STATUS = {
  PROCESSING: "processing",
  SUCCESS: "success",
  FAILED: "FAILED",
};

const minutesToShow = 5;
export const PaymentContextProvider = ({ children }) => {
  const { user } = useAuth();
  let intervalId;
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    cost_id: 0,
    user_id: 0,
    description: "",
    billing_address: "",
    user_name: "",
  });
  const [orderDetails, setOrderDetails] = useState();
  const [isTimerActive, setTimerActive] = useState(false);
  const [timer, setTimer] = useState(minutesToShow * 60);
  const [paymentStatus, setPaymentStatus] = useState("");
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    if (timer === 0) {
      setPaymentStatus(PAYMENT_STATUS.FAILED);
      setTimerActive(false);
    }
  }, [timer]);

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

    trialCount.current += 1;
  };

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

  const trialCount = useRef(0);
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

  const ccAvenuePayment = async (data) => {
    setPaymentData(data);
    const orderResponse = await postApi(`orders/ccAvenue`, data);
    console.log("orderResponse", orderResponse);
    setOrderDetails(orderResponse.data.data.order);
    setTimerActive(true);
    setPaymentStatus(PAYMENT_STATUS.PROCESSING);
    window.open(orderResponse.data.data.paymentLink, "_blank", "noreferrer");
  };

  // deprecated
  const createPayment = async (data, callback) => {
    setPaymentData(data);
    const payload = data;
    const orderResponse = await postApi(`orders`, payload);
    if (orderResponse.status === 200 || orderResponse.status === 201) {
      await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: data.amount.toString(),
        currency: "INR",
        name: data.description,
        description: data.description,
        image: { logo },
        order_id: orderResponse.data.data.razorpay_order.id,
        prefill: {
          name: user.user_name,
          email: user.email,
          contact: user.contact_no,
        },
        notes: {
          address: data.billing_address,
        },
        theme: {
          color: "#61dafb",
        },
        handler: async function (response) {
          const orderId = orderResponse.data.data.razorpay_order.id;

          const completeOrder = await postApi("orders/complete", {
            order_id: orderId,
            payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
          callback(completeOrder, orderResponse);

          // console.log('completeOrder', completeOrder);
        },
        // redirect: true,
        // callback_url: "http://localhost:8080/orders/complete",
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      paymentObject.on("payment.failed", function (response) {
        // console.log('failed respose', response);
      });
    }
  };
  return (
    <PaymentContext.Provider
      value={{
        createPayment,
        ccAvenuePayment,
        paymentStatus,
        orderDetails,
        setPaymentStatus,
      }}
    >
      {children}
      <Modal
        size="max-w-2xl"
        height="h-1/2"
        heading=" Processing Payment"
        isOpen={isTimerActive}
        setIsOpen={() => {}}
        hasDefaultButtons={false}
        child={
          <div className="flex flex-col py-5">
            <p className="text-center">Complete your payment!</p>
            <h1 className="text-center text-3xl font-bold text-main-yellow">
              {padTo2Digits(Math.floor(timer / 60))} :{" "}
              {padTo2Digits(timer % 60)}
            </h1>
            <p className="font-inter! mt-5 text-center text-sm text-primary">
              Processing your payment. Please do not close or refresh this page
            </p>
          </div>
        }
      />
    </PaymentContext.Provider>
  );
};

const usePayment = () => {
  return useContext(PaymentContext);
};

export default usePayment;
