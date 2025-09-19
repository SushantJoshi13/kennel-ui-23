import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAuth from "../context/userContext";
import { getApi, postApi } from "../service/axios.service";
import Modal from "../components/modal/Modal";
import { paymentMinutesToShow } from "../constants/app.constants";
import { PAYMENT_STATUS } from "../context/PaymentContext";
import { padTo2Digits } from "../utils/convertSeconds";

export const CourseDetails = () => {
  const [details, setDetails] = useState();
  const { user, setIsSubscribed, isSubscribed, isLoggedIn } = useAuth();
  const nav = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    fetchDetails();
  }, [id]);
  const fetchDetails = async () => {
    const response = await getApi(`courses/${id}`);
    setDetails(response.data.data);
  };

  //   payment timers
  let intervalId;
  const [isTimerActive, setTimerActive] = useState(false);
  const [timer, setTimer] = useState(paymentMinutesToShow * 60);
  const [orderDetails, setOrderDetails] = useState();

  const [paymentStatus, setPaymentStatus] = useState("");
  const trialCount = useRef(0);
  useEffect(() => {
    if (isTimerActive) {
      intervalId = setInterval(getOrderStatus, 5 * 1000);
      setTimeout(() => {
        setTimerActive(false);
        clearInterval(intervalId);
        setPaymentStatus(PAYMENT_STATUS.FAILED);
        failedPayment();
        console.log(`Interval cleared after ${paymentMinutesToShow} minutes`);
      }, paymentMinutesToShow * 60 * 1000);
    } else {
      if (intervalId) clearInterval(intervalId);
    }
  }, [isTimerActive]);
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
  const getOrderStatus = async () => {
    try {
      const order = await getApi(`userCourse?id=${orderDetails?.id}`);
      console.log("CHECK ORDER STATUS AFTER EVERY 5 SECONDS", order);
      const details = order.data.data[0];
      if (order.status === 200) {
        if (details?.payment_status === 1) {
          clearInterval(intervalId);
          setPaymentStatus(PAYMENT_STATUS.SUCCESS);
          setTimerActive(false);
        } else if (details?.payment_status === 0) {
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
  const initiatePayment = async () => {
    const response = await postApi(
      "userCourse/initiate",
      {
        userId: user.id,
        amount: Number(details?.fees),
        userName: user.user_name,
        billingAddress: user?.user_address,
        description: `Payment to buy course: ${details?.name}`,
        courseId: id,
      },
      true
    );
    if (response.data.statusCode === 200) {
      setTimerActive(true);
      setOrderDetails(response.data.data.userCourseEntry);
      setPaymentStatus(PAYMENT_STATUS.PROCESSING);
      window.open(response.data.data.orderLink, "_blank", "noreferrer");
    } else {
      alert("Failed to create order");
    }
  };
  const failedPayment = () => {
    nav(`/payment?order_id=${orderDetails?.order_id}`);
  };
  const redirect = () => {
    nav("/login");
  };
  return (
    <div className="min-h-[90vh]">
      <div className="mt-10 p-5 md:p-10">
        <h3 className="text-center text-3xl font-semibold">Course Details</h3>

        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-2">
            <h3 className="text-center font-poppins text-4xl font-bold uppercase">
              {details?.name}
            </h3>
            <img
              className="m-auto self-center"
              src={details?.image}
              alt={details?.name}
            />
            <div className="my-5 flex flex-wrap items-center justify-between">
              <p className="flex items-center">Fees: ₹ {details?.fees}</p>
              <p className="flex items-center">
                Start Date: {details?.start_date}
              </p>
              <p className="flex items-center">End Date: {details?.end_date}</p>
            </div>
            <p dangerouslySetInnerHTML={{ __html: details?.syllabus }} />
            <button
              onClick={() => (isLoggedIn ? initiatePayment() : redirect())}
              className="btn-primary my-5 "
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
      <Modal
        size="max-w-2xl"
        height="h-1/2"
        heading=" Processing Payment"
        isOpen={isTimerActive}
        setIsOpen={() => {}}
        hasDefaultButtons={false}
        showHeaderClose={false}
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
    </div>
  );
};
