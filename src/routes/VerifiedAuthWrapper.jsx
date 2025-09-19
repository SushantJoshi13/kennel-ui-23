import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { toastConfig } from "../constants/toast.constant";
import { useNavigate } from "react-router";
import useAuth from "../context/userContext";

const VerifiedAuthWrapper = (props) => {
  const { user, isSubscribed } = useAuth();
  const nav = useNavigate();
  useEffect(() => {
    if (user) {
      if (user.user_status !== 1) {
        toast.error(
          "Profile is not verified. Please contact admin",
          toastConfig
        );
        nav("/");
      }

      if (!isSubscribed) {
        toast.error("Please buy membership to access", toastConfig);
        nav("/subscription");
      }
    }
  }, [user, isSubscribed]);
  return (
    <React.Fragment>
      {user?.user_status === 1 ? (
        props.children
      ) : (
        <div className="flex h-screen w-full items-center justify-center">
          <span className="loader"></span>
        </div>
      )}
    </React.Fragment>
  );
};

export default VerifiedAuthWrapper;
