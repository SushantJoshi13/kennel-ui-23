import { useLocation, useNavigate } from "react-router";
import React from "react";
import logo from "../assets/Logos/NewLogo.png";
import { useFormik } from "formik";
import * as yup from "yup";
import InputComponent from "../components/InputComponent";
import { toast, ToastContainer } from "react-toastify";
import { toastConfig } from "../constants/toast.constant";
import useAuth from "../context/userContext";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { userRoles } from "../constants/app.constants";

const Login = () => {
  const { loading, submit } = useSubmitForm();
  const { signIn } = useAuth();
  const location = useLocation();

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  var loginData;
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      loginData = {
        email: formik.values.email,
        password: formik.values.password,
      };

      const response = await submit("POST", "auth/login", loginData);

      if (response.data?.statusCode === 200 || response?.status === 201) {
        toast.success("Login Successful👍!", toastConfig);
        signIn(response?.data);
        if (response.data.data.user_role_id.role_name === userRoles[3]) {
          nav("/admin-layout/dashboard");
          return;
        } else {
          setTimeout(() => {
            if (location?.state?.from?.pathname) {
              nav(
                `${
                  location?.state?.from?.pathname +
                  location?.state?.from?.search
                }`,
                {
                  replace: true,
                }
              );
            } else {
              nav("/", { replace: true });
            }
          }, 1000);
        }
      } else {
        toast.error(
          !response?.data?.message.includes("Fatal")
            ? response?.data?.message
            : "Something Went Wrong!"
        );
      }
    },
  });

  const nav = useNavigate();
  return (
    <section className="flex h-screen items-center bg-primary p-7 font-poppins">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="max-w-10 container mx-auto">
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Breeder's Association Logo"
            className="h-44 rounded-lg"
          />
        </div>
        <div className="mx-auto h-auto rounded-2xl bg-primary py-8 sm:w-3/4 sm:px-8 md:w-3/4 md:px-10 lg:w-5/12">
          <div className="grid-cols-1 gap-5 md:grid">
            <div className="block justify-center sm:items-center">
              <h1 className="w-100 block text-2xl font-semibold text-white">
                Welcome Back!
              </h1>
              <p className="py-3 text-white">Please login to access</p>
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

                <InputComponent
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  errorMessage={
                    formik.touched.password ? formik.errors.password : ""
                  }
                />
                <div className="flex items-center justify-end gap-7 px-1 pb-3 pt-2">
                  <div>
                    <p className="cursor-pointer items-end text-xs text-white" onClick={() => nav("/forgot-password")}>
                      Forgot Password?
                    </p>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary m-auto flex w-full items-center justify-center  rounded-md py-1 font-semibold text-white hover:shadow-xl"
                >
                  {!loading ? "Login" : <span className="loader"></span>}
                </button>
                <div className="m-auto flex items-center justify-center gap-1 px-3 pt-3">
                  <div className="items-start text-xs text-white">
                    Don't have an account?{" "}
                  </div>
                  <button
                    onClick={() => nav("/register")}
                    className="items-end text-base font-bold text-red-500 underline"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
