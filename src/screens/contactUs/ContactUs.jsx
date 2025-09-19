import { useFormik } from "formik";
import React, { useState } from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { HiLocationMarker, HiMail } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import HappyDog from "../../assets/Images/contact-bg.png";
import ContactUsInput from "../../components/ContactUsInput";
import { toastConfig } from "../../constants/toast.constant";
import { postApi } from "../../service/axios.service";

const ContactUs = () => {
  const validationSchema = yup.object({
    first_name: yup
      .string("Enter your first name")
      .required("First name is required"),
    last_name: yup
      .string("Enter your last name")
      .required("Last name is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    subject: yup.string("Enter your subject").required("Subject is required"),
    message: yup.string("Enter your message").required("Message is required"),
  });
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, action) => {
      setLoading(true);
      const contactFormData = {
        first_name: formik.values.first_name,
        last_name: formik.values.last_name,
        email: formik.values.email,
        subject: formik.values.subject,
        message: formik.values.message,
      };
      const result = await postApi(
        "auth/test-email-service",
        contactFormData,
        false
      );
      if (result.status === 200 || result.status === 201) {
        toast.success("We will contact you soon!", toastConfig);
      } else {
        toast.error("Something went wrong. Please try again!", toastConfig);
      }
      action.resetForm();
      setLoading(false);
    },
  });
  return (
    <div>
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
      <div
        className="relative bg-cover bg-no-repeat p-12 text-center"
        style={{ backgroundImage: `url(${HappyDog})`, height: "400px" }}
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full  bg-fixed backdrop-brightness-[40%]">
          <div className="">
            <div className="text-white">
              <p className="mt-20 py-5 text-5xl font-semibold">Contact Us</p>
              <p className="text-center text-white">Get in Touch!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid-3 items-center px-5 pb-5 pt-10 md:px-20">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://maps.app.goo.gl/pdceZxEWS6ULieubA?g_st=iw"
          className="h-full"
        >
          <div className="group h-full cursor-pointer rounded border-b-8 border-yellow-500 bg-dark-blue p-5 hover:border-[#1C1E2A] hover:bg-main-yellow hover:duration-700">
            {/* <img src={Map} className="h-12" alt="alternate" /> */}
            <HiLocationMarker className="text-5xl text-main-yellow group-hover:text-dark-blue" />
            <p className="py-4 text-xl font-semibold text-white">
              Head Office Address
            </p>
            <p className="py-2 text-sm text-white">
              Sr no, 12/1, B RAMLILA, LANE NO 3, Adarsh Nagar, Wadgaon Sheri,
              Pune, Maharashtra 411014
            </p>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://maps.app.goo.gl/pdceZxEWS6ULieubA?g_st=iw"
              className="pb-2 pt-2 text-sm font-bold text-main-yellow group-hover:text-dark-blue"
            >
              Get Direction
            </a>
            <hr className="w-1/3 border border-main-yellow group-hover:border-[#1C1E2A]" />
          </div>
        </a>

        <a className="h-full" href="mailto:genuinebreederassociation@gmail.com">
          <div className="group h-full cursor-pointer rounded border-b-8 border-yellow-500 bg-dark-blue p-5 hover:border-[#1C1E2A] hover:bg-main-yellow hover:duration-700">
            {/* <img src={Mail} className="h-12" alt="alternate" /> */}
            <HiMail className="text-5xl text-main-yellow group-hover:text-dark-blue" />
            <p className="py-4 text-lg font-semibold text-white">
              Email Address
            </p>
            <p className="py-2 text-sm text-white ">
              genuinebreederassociation@gmail.com
            </p>

            <a
              href="mailto:genuinebreederassociation@gmail.com"
              className="pb-2 pt-2 text-sm font-bold text-main-yellow group-hover:text-dark-blue"
            >
              Contact Us
            </a>
            <hr className="w-1/3 border border-main-yellow group-hover:border-[#1C1E2A]" />
          </div>
        </a>

        <a className="h-full" href="https://wa.me/+918956643978">
          <div className="group h-full cursor-pointer rounded border-b-8 border-yellow-500 bg-dark-blue p-5 hover:border-[#1C1E2A] hover:bg-main-yellow hover:duration-700">
            {/* <img src={Call} className="h-12" alt="alternate" /> */}
            <BsTelephoneFill className="text-5xl text-main-yellow group-hover:text-dark-blue" />
            <p className="py-4 text-xl font-semibold text-white">
              Call / WhatsApp
            </p>
            <p className="py-2 text-sm text-white"> +91 89566 43978</p>
            <a
              href="https://wa.me/+918956643978"
              className="pb-2 pt-2 text-sm font-bold text-main-yellow group-hover:text-dark-blue"
            >
              Connect
            </a>
            <hr className="w-1/3 border border-main-yellow group-hover:border-[#1C1E2A]" />
          </div>
        </a>
      </div>
      <div className="grid-2 px-5 py-5 md:px-20">
        <div>
          <p className="flex items-center text-main-yellow">Get In Touch</p>
          <p className="py-5 text-2xl font-bold md:text-4xl">
            Get In Touch With Us & Leave a Message
          </p>
        </div>
        <form
          className="rounded border-b-4 border-[#1C1E2A]"
          onSubmit={formik.handleSubmit}
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 ">
            <div className="my-2">
              <ContactUsInput
                name="first_name"
                type="text"
                placeholder="First Name "
                value={formik.values.first_name}
                onChange={formik.handleChange}
                errorMessage={
                  formik.touched.first_name ? formik.errors.first_name : ""
                }
              />
            </div>
            <div className="my-2">
              <ContactUsInput
                name="last_name"
                type="text"
                placeholder="Last Name "
                value={formik.values.last_name}
                onChange={formik.handleChange}
                errorMessage={
                  formik.touched.last_name ? formik.errors.last_name : ""
                }
              />
            </div>
            <div className="my-2">
              <ContactUsInput
                name="email"
                type="email"
                placeholder="Email Id "
                value={formik.values.email}
                onChange={formik.handleChange}
                errorMessage={formik.touched.email ? formik.errors.email : ""}
              />
            </div>
            <div className="my-2">
              <ContactUsInput
                name="subject"
                type="text"
                placeholder="Subject "
                value={formik.values.subject}
                onChange={formik.handleChange}
                errorMessage={
                  formik.touched.subject ? formik.errors.subject : ""
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label className="">
                Your Message
                <span className="items-center text-xs text-red-600"> *</span>
              </label>
              <br />
              <textarea
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                className="h-20 w-full rounded border-b-4 border-yellow-300"
              ></textarea>
              <small className="pl-2 text-xs text-red-500">
                {formik.touched.message ? formik.errors.message : ""}
              </small>
            </div>
            <button
              type="submit"
              className="mb-4 rounded bg-main-yellow p-2 text-white"
            >
              {loading ? <span className="loader"></span> : "Send Message"}
            </button>
          </div>
        </form>
      </div>
      <div className="px-5 py-5 md:px-20"></div>
    </div>
  );
};

export default ContactUs;
