import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import BreederDetailsComponent from "../../components/BreederDetailsComponent";
import { UserStatus, VerificationStatus } from "../../constants/app.constants";
import { toastConfig } from "../../constants/toast.constant";
import { StatusSchema, UpdateProfileSchema } from "../../schemas/Validator";
import { getApi } from "../../service/axios.service";
import Modal from "../../components/modal/Modal";
import { useSubmitForm } from "../../hooks/useSubmitForm";
import InputComponent from "../../components/InputComponent";

const IndividualDetails = () => {
  const [displayValue, setDisplayValue] = useState(false);
  const [EditMode, setEditMode] = useState({});
  const [individual, setIndividual] = useState({});
  const { loading, submit } = useSubmitForm();
  const { id } = useParams();
  const getIndividualDetails = async () => {
    const response = await submit("GET", `auth/user?id=${id}`, {});

    if (response?.data?.statusCode === 200) {
      setIndividual(response?.data?.data);
    } else {
      toast.error(response?.data?.message, toastConfig);
    }
  };
  const editInitialValues = {
    user_name: "",
    contact_no: "",
    identification_id_no: "",
    identity_doc_name: null,
    user_address: "",
  };
  const initialValues = {
    status: individual?.user_status,
    reason: "",
  };

  const formik = useFormik({
    initialValues: EditMode ? editInitialValues : initialValues,

    validationSchema: EditMode ? UpdateProfileSchema : StatusSchema,

    onSubmit: async (data, actions) => {
      if (EditMode) {
        const formData = new FormData();

        formData.append("user_name", data?.user_name);
        formData.append("user_id", id);
        formData.append("contact_no", data?.contact_no);
        formData.append("identification_id_no", data?.identification_id_no);
        formData.append("identification_doc_name", data?.identity_doc_name);
        formData.append("user_address", data?.user_address);
        const response = await submit("PUT", `auth/update-user`, formData, {
          "Content-Type": "multipart/form-data",
        });
        if (response?.data?.statusCode === 200) {
          toast.success(
            response?.data?.message ??
              "Individual details Changed Successfully",
            toastConfig
          );
          getIndividualDetails();
          setDisplayValue(!displayValue);
        } else {
          toast.error(response?.data?.message, toastConfig);
        }
      } else {
        const payload = {
          status: Number(data?.status),
          reason: data?.reason,
        };
        const response = await submit(
          "PUT",
          `auth/change-status/${id}`,
          payload
        );
        if (response?.data?.status === 200 || response?.status === 200) {
          toast.success(
            response?.data?.message ?? "Status Changed Successfully",
            toastConfig
          );
          getIndividualDetails();
          setDisplayValue(false);
          actions.resetForm({
            values: {
              reason: "",
              status: 0,
            },
          });
        } else {
          toast.error(response?.data?.message, toastConfig);
        }
      }
    },
  });

  useEffect(() => {
    getIndividualDetails();
  }, []);

  const FarmColumns = [
    {
      Header: "Farm Name",
      accessor: "farm_name",
    },
    {
      Header: "Farm Address",
      accessor: "farm_address",
    },
    {
      Header: "License No.",
      accessor: "license_no",
    },
    {
      Header: "License Expire Date",
      accessor: "license_expiry_date",
    },
  ];
  return (
    <>
      {loading ? (
        <div className="flex h-[90vh] w-full items-center justify-center">
          <span className="loader self-center"></span>
        </div>
      ) : (
        <div
          className="m-7 font-poppins"
          onClick={() => setDisplayValue(false)}
        >
          <div className="flex items-center justify-between">
            <p className="mt-10 text-2xl font-semibold">Owner Details</p>
            <button
              className="rounded-lg bg-blue-500 px-4 py-2 text-white"
              onClick={(e) => {
                e.stopPropagation();
                setEditMode(true);
                formik.setValues({
                  user_name: individual?.user_name,
                  contact_no: individual?.contact_no,
                  identification_id_no: individual?.identification_id_no,
                  user_address: individual?.user_address,
                });
                setDisplayValue(!displayValue);
              }}
            >
              Edit
            </button>
          </div>
          <div className="my-4 grid grid-cols-1 gap-5 md:grid-cols-2">
            <BreederDetailsComponent
              labelName="Name"
              fieldValue={individual?.user_name}
            />
            <BreederDetailsComponent
              labelName="Email"
              fieldValue={individual?.email}
            />
            <BreederDetailsComponent
              labelName="Mobile"
              fieldValue={individual?.contact_no}
            />
            <BreederDetailsComponent
              labelName="Country"
              fieldValue={individual?.user_country}
            />
            <BreederDetailsComponent
              labelName="Address"
              fieldValue={individual?.user_address}
            />
            <BreederDetailsComponent
              labelName="Identification No."
              fieldValue={individual?.identification_id_no}
            />
            <div>
              <label className="py-2 text-sm font-medium">
                Identification Doc Name
              </label>
              <p className="my-2 rounded-lg border-2 p-2">
                {individual?.identification_id_name}
              </p>
            </div>
            <BreederDetailsComponent
              isDoc={true}
              docLink={individual?.identification_doc}
              labelName={`Identification Document : ${individual?.identification_id_name}`}
              fieldValue={individual?.identity_doc_name}
            />
          </div>
          <hr className="border-1 border-black" />
          <p className="mt-5 text-2xl font-semibold">User Status</p>
          <div className="my-4 grid grid-cols-1 gap-5 md:grid-cols-2">
            <BreederDetailsComponent
              labelName="Status"
              fieldValue={UserStatus[individual?.user_status]}
            />
            <button
              type="button"
              className={`${
                "Pending Verification"
                  ? "mt-8 max-h-11 rounded-lg bg-green-500 py-3 font-semibold text-white"
                  : "hidden"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setEditMode(false);
                setDisplayValue(!displayValue);
              }}
            >
              Change Status
            </button>
          </div>
          <Modal
            heading={`${
              EditMode ? "Edit Individual Details" : "Change Status"
            }`}
            isOpen={displayValue}
            setIsOpen={setDisplayValue}
            size={"max-w-2xl"}
            hasDefaultButtons={false}
            child={
              <>
                <form onSubmit={formik.handleSubmit}>
                  {!EditMode ? (
                    <div>
                      <select
                        className="w-full rounded-lg border-2 p-2"
                        onChange={formik.handleChange}
                        id="status_options"
                        name="status"
                        value={formik.values.status}
                      >
                        {VerificationStatus?.map((item, idx) => {
                          return (
                            <>
                              <option
                                key={idx * 99}
                                selected={
                                  item[idx + 1] ===
                                  UserStatus[individual?.user_status]
                                }
                                value={Object.keys(item)?.toString()}
                              >
                                {item[idx + 1]}
                              </option>
                            </>
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
                  ) : (
                    <div>
                      <InputComponent
                        errorMessage={formik.errors.user_name}
                        name={"user_name"}
                        value={formik.values.user_name}
                        placeholder={"Individual Name"}
                        onChange={formik.handleChange}
                        className={"text-black"}
                        style={{
                          color: "#000000",
                        }}
                      />
                      <InputComponent
                        errorMessage={formik.errors.contact_no}
                        name={"contact_no"}
                        value={formik.values.contact_no}
                        onChange={formik.handleChange}
                        placeholder={"Individual Contact No."}
                        style={{
                          color: "#000000",
                        }}
                      />
                      <InputComponent
                        errorMessage={formik.errors.identification_id_no}
                        name={"identification_id_no"}
                        value={formik.values.identification_id_no}
                        placeholder={"Identification ID No."}
                        onChange={formik.handleChange}
                        style={{
                          color: "#000000",
                        }}
                      />
                      <InputComponent
                        type="file"
                        name="identity_doc_name"
                        //   value={formik.values.identity_doc_name}
                        placeholder="Identification Document"
                        onChange={(e) => {
                          formik.setFieldValue(
                            "identity_doc_name",
                            e.target.files[0]
                          );
                        }}
                        style={{
                          color: "#000000",
                        }}
                      />
                      <InputComponent
                        errorMessage={formik.errors.user_address}
                        name={"user_address"}
                        value={formik.values.user_address}
                        placeholder={"Individual Address"}
                        onChange={formik.handleChange}
                        style={{
                          color: "#000000",
                        }}
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    className="mt-4 rounded-lg border-2 p-2 font-semibold shadow-xl"
                    onClick={(e) => {
                      setDisplayValue(false);
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
        </div>
      )}
    </>
  );
};
export default IndividualDetails;
