import React, { useEffect, useState } from "react";
import {
  FcCollaboration,
  FcGraduationCap,
  FcPodiumWithAudience,
  FcReading,
  FcRules,
} from "react-icons/fc";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import SubscriptionCard from "../components/cards/SubscriptionCard";
import { toastConfig } from "../constants/toast.constant";
import usePayment, { PAYMENT_STATUS } from "../context/PaymentContext";
import useAuth from "../context/userContext";
import { useSubmitForm } from "../hooks/useSubmitForm";
import CostService from "../service/cost.service";
import { getTotalCost } from "../utils/getTotalCost";

const subscriptionCardsData = [
  {
    image: <FcGraduationCap size={50} />,
    title: "Education",
  },
  {
    image: <FcReading size={50} />,
    title: "Legal Support",
  },
  {
    image: <FcRules size={50} />,
    title: "New Rules / Guidelines",
  },
  {
    image: <FcCollaboration size={50} />,
    title: "Consulting",
  },
  {
    image: <FcPodiumWithAudience size={50} />,
    title: "Breeder and family welfare program",
  },
];

const Subscription = () => {
  const [loading, setLoading] = useState(false);
  const { ccAvenuePayment, paymentStatus, orderDetails, setPaymentStatus } =
    usePayment();
  const { submit } = useSubmitForm();
  const [costs, setCosts] = useState({});
  const { user, setIsSubscribed, isSubscribed, isLoggedIn } = useAuth();
  const service = new CostService();
  const getCosts = async () => {
    const response = await service.getCostById(1);
    if (response.data?.statusCode === 200 || response?.status === 200) {
      setCosts(response?.data?.data);
    }
  };
  useEffect(() => {
    if (isLoggedIn) getCosts();
  }, [isLoggedIn]);

  useEffect(() => {
    if (paymentStatus === PAYMENT_STATUS.FAILED) {
      console.log("failed");
      failedPayment();
    }
    if (paymentStatus === PAYMENT_STATUS.SUCCESS) {
      console.log("success");
      confirmMembership();
    }
    if (paymentStatus === PAYMENT_STATUS.PROCESSING) {
      console.log("processing");
    }
  }, [paymentStatus]);
  const navigate = useNavigate();
  const buy = async () => {
    setLoading(true);
    const payload = {
      amount: getTotalCost(Number(costs.amount), costs.tax, costs.delivery_fee),
      cost_id: 1,
      description: costs.description,
      billing_address: user?.user_address,
      user_id: user?.id,
      user_name: user?.user_name,
    };

    await ccAvenuePayment(payload);
  };
  const failedPayment = () => {
    navigate(`/payment?order_id=${orderDetails?.id}`);
  };
  const confirmMembership = async () => {
    setPaymentStatus("");
    const res = await submit("POST", "subscription/buy", {
      user_id: user.id,
      amount: Number(costs.amount),
      order_id: orderDetails?.id,
    });
    if (res.data?.statusCode === 200) {
      toast.success("You are a premium member! Welcome.", toastConfig);
      setIsSubscribed(true);
    } else {
      toast.error("Something went wrong. Please try again later", toastConfig);
    }
    setLoading(false);
  };
  const goToLogin = () => {
    toast.info("Please register / login to continue", toastConfig);
    setTimeout(() => {
      navigate("/login", { state: { from: "/subscription" }, replace: true });
    }, 2000);
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute z-10 flex h-full w-full items-center justify-center bg-white bg-opacity-60">
          <div className="flex items-center">
            <span className="mr-4 text-3xl">Loading</span>
            <svg
              className="h-8 w-8 animate-spin text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      )}

      <section className="mt-20 h-full p-7 font-poppins ">
        <section className="flex items-center  justify-center text-black">
          <div className="flex w-full flex-col justify-evenly gap-6 md:flex-row">
            <div>
              <img
                src={require("../../src/assets/Images/sub-img.png")}
                alt=""
              />
            </div>
            <div>
              <h1 className="text-base font-bold md:text-5xl">
                One Membership, <br /> Many Benefits
              </h1>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div>
            <h1 className="cursor-pointer py-3 text-center text-3xl font-medium text-black hover:underline">
              - Benefits for Member -
            </h1>
          </div>
          <div className="grid-3">
            {subscriptionCardsData.map((card, index) => (
              <SubscriptionCard
                key={index}
                image={card.image}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </section>
        {!isSubscribed && (
          <div className="flex justify-center py-6">
            <button
              className="btn rounded-md bg-main-yellow px-6 py-2 text-xl text-white outline-none transition-all duration-300 hover:bg-opacity-60 "
              onClick={() => {
                isLoggedIn ? buy() : goToLogin();
              }}
            >
              Buy Membership now
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Subscription;
