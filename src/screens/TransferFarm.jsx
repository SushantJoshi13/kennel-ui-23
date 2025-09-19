import { Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import InputComponent from "../components/InputComponent";
import TermsCheckbox from "../components/input/TermsCheckbox";
import { toastConfig } from "../constants/toast.constant";
import useAuth from "../context/userContext";
import { AnimalByRegNoValidation } from "../schemas/Validator";
import { getApi, postApi } from "../service/axios.service";

const TransferFarm = () => {
  const [isFarmFound, setFarmFound] = useState(false);
  const [farmDetails, setFarmDetails] = useState();
  const [loader, setLoader] = useState(false);
  const nav = useNavigate();
  const { user } = useAuth();
  const findFarm = async (values) => {
    setLoader(true);
    const response = await getApi(
      `breederFarm/search?reg_no=${values.registerNumber}`
    );
    const details = response.data.data;
    if (details) {
      if (details.breeder.user_id === user.id) {
        setLoader(false);
        toast.error("This farm already belongs to you", toastConfig);
        return;
      }
      setFarmFound(true);
      setFarmDetails(details);
    } else {
      toast.error("Farm not found", toastConfig);
    }
    setLoader(false);
    console.log("res", response);
  };

  const sendRequest = async () => {
    const payload = {
      old_owner_id: farmDetails.breeder.user_id,
      new_owner_id: user?.id,
      farm_id: farmDetails.farm_id,
    };

    const response = await postApi(
      "transfer/farm/addTransferRequest",
      payload
    );

    if (response?.data?.data?.statusCode === 200 || response?.status === 201) {
      toast.success("Transfer request created successfully!", toastConfig);
      nav("/profile");
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
          if (isFarmFound) {
            // create transfer
            sendRequest(data);
          } else {
            // find farm
            findFarm(data);
          }
        }}
        component={({
          handleSubmit,
          handleChange,
          errors,
          setFieldValue,
          touched,
        }) => {
          return (
            <React.Fragment>
              <section className="h-screen bg-primary p-7 font-poppins">
                <div className="max-w-10 container mx-auto">
                  <div className="mx-auto h-auto rounded-2xl bg-primary py-8 sm:w-3/4 sm:px-8 md:w-3/4 md:px-10 lg:w-5/12">
                    <p className="text-2xl font-semibold text-white">
                      Transfer Farm
                    </p>
                    <form onSubmit={handleSubmit}>
                      <>
                        <InputComponent
                          id="registerNumber"
                          name="registerNumber"
                          type="text"
                          onChange={handleChange}
                          placeholder="Registration Number"
                          errorMessage={touched.registerNumber ? errors.registerNumber : ""}
                        />
                        <TermsCheckbox
                          error={touched.terms ? errors.terms : ""}
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
                      {isFarmFound ? (
                        <div className="font-medium text-white">
                          <div>
                            <p className="mb-2 mt-8 text-lg font-medium">
                              Current Owner Details
                            </p>
                            <div className="flex gap-3 ">
                              <p>Name : </p>
                              <p>{farmDetails.breeder.user.user_name}</p>
                            </div>
                            <div className="flex gap-3 ">
                              <p>Farm Name : </p>
                              <p>{farmDetails.farm_name}</p>
                            </div>
                            <div className="flex gap-3 ">
                              <p>Farm Address : </p>
                              <p>{farmDetails.farm_address}</p>
                            </div>
                            <div className="flex gap-3 ">
                              <p>Farm License Number : </p>
                              <p>{farmDetails.license_no}</p>
                            </div>
                            <div className="flex gap-3 ">
                              <p>Farm Type : </p>
                              <p>{farmDetails.farm.farm_name}</p>
                            </div>
                            <div className="flex gap-3 py-3">
                              <p>Contact Number : </p>
                              <p>{farmDetails.breeder.user.contact_no}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <button
                        type="submit"
                        // onClick={() => setFarmFound(true)}
                        className="btn-primary mt-4 flex w-full items-center justify-center rounded-md py-1 font-semibold text-white hover:shadow-xl disabled:bg-slate-500"
                        disabled={loader}
                      >
                        {loader ? (
                          <span className="loader"></span>
                        ) : isFarmFound ? (
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

export default TransferFarm;
