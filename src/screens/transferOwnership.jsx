import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import InputComponent from "../components/InputComponent";
import TermsCheckbox from "../components/input/TermsCheckbox";
import { toastConfig } from "../constants/toast.constant";
import useAuth from "../context/userContext";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { AnimalByRegNoValidation } from "../schemas/Validator";
import { getApi } from "../service/axios.service";
import CostService from "../service/cost.service";
import usePayment, { PAYMENT_STATUS } from "../context/PaymentContext";
import { getTotalCost } from "../utils/getTotalCost";

const TransferOwnership = () => {
  const [isAnimalFounded, setAnimalFounded] = useState(false);
  const [animalDetails, setAnimalDetails] = useState({});
  const [loader, setLoader] = useState(false);
  const { loading, submit } = useSubmitForm();
  const { user } = useAuth();
  const nav = useNavigate();
  const costService = new CostService();
  const [cost, setCost] = useState(null);
  const { ccAvenuePayment, paymentStatus, orderDetails, setPaymentStatus } =
    usePayment();
  useEffect(() => {
    const getCost = async () => {
      const res = await costService.getCostById(5);
      setCost(res?.data?.data);
    };
    getCost();
  }, []);

  const getAnimalByRegNo = async (data) => {
    const response = await getApi(
      `animal/getAnimalByRegNo?reg_no=${data.registerNumber}`
    );

    if (response?.data?.statusCode === 201 || response?.status === 200) {
      // console.log('animal', response?.data);
      if (response?.data?.data?.animal_current_owner?.id === user?.id) {
        toast.error("You are already owner of this animal", toastConfig);
        return;
      }
      setAnimalDetails(response?.data?.data);
      setAnimalFounded(true);
    } else {
      // console.log('error', response?.data);
      toast.error(response?.data?.message, toastConfig);
    }
  };

  useEffect(() => {
    if (paymentStatus === PAYMENT_STATUS.FAILED) {
      console.log("failed");
      failedPayment();
    }
    if (paymentStatus === PAYMENT_STATUS.SUCCESS) {
      console.log("success");
      submitForm();
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
  const createTransferRequest = async () => {
    setLoader(true);
    if (cost !== null) {
      initiatePayment();
    } else {
      setLoader(false);
      toast.error(
        "Something went wrong. Please try by refreshing the page",
        toastConfig
      );
      return;
    }
  };
  const submitForm = async () => {
    const payload = {
      old_owner_id: animalDetails.animal_current_owner.id,
      new_owner_id: user?.id,
      animal_id: animalDetails.animal_id,
    };
    setPaymentStatus("");
    const response = await submit(
      "POST",
      "transfer/addTransferRequest",
      payload
    );

    if (response?.data?.data?.statusCode === 200 || response?.status === 201) {
      toast.success("Transfer request created successfully!", toastConfig);
      nav("/services");
    } else {
      toast.error(response?.data?.data?.message, toastConfig);
    }
    setLoader(false);
  };
  return (
    <React.Fragment>
      <Formik
        initialValues={{ registerNumber: "", terms: false }}
        validationSchema={AnimalByRegNoValidation}
        onSubmit={(data) => {
          if (!isAnimalFounded) {
            getAnimalByRegNo(data);
          } else {
            createTransferRequest();
          }
        }}
        component={({ handleSubmit, handleChange, errors, setFieldValue }) => {
          return (
            <React.Fragment>
              <section className="h-screen bg-primary p-7 font-poppins">
                <div className="max-w-10 container mx-auto">
                  <div className="mx-auto h-auto rounded-2xl bg-primary py-8 sm:w-3/4 sm:px-8 md:w-3/4 md:px-10 lg:w-5/12">
                    <p className="text-2xl font-semibold text-white">
                      Transfer Ownership
                    </p>
                    <form onSubmit={handleSubmit}>
                      {!isAnimalFounded ? (
                        <>
                          <InputComponent
                            id="registerNumber"
                            name="registerNumber"
                            type="text"
                            onChange={handleChange}
                            placeholder="Registration Number"
                          />
                          <TermsCheckbox
                            error={errors.terms}
                            linkTitle={"Terms & condition"}
                            modalTitle={"Transfer Ownership"}
                            name={"trasferOwnsershipTerms"}
                            onChange={(checked) =>
                              setFieldValue("terms", checked)
                            }
                            termTitle={""}
                            termContent={
                              <>
                                <p>
                                  I/We hereby declare that I am / We are now the
                                  lawful Owner's and the said domestic animal is
                                  unconditionally my/our property.
                                </p>
                              </>
                            }
                          />
                        </>
                      ) : (
                        ""
                      )}

                      {isAnimalFounded ? (
                        <div className="font-medium text-white">
                          <p className="my-4 text-lg font-medium">
                            Animal Details
                          </p>
                          <div className="">
                            <div className="flex gap-3">
                              <h1>Name :</h1>
                              <h2>{animalDetails?.animal_name ?? "N.A"}</h2>
                            </div>
                            <div className="flex gap-3 py-3">
                              <h1>Breed :</h1>
                              <h2>
                                {" "}
                                {animalDetails?.animal_breed_id
                                  ?.animal_breed_name ?? "N.A"}
                              </h2>
                            </div>
                          </div>

                          <div>
                            <h1 className="mb-2 mt-8 text-lg font-medium">
                              Current Owner Details
                            </h1>
                            <div className="flex gap-3 ">
                              <h1>Name : </h1>
                              <h1>
                                {animalDetails?.animal_current_owner
                                  ?.user_name ?? "N.A"}
                              </h1>
                            </div>{" "}
                            <div className="flex gap-3 py-3">
                              <h1>Contact Number : </h1>
                              <h1>
                                {animalDetails?.animal_current_owner
                                  ?.contact_no ?? "N.A"}
                              </h1>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <button
                        type="submit"
                        className="btn-primary mt-4 flex w-full items-center justify-center rounded-md py-1 font-semibold text-white hover:shadow-xl disabled:bg-slate-500"
                        disabled={loading || loader}
                      >
                        {loader || loading ? (
                          <span className="loader"></span>
                        ) : isAnimalFounded ? (
                          "Send Transfer Request"
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </section>
            </React.Fragment>
          );
        }}
      />
    </React.Fragment>
  );
};

export default TransferOwnership;
