import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import InputComponent from "../components/InputComponent";
import TermsCheckbox from "../components/input/TermsCheckbox";
import { toastConfig } from "../constants/toast.constant";
import usePayment, { PAYMENT_STATUS } from "../context/PaymentContext";
import useAuth from "../context/userContext";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { changePetNameSchema } from "../schemas/Validator";
import { getApi } from "../service/axios.service";
import CostService from "../service/cost.service";
import { getTotalCost } from "../utils/getTotalCost";

const ChangePetName = () => {
  const nav = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [btnLoader, setLoader] = useState(false);
  const { loading, submit } = useSubmitForm();
  const { user } = useAuth();
  const [Animals, setAnimals] = useState([]);
  const [cost, setCost] = useState(null);
  // cost service
  const costService = new CostService();
  const { ccAvenuePayment, paymentStatus, orderDetails, setPaymentStatus } =
    usePayment();

  // useEffect to get cost of form
  useEffect(() => {
    const getCost = async () => {
      const res = await costService.getCostById(5);
      setCost(res?.data?.data);
    };
    getCost();
  }, []);

  const [formData, setFormData] = useState();
  useEffect(() => {
    if (paymentStatus === PAYMENT_STATUS.FAILED) {
      console.log("failed");
      failedPayment();
    }
    if (paymentStatus === PAYMENT_STATUS.SUCCESS) {
      console.log("success");
      submitNameChange(formData);
    }
    if (paymentStatus === PAYMENT_STATUS.PROCESSING) {
      console.log("processing");
    }
  }, [paymentStatus]);
  const failedPayment = () => {
    nav(`/payment?order_id=${orderDetails?.id}`);
  };
  const initiatePayment = async () => {
    const payload = {
      amount: getTotalCost(Number(cost.amount), cost.tax, cost.delivery_fee),
      cost_id: cost.id ?? 5,
      description: cost.description,
      billing_address: user.user_address,
      user_id: user.id,
      user_name: user?.user_name,
    };

    await ccAvenuePayment(payload);
  };
  const submitNameChange = async (data) => {
    const res = await submit("POST", "animal/changeName", {
      animal_registration_number: data?.animal_registration_number,
      name: data?.name,
    });
    setPaymentStatus("");
    if (res.data?.statusCode === 200 || res.status === 200) {
      setLoader(false);
      toast.success(res.data?.message, toastConfig);
      nav("/services");
    } else {
      toast.error(res.data?.message, toastConfig);
    }
    setLoader(false);
  };
  const changeName = async (data) => {
    setLoader(true);
    if (cost !== null) {
      setFormData(data);
      initiatePayment();
    } else {
      toast.error(
        "Something went wrong. Please try by refreshing the page",
        toastConfig
      );
      setLoader(false);
      return;
    }
  };

  const formik = useFormik({
    initialValues: {
      animal_registration_number: "",
      name: "",
      terms: false,
    },
    validationSchema: changePetNameSchema,
    onSubmit: (data) => changeName(data),
  });

  useEffect(() => {
    const getAnimals = async () => {
      const res = await getApi(`animal/getAnimals?user_id=${user.id}`);
      setAnimals(res.data.data);
    };
    getAnimals();
  }, [user?.id]);
  return (
    <section className="h-screen bg-primary  p-7 font-poppins">
      <div className="max-w-10 container mx-auto">
        <div className="mx-auto h-auto rounded-2xl bg-primary py-8 sm:w-3/4 sm:px-8 md:w-3/4 md:px-10 lg:w-5/12">
          <p className="mb-4 text-2xl font-semibold text-white">
            Change Animal Name
          </p>
          <form onSubmit={formik.handleSubmit}>
            <label className="mt-4 text-sm font-medium text-white">
              Select Animal
            </label>
            <select
              className="my-2 h-12 w-full rounded-lg border bg-transparent px-3 py-3 text-white shadow-md outline-gray-700 hover:shadow-xl hover:outline-none md:h-14"
              onChange={formik.handleChange}
              name="animal_registration_number"
            >
              <option value={""} className="text-black" disabled selected>
                Select Animal
              </option>
              {Animals?.map((d, i) => {
                return (
                  <option
                    key={i}
                    value={d.animal_registration_number}
                    className="text-black"
                  >
                    {d.animal_name} ({d.animal_breed_id.animal_breed_name})
                  </option>
                );
              })}
            </select>
            {formik.errors && (
              <span className="text-red-500">
                {formik.errors.animal_registration_number}
              </span>
            )}

            <InputComponent
              name="name"
              type="text"
              placeholder="Enter New Name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors && (
              <span className="text-red-500">{formik.errors.name}</span>
            )}
            <TermsCheckbox
              onChange={(checked) => formik.setFieldValue("terms", checked)}
              name={"terms"}
              error={formik.errors.terms}
              termTitle={""}
              linkTitle={"Terms & condition"}
              termContent={
                <p>
                  I certify that the particulars are true to the best of my
                  knowledge and belief, and the domestic animal that I apply to register
                  under the GENUINE BREEDER ASSOCIATION rules and regulations is
                  solely and unconditionally my property. This application for
                  registration is made by me under the GENUINE BREEDER
                  ASSOCIATION rules.
                </p>
              }
              modalTitle={"Change Pet"}
            />
            {formik.errors && (
              <span className="text-red-500">
                {formik.errors.accept_condition}
              </span>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary mt-4 w-full"
            >
              {loading || btnLoader ? (
                <span className="loader"></span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePetName;
