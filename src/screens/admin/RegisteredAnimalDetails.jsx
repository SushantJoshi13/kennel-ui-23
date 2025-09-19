import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import BreederDetailsComponent from "../../components/BreederDetailsComponent";
import InputComponent from "../../components/InputComponent";
import Modal from "../../components/modal/Modal";
import {
  Status,
  animalVerificationStatus,
} from "../../constants/app.constants";
import { toastConfig } from "../../constants/toast.constant";
import { useSubmitForm } from "../../hooks/useSubmitForm";
import { RegisterAnimalChangeStatusSchema } from "../../schemas/Validator";

const RegisteredAnimalDetails = () => {
  const [animalDetails, setAnimalDetails] = useState(null);
  const { loading, submit } = useSubmitForm();
  const [isOpen, setIsOpen] = useState(false);
  const [microchipId, setMicrochipId] = useState("");
  const { id } = useParams();
  const nav = useNavigate();
  const getAnimalDetails = async () => {
    const res = await submit("GET", `animal/getAnimalById?id=${id}`, {});
    if (res?.data?.statusCode === 200 || res.status === 200) {
      setAnimalDetails(res?.data?.data);
      setMicrochipId(res?.data?.data?.animal_microchip_id ?? "");
    } else {
      toast.error(res?.data?.message, toastConfig);
    }
  };

  const handleStatusChange = async (data, action) => {
    const payload = {
      animal_id: id,
      status: data.status === "true" || data.status === true ? true : false,
      animal_rejection_reason: data.reason,
    };
    const response = await submit("POST", "animal/change-status", payload);
    if (response?.data?.statusCode === 200 || response.status === 200) {
      toast.success(response.data.message, toastConfig);
      setIsOpen(false);
      action.resetForm({
        values: initialValues,
      });
      getAnimalDetails();
    } else {
      toast.error(response.data.message, toastConfig);
    }
  };

  const handleMicrochipId = async () => {
    if (!microchipId || microchipId.length === 0) {
      toast.error("Please enter valid microchip number");
      return;
    }
    const payload = {
      animal_registration_number: id,
      microchip_id: microchipId,
    };
    const response = await submit("PUT", "animal/change-microchip-id", payload);
    if (response?.data?.statusCode === 200 || response.status === 200) {
      toast.success(response.data.message, toastConfig);
      getAnimalDetails();
    } else {
      toast.error(response.data.message, toastConfig);
    }
  };

  const initialValues = {
    status: true,
    reason: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterAnimalChangeStatusSchema,
    onSubmit: (data, action) => handleStatusChange(data, action),
  });
  useEffect(() => {
    getAnimalDetails();
  }, [id]);

  return (
    <div className="m-7 font-poppins">
      {loading || !animalDetails ? (
        <div className="flex h-[90vh] w-full items-center justify-center">
          <span className="loader self-center"></span>
        </div>
      ) : (
        <>
          <p className="mt-10 text-2xl font-semibold">
            Registered Animal Details
          </p>
          <div className="my-4 grid grid-cols-1 gap-5 md:grid-cols-2 items-center">
            <BreederDetailsComponent
              labelName="Animal Name"
              fieldValue={animalDetails?.animal_name}
            />
            <BreederDetailsComponent
              labelName="animal breed"
              fieldValue={animalDetails?.animal_breed_id?.animal_breed_name}
            />
            <BreederDetailsComponent
              labelName="Animal Date of Birth"
              fieldValue={moment(
                animalDetails?.animal_date_of_birth ?? ""
              ).format("DD-MM-YYYY")}
            />
            <BreederDetailsComponent
              labelName="Animal Gender"
              fieldValue={animalDetails?.animal_gender}
            />
            <BreederDetailsComponent
              labelName="Animal Owner"
              fieldValue={animalDetails?.animal_current_owner?.user_name}
            />
            <BreederDetailsComponent
              labelName="Animal Registration No."
              fieldValue={animalDetails?.animal_registration_number}
            />
            <BreederDetailsComponent
              labelName="Animal Registration Source"
              fieldValue={animalDetails?.registration_source}
            />
            <BreederDetailsComponent
              labelName="Animal Type"
              fieldValue={animalDetails?.animal_type_id?.animal_type_name}
            />
            <BreederDetailsComponent
              labelName="Animal Status"
              fieldValue={Status[animalDetails?.is_active ? 1 : 2]}
            />
            <BreederDetailsComponent
              labelName="Animal Tag Number"
              fieldValue={animalDetails?.animal_tag}
            />
            {!!animalDetails?.animal_hded_doc && (
              <BreederDetailsComponent
                isDoc={true}
                docLink={animalDetails?.animal_hded}
                labelName={`HDED Document`}
                fieldValue={"HDED Document"}
              />
            )}
            {!!animalDetails?.animal_dna_doc && (
              <BreederDetailsComponent
                isDoc={true}
                docLink={animalDetails?.animal_dna}
                labelName={`DNA Document`}
                fieldValue={"DNA Document"}
              />
            )}
            {animalDetails?.animal_registration_doc && (
              <BreederDetailsComponent
                isDoc={true}
                docLink={animalDetails?.animal_registration}
                labelName={`Registration Document : ${animalDetails?.animal_registration_doc}`}
                fieldValue={animalDetails?.animal_registration_doc}
              />
            )}
            {!animalDetails?.animal_pedigree ? (
              <>
                <BreederDetailsComponent
                  isDoc={true}
                  docLink={animalDetails?.animal_front_view}
                  labelName={`Front View`}
                  fieldValue={"Front View"}
                />
                <BreederDetailsComponent
                  isDoc={true}
                  docLink={animalDetails?.animal_left_view}
                  labelName={`Left View`}
                  fieldValue={"Left View"}
                />
                <BreederDetailsComponent
                  isDoc={true}
                  docLink={animalDetails?.animal_right_view}
                  labelName={`Right View`}
                  fieldValue={"Right View"}
                />
              </>
            ) : (
              <>
                <button
                  className="w-full rounded-md bg-blue-500 px-3 py-2 h-min text-white mt-5"
                  onClick={() =>
                    nav(
                      "/admin-layout/registered-animals/details/view-pedegree",
                      {
                        state: {
                          data: animalDetails?.animal_pedigree,
                          id,
                        },
                      }
                    )
                  }
                >
                  View Pedigree
                </button>
              </>
            )}
          </div>

          <div className="flex w-2/4 flex-col pb-4">
            <div>
              <InputComponent
                name={"microchipNumber"}
                onChange={(e) => setMicrochipId(e.target.value)}
                value={microchipId}
                placeholder={"Enter microchip number"}
                className={"text-black"}
                style={{ color: "#000000" }}
              />
            </div>
            <button
              disabled={microchipId.length === 0}
              className="rounded-md bg-blue-500 px-3 py-2 text-white disabled:cursor-not-allowed"
              onClick={() => handleMicrochipId()}
            >
              Edit Microchip Number
            </button>
          </div>

          <hr className="border-1 mb-4 border-black" />
          <button
            className="w-[50%] rounded-md bg-blue-500 px-3 py-2 text-white"
            onClick={() => {
              nav(`/certificate/${animalDetails?.animal_id}`);
            }}
          >
            Certificate
          </button>
          <hr className="border-1 my-4 border-black" />
          <div>
            <div className="my-4 grid grid-cols-1 gap-5 md:grid-cols-2">
              <BreederDetailsComponent
                labelName="Status"
                fieldValue={
                  animalDetails?.is_active
                    ? "Verified"
                    : animalDetails?.animal_rejection_reason.length > 1
                    ? "Rejected"
                    : "Verification Pending"
                }
              />
              <button
                type="button"
                className={`mt-8 max-h-11 rounded-lg bg-green-500 py-3 font-semibold text-white
                  `}
                onClick={(e) => setIsOpen((prev) => !prev)}
              >
                Change Status
              </button>
            </div>
          </div>
          <Modal
            heading={"Change Status"}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            height={""}
            size={"max-w-2xl"}
            hasDefaultButtons={false}
            child={
              <>
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <select
                      className="w-full rounded-lg border-2 p-2"
                      onChange={formik.handleChange}
                      id="status_options"
                      name="status"
                    >
                      <option disabled value={""}>
                        Select Status
                      </option>
                      {animalVerificationStatus?.map((item, idx) => {
                        return (
                          <option
                            key={idx}
                            // selected={item.value === animalDetails?.is_active}
                            value={item.value}
                          >
                            {item.label}
                          </option>
                        );
                      })}
                    </select>
                    {formik.errors && (
                      <span className="inline text-red-600">
                        {formik.errors.status}
                      </span>
                    )}
                    <textarea
                      placeholder="Reason for Verification or Rejection"
                      className="mt-2 w-full rounded-lg border-2 p-2"
                      id="reason"
                      name="reason"
                      onChange={formik.handleChange}
                    ></textarea>
                    {formik.errors && (
                      <span className="inline text-red-600">
                        {formik.errors.reason}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="mt-4 rounded-lg border-2 p-2 font-semibold shadow-xl"
                    onClick={(e) => {
                      setIsOpen((prev) => !prev);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-4 rounded-lg bg-green-400 p-2 px-3 font-medium text-white  shadow-xl"
                    disabled={loading}
                  >
                    {loading ? <span className="loader"></span> : "Update"}
                  </button>
                </form>
              </>
            }
          />
        </>
      )}
    </div>
  );
};

export default RegisteredAnimalDetails;
