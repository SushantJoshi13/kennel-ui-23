import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import BreederDetailsComponent from "../../components/BreederDetailsComponent";
import { UserStatus, VerificationStatus } from "../../constants/app.constants";
import { toastConfig } from "../../constants/toast.constant";
import { breederEditSchema, StatusSchema } from "../../schemas/Validator";
import { getApi } from "../../service/axios.service";
import Modal from "../../components/modal/Modal";
import { useSubmitForm } from "../../hooks/useSubmitForm";
import InputComponent from "../../components/InputComponent";
import { Table } from "../../components/Table/Table";
import useAuth from "../../context/userContext";
import { UserIdCard } from "../../components/cards/IdCard";

const BreederDetails = () => {
  const [displayValue, setDisplayValue] = useState(false);
  const [EditMode, setEditMode] = useState({});
  const [breeder, setBreeder] = useState({});
  const { loading, submit } = useSubmitForm();
  const { user } = useAuth();
  const { id } = useParams();
  const [showId, toggleId] = useState(false);
  const editInitialValues = {
    breeder_name: breeder?.breeder?.user?.user_name,
    breeder_contact_no: breeder?.breeder?.user?.contact_no,
    identification_id_name: breeder?.breeder?.user?.identity_doc_name,
    identification_number: breeder?.breeder?.user?.identification_id_no,
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialValues = {
    status: UserStatus[breeder?.breeder?.user?.user_status],
    reason: "",
  };
  // console.log("status", UserStatus[breeder?.breeder?.user?.user_status]);
  const getBreederDetails = async () => {
    const response = await submit(
      "GET",
      `breeder/getBreeder?user_id=${id}`,
      {}
    );

    if (response?.data?.statusCode === 200) {
      setBreeder(response?.data?.data);
    } else {
      toast.error(response?.data?.message, toastConfig);
    }
  };

  const handleBreederEdit = async (data, action) => {
    const formData = new FormData();
    formData.append("user_name", data.breeder_name);
    formData.append("user_id", id);
    formData.append("contact_no", data.breeder_contact_no);
    formData.append("identification_id_no", data.identification_number);
    formData.append("identification_doc_name", data.identification_id_name);
    const response = await submit("PUT", "auth/update-user", formData);
    if (response?.data?.statusCode === 200 || response?.status === 200) {
      toast.success(response?.data?.message, toastConfig);
      setDisplayValue(false);
      getBreederDetails();
    } else {
      toast.error(response?.data?.message, toastConfig);
    }
  };

  const handleStatusChange = async (data, actions) => {
    const payload = {
      status: Number(data?.status),
      reason: data?.reason,
    };
    const response = await submit("PUT", `auth/change-status/${id}`, payload);
    if (response?.data?.status === 200 || response?.status === 200) {
      toast.success(
        response?.data?.message ?? "Status Changed Successfully",
        toastConfig
      );
      getBreederDetails();
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
  };
  useEffect(() => {
    getBreederDetails();
  }, []);
  const statusFormik = useFormik({
    initialValues: initialValues,

    validationSchema: StatusSchema,

    onSubmit: (data, action) => handleStatusChange(data, action),
    enableReinitialize: true,
  });

  const editFormik = useFormik({
    initialValues: editInitialValues,
    validationSchema: breederEditSchema,
    onSubmit: (data, action) => handleBreederEdit(data, action),
    enableReinitialize: true,
  });

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

  const getFiveDigitId = (id) => {
    const str = "" + id;
    const pad = "0000";
    const ans = pad.substring(0, pad.length - str.length) + str;
    return ans;
  };
  const generateUserId = useCallback(() => {
    return `GBA-${getFiveDigitId(breeder?.breeder?.user?.id)}`;
  }, [breeder]);
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
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <p className="mt-10 text-2xl font-semibold">Owner Details</p>
            <div className="flex flex-row justify-between">
              <button
                className="rounded-lg bg-blue-500 px-4 py-2 text-white mr-5"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleId(true);
                }}
              >
                View ID
              </button>{" "}
              <button
                className="rounded-lg bg-blue-500 px-4 py-2 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditMode(true);
                  setDisplayValue(!displayValue);
                }}
              >
                Edit
              </button>
            </div>
          </div>
          <div className="my-4 grid grid-cols-1 gap-5 md:grid-cols-2">
            <BreederDetailsComponent
              labelName="Name"
              fieldValue={breeder.breeder?.user?.user_name}
            />
            <BreederDetailsComponent
              labelName="Id No."
              fieldValue={generateUserId()}
            />
            <BreederDetailsComponent
              labelName="Email"
              fieldValue={breeder.breeder?.user?.email}
            />
            <BreederDetailsComponent
              labelName="Mobile"
              fieldValue={breeder?.breeder?.user?.contact_no}
            />
            <BreederDetailsComponent
              labelName="Address"
              fieldValue={breeder?.breeder?.user?.user_address}
            />
            <BreederDetailsComponent
              labelName="Country"
              fieldValue={breeder?.breeder?.user?.user_country}
            />

            <div>
              <label className="py-2 text-sm font-medium">
                Identification Doc Name
              </label>
              <p className="my-2 rounded-lg border-2 p-2">
                {breeder?.breeder?.user?.identification_id_name}
              </p>
            </div>
            <BreederDetailsComponent
              isDoc={true}
              docLink={breeder.breeder?.user?.identification_doc}
              labelName={`Identification Document : ${breeder?.user?.identification_id_name}`}
              fieldValue={breeder?.breeder?.user?.identity_doc_name}
            />
          </div>
          <hr className="border-1 border-black" />
          <div className="p-2">
            <h1 className="text-2xl font-semibold">Farms</h1>
            {breeder?.farms && breeder.farms.length > 0 ? (
              <Table columns={FarmColumns} data={breeder.farms ?? []} />
            ) : (
              <h1>No Farms Added</h1>
            )}
          </div>
          <p className="mt-5 text-2xl font-semibold">User Status</p>
          <div className="my-4 grid grid-cols-1 gap-5 md:grid-cols-2">
            <BreederDetailsComponent
              labelName="Status"
              fieldValue={UserStatus[breeder?.breeder?.user?.user_status]}
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
            heading={"ID Card"}
            size={"max-w-2xl"}
            hasDefaultButtons={false}
            isOpen={showId}
            showHeaderClose={true}
            setIsOpen={toggleId}
            child={<UserIdCard user={breeder.breeder?.user} />}
          />
          <Modal
            heading={`${EditMode ? "Edit Breeder Details" : "Change Status"}`}
            isOpen={displayValue}
            setIsOpen={setDisplayValue}
            size={"max-w-2xl"}
            hasDefaultButtons={false}
            child={
              <>
                <form
                  onSubmit={
                    EditMode
                      ? editFormik.handleSubmit
                      : statusFormik.handleSubmit
                  }
                >
                  {!EditMode ? (
                    <div>
                      <select
                        className="w-full rounded-lg border-2 p-2"
                        onChange={statusFormik.handleChange}
                        id="status_options"
                        name="status"
                        value={statusFormik.values.status}
                      >
                        <option value={""}> Select Status</option>
                        {VerificationStatus?.map((item, idx) => {
                          return (
                            <>
                              <option
                                key={idx * 99}
                                selected={
                                  item[idx + 1] ===
                                  UserStatus[
                                    breeder?.breeder?.user?.user_status
                                  ]
                                }
                                value={Object.keys(item)?.toString()}
                              >
                                {item[idx + 1]}
                              </option>
                            </>
                          );
                        })}
                      </select>
                      {statusFormik.errors && (
                        <span className="inline text-red-600">
                          {statusFormik.errors.status}
                        </span>
                      )}
                      <textarea
                        placeholder="Reason for Verification or Rejection"
                        className="mt-2 w-full rounded-lg border-2 p-2"
                        id="reason"
                        name="reason"
                        onChange={statusFormik.handleChange}
                      ></textarea>
                      {statusFormik.errors && (
                        <span className="inline text-red-600">
                          {statusFormik.errors.reason}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div>
                      <InputComponent
                        errorMessage={editFormik.errors.breeder_name}
                        name={"breeder_name"}
                        value={editFormik.values.breeder_name}
                        placeholder={"Breeder Name"}
                        onChange={editFormik.handleChange}
                        className={"text-black"}
                        style={{
                          color: "#000000",
                        }}
                      />
                      <InputComponent
                        errorMessage={editFormik.errors.breeder_contact_no}
                        name={"breeder_contact_no"}
                        value={editFormik.values.breeder_contact_no}
                        onChange={editFormik.handleChange}
                        placeholder={"Contact No"}
                        style={{
                          color: "#000000",
                        }}
                      />
                      <InputComponent
                        errorMessage={editFormik.errors.identification_number}
                        name={"identification_number"}
                        value={editFormik.values.identification_number}
                        placeholder={"Identification No."}
                        onChange={editFormik.handleChange}
                        style={{
                          color: "#000000",
                        }}
                      />
                      <InputComponent
                        errorMessage={editFormik.errors.identification_id_name}
                        name={"identification_id_name"}
                        type={"file"}
                        // value={formik.values.identification_id_name}
                        placeholder={"Identification Document"}
                        onChange={(e) =>
                          editFormik.setFieldValue(
                            "identification_id_name",
                            e.target.files[0]
                          )
                        }
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
                    {loading ? (
                      <span className="loader"></span>
                    ) : EditMode ? (
                      "Edit"
                    ) : (
                      "Update"
                    )}
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
export default BreederDetails;
