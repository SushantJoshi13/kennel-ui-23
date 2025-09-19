import React, { useState } from "react";
import InputComponent from "../components/InputComponent";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { toastConfig } from "../constants/toast.constant";
import { useNavigate } from "react-router";
import logo from "../assets/Logos/NewLogo.png";
import CountryDropDown from "../components/CountryDropDown";
import CountryIds from "../assets/JSON/CountryIds.json";
import { RegisterValidation } from "../schemas/Validator";

const NewRegister = () => {
  const { loading, submit } = useSubmitForm();
  const [idName, setIdName] = useState("Identification Document");
  const nav = useNavigate();

  const Register = async (values) => {
    const formData = new FormData();
    formData.append("user_name", values.first_name + " " + values.last_name);
    formData.append("email", values.email);
    formData.append("user_role_id", values.isBreeder ? 1 : 2);
    formData.append("password", values.password);
    formData.append("contact_no", values.contact_no);
    formData.append("identity_doc_name", values.identification_doc);
    formData.append("identification_id_no", values.identification_no);
    formData.append("identification_id_name", idName);
    formData.append("user_country", values.country);
    formData.append("user_address", values.address);

    const response = await submit("POST", "auth/individual", formData, {
      "Content-Type": "multipart/form-data",
    });

    if (response?.data.statusCode === 200) {
      toast.success(response?.data?.message, toastConfig);
      nav("/login");
    } else {
      toast.error(response?.data?.message, toastConfig);
    }
  };

  const getCountryData = (name) => {
    const data = CountryIds.filter((c) => {
      return c.Country === name;
    });
    if (data[0]?.hasOwnProperty("Name")) {
      // formik.setFieldValue("identification_name", data[0]?.Name);
      setIdName(data[0]?.Name);
      return;
    }
    return setIdName("Identity Document Number");
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      contact_no: "",
      country: "",
      identification_name: "", // eg Passport
      identification_no: "", // eg 123
      identification_doc: null, // file
      isBreeder: true,
      address: "",
    },
    validationSchema: RegisterValidation,
    validateOnChange: false,
    onSubmit: (data) => Register(data),
  });
  return (
    <section className="flex h-full min-h-screen items-center bg-primary p-5 font-poppins font-medium text-white">
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
      <div className="container mx-auto grid grid-cols-1 items-center md:grid-cols-3">
        <div className="col-span-1 grid grid-rows-2 items-center justify-center md:h-min">
          <img
            src={logo}
            alt="Breeder's Association Logo"
            className="mx-auto  flex h-20 rounded-lg md:h-44"
          />
          <div className="mt-6 flex items-center justify-center gap-1 md:h-min">
            <div className="text-sm text-slate-300 md:text-base">
              Already a user?{" "}
            </div>
            <button
              className="cursor-pointer items-end text-base font-bold text-red-500 underline"
              onClick={() => nav("/login")}
            >
              Login
            </button>
          </div>
        </div>
        <div className="xs:my-0 col-span-2 mx-auto my-2 rounded-2xl bg-primary px-5 pt-3 sm:px-5">
          <div className="grid-cols-1 gap-5 md:grid">
            <div className="block justify-center sm:items-center">
              <h1 className="w-100 block text-2xl font-semibold text-white">
                Welcome!
              </h1>
              <p className="pt-3 text-white">Please Register</p>
              <form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
              >
                <div className="my-4">
                  <div className="mb-2">
                    <label htmlFor="breeder">
                      <input
                        className="mx-1"
                        id="breeder"
                        type="radio"
                        name="person_type"
                        value="breeder"
                        checked={formik.values.isBreeder}
                        onChange={() => {
                          formik.setFieldValue("isBreeder", true);
                        }}
                      />
                      Breeder
                    </label>
                    <label htmlFor="individual">
                      <input
                        className="ml-5 mr-1"
                        id="individual"
                        type="radio"
                        checked={!formik.values.isBreeder}
                        name="person_type"
                        value="individual"
                        onChange={() => {
                          formik.setFieldValue("isBreeder", false);
                        }}
                      />
                      Individual
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InputComponent
                      id="first_name"
                      name="first_name"
                      placeholder="First Name"
                      type="text"
                      value={formik.values.first_name}
                      onChange={formik.handleChange}
                      errorMessage={
                        formik.touched.first_name
                          ? formik.errors.first_name
                          : ""
                      }
                    />
                    <InputComponent
                      id="last_name"
                      name="last_name"
                      placeholder="Last Name"
                      type="text"
                      value={formik.values.last_name}
                      onChange={formik.handleChange}
                      errorMessage={
                        formik.touched.last_name ? formik.errors.last_name : ""
                      }
                    />
                    <InputComponent
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      errorMessage={
                        formik.touched.email ? formik.errors.email : ""
                      }
                    />
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
                      id="contact_no"
                      name="contact_no"
                      placeholder="Contact Number"
                      type="number"
                      value={formik.values.cont_no}
                      onChange={formik.handleChange}
                      errorMessage={
                        formik.touched.contact_no
                          ? formik.errors.contact_no
                          : ""
                      }
                    />
                    <CountryDropDown
                      value={formik.values.country}
                      onChange={(e) => {
                        formik.setFieldValue("country", e.target.value);
                        getCountryData(e.target.value);
                      }}
                      errorMessage={
                        formik.touched.country ? formik.errors.country : ""
                      }
                    />

                    <InputComponent
                      id="identification_no"
                      name="identification_no"
                      placeholder={idName}
                      type="text"
                      value={formik.values.identification_no}
                      onChange={formik.handleChange}
                      errorMessage={
                        formik.touched.identification_no
                          ? formik.errors.identification_no
                          : ""
                      }
                    />
                    <div className="flex flex-col">
                      <label
                        className="mt-4 text-sm font-medium"
                        htmlFor="identification_doc"
                      >
                        Upload {idName}
                      </label>
                      <input
                        className="my-2 h-12 w-full rounded-lg border bg-transparent px-3 py-3 text-white shadow-md outline-gray-700 hover:shadow-xl hover:outline-none md:h-14"
                        id="identification_doc"
                        name="identification_doc"
                        type="file"
                        onChange={(e) =>
                          formik.setFieldValue(
                            "identification_doc",
                            e.target.files[0]
                          )
                        }
                      />
                      <small className="pl-2 text-xs text-red-500">
                        {formik.touched.identification_doc
                          ? formik.errors.identification_doc
                          : ""}
                      </small>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="text-sm font-medium text-white">
                      Address
                    </label>
                    <textarea
                      name="address"
                      id="address"
                      placeholder="Enter Your Address"
                      className="my-2 h-12 min-h-[150px] w-full rounded-lg border bg-transparent px-3 py-3 text-white shadow-md outline-gray-700 hover:shadow-xl hover:outline-none md:h-14"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      errorMessage={
                        formik.touched.address ? formik.errors.address : ""
                      }
                    />
                    <small className="pl-2 text-xs text-red-500">
                      {formik.touched.address ? formik.errors.address : ""}
                    </small>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary m-auto mt-4 flex w-full items-center justify-center rounded-md py-1 text-white"
                  >
                    {loading ? <span className="loader"></span> : "Register"}
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

export default NewRegister;
