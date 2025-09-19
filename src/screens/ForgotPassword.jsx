import React from "react";
import InputComponent from "../components/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { toastConfig } from "../constants/toast.constant";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { loading, submit } = useSubmitForm();
  const nav = useNavigate();

  const forgotPasswordValidation = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
  });

  var forgotPasswordData;
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordValidation,
    onSubmit: async (values) => {
      forgotPasswordData = {
        email: formik.values.email,
      };

      const response = await submit(
        "POST",
        "auth/forgot-password",
        forgotPasswordData
      );

      if (
        response?.data?.data?.statusCode === 200 ||
        response?.status === 201
      ) {
        toast.success("Reset Password Link sent to your email successfully!");
        nav("/login");
      } else {
        toast.error(response?.data?.data?.message, toastConfig);
      }
      console.log(response);
    },
  });

  return (
    <section className="h-screen bg-primary p-7 font-poppins">
      <div className="max-w-10 container mx-auto">
        <div className="mx-auto h-auto rounded-2xl bg-primary py-8 sm:w-3/4 sm:px-8 md:w-3/4 md:px-10 lg:w-5/12">
          <p className="text-2xl font-semibold text-white">
            Request for New Password
          </p>
          <form onSubmit={formik.handleSubmit}>
            <InputComponent
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              errorMessage={formik.touched.email ? formik.errors.email : ""}
            />
            <button
              type="submit"
              className="btn-primary mt-4 flex w-full items-center justify-center rounded-md py-1 font-semibold text-white hover:shadow-xl disabled:bg-slate-500"
            >
              {loading ? <span className="loader"></span> : "Request Reset Password Link"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default ForgotPassword;
