import React from "react";
import InputComponent from "../components/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import { toastConfig } from "../constants/toast.constant";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router";
import { useSubmitForm } from "../hooks/useSubmitForm";

const ResetPassword = () => {
  const { loading, submit } = useSubmitForm();
  const nav = useNavigate();
  const search = useLocation().search;
  const requestToken = new URLSearchParams(search).get("requestToken");

  const resetPasswordValidation = yup.object({
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Must match password field value")
      .required("Please Confirm Password"),
  });

  var resetPasswordData;
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: resetPasswordValidation,
    onSubmit: async (values) => {
      resetPasswordData = {
        password: formik.values.password,
      };

      const response = await submit(
        "PUT",
        `auth/reset-password?token=${requestToken}`,
        resetPasswordData
      );
      console.log("resetResponse", response);

      if (response?.data?.statusCode === 200 || response?.status === 200) {
        toast.success("Password changed Successfully!", toastConfig);
        nav("/login");
      } else {
        toast.error(response?.data?.data?.message, toastConfig);
      }
    },
  });
  return (
    <section className="h-screen bg-primary p-7 font-poppins">
      <div className="max-w-10 container mx-auto">
        <div className="mx-auto h-auto rounded-2xl bg-primary py-8 sm:w-3/4 sm:px-8 md:w-3/4 md:px-10 lg:w-5/12">
          <p className="text-2xl font-semibold text-white">Reset Password</p>
          <form onSubmit={formik.handleSubmit}>
            <InputComponent
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              errorMessage={
                formik.touched.password ? formik.errors.password : ""
              }
            />
            <InputComponent
              id="confirm_password"
              name="confirm_password"
              placeholder="Confirm Password"
              type="password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              errorMessage={
                formik.touched.confirm_password
                  ? formik.errors.confirm_password
                  : ""
              }
            />
            <button
              type="submit"
              className="btn-primary mt-4 flex w-full items-center justify-center rounded-md py-1 font-semibold text-white hover:shadow-xl disabled:bg-slate-500"
            >
              {loading ? <span className="loader"></span> : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};
export default ResetPassword;
