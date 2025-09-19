import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Modal from "../components/modal/Modal";
import { toastConfig } from "../constants/toast.constant";
import useAuth from "../context/userContext";
import { getApi, putApi } from "../service/axios.service";
import moment from "moment";

const ConfirmTransfer = () => {
  const [details, setDetails] = useState({});
  const {
    user: { id },
  } = useAuth();
  const search = useLocation().search;
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [linkValid, setLinkvalid] = useState(true);
  const [error, setError] = useState("");
  const transferId = new URLSearchParams(search).get("transferId");
  const transferType = new URLSearchParams(search).get("type");
  const nav = useNavigate();
  // const transferId = 1;

  const getTransferDetails = async () => {
    try {
      const response = await getApi(
        `transfer/getTransferRequestById?request_id=${transferId}`
      );
      if (response?.data?.statusCode === 200) {
        setDetails(response?.data?.data);
      }
      if (response.data.status === 400) {
        setLinkvalid(false);
        setError(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.data?.error, toastConfig);
      nav("/", { replace: true });
    }
  };

  const getFarmTransferDetails = async () => {
    try {
      const response = await getApi(
        `transfer/farm/getTransferRequestById?request_id=${transferId}`
      );
      if (response?.data?.statusCode === 200) {
        setDetails(response?.data?.data);
        setLoading(false);
        return;
      }
      if (response.data.statusCode === 400) {
        setLinkvalid(false);
        setError(response.data.message);
        return;
      }
      setLinkvalid(false);
      setError(response?.data?.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.data?.error, toastConfig);
      nav("/", { replace: true });
    }
  };

  const approveRequest = async () => {
    const endPoint = transferType === 'animal' ? "transfer/approve" : "transfer/farm/approve"
    const response = await putApi(endPoint, {
      transfer_id: transferId,
      request_rejection_reason: "",
    });
    if (response?.data?.statusCode === 200 || response?.status === 200) {
      toast.success(response?.data?.message, toastConfig);
      nav("/services");
    } else {
      toast.error(response?.data?.message, toastConfig);
    }
  };
  const rejectRequest = async () => {
    const endPoint = transferType === 'animal' ? "transfer/reject" : "transfer/farm/reject"
    const response = await putApi(endPoint, {
      transfer_id: transferId,
      request_rejection_reason: reason ?? "",
    });
    if (response?.data?.statusCode === 200 || response?.status === 200) {
      toast.success(
        response?.data?.message ?? "Transfer rejected!",
        toastConfig
      );
      setReason("");
      nav("/");
    } else {
      toast.error(response?.data?.message, toastConfig);
    }
  };

  useEffect(() => {
    if (transferType === "animal") {
      getTransferDetails();
    } else if (transferType === "farm") {
      getFarmTransferDetails();
    } else {
      // invalid link
      setLoading(false);
      setLinkvalid(false);
    }
  }, [transferId, transferType]);

  return (
    <section className="flex h-screen flex-col items-center bg-primary font-poppins text-white">
      {loading && Object.keys(details).length === 0 ? (
        <div className="flex h-[90vh] w-full items-center justify-center">
          <span className="loader self-center"></span>
        </div>
      ) : !linkValid ? (
        <div className="py-4 h-full  items-center flex flex-col">
          <p>{error && error.length > 0 ? error : "Link is not valid"}</p>
          <button
            onClick={() => nav("/", { replace: true })}
            className="btn-primary self-center mt-5"
          >
            Home
          </button>
        </div>
      ) : (
        <>
          <div className="py-4">
            <div>
              <div>
                <h1 className="py-3 text-2xl">Owner Transfer Confirmation</h1>
              </div>
            </div>
            {transferType === "animal" ? (
              <AnimalDetails details={details} />
            ) : (
              <FarmDetails details={details} />
            )}
            <OwnerDetailsBlock
              newOwner={details?.new_owner_id}
              oldOwner={details.old_owner_id}
            />
            {details?.request_status === "In progress" ? (
              <div className="flex flex-col gap-8 sm:flex-row ">
                <button
                  onClick={() => approveRequest()}
                  className="btn-primary mt-4 flex w-full items-center justify-center rounded-md py-1 font-semibold text-white hover:shadow-xl"
                >
                  Accept Transfer
                </button>
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="btn-primary mt-4 flex w-full items-center justify-center rounded-md py-1 font-semibold text-white hover:shadow-xl"
                >
                  Reject Transfer
                </button>
              </div>
            ) : (
              <div className="py-4 text-center">
                {details?.request_status === "Approved" ? (
                  <h2 className="text-green-500">
                    You have already accepted the transfer request.
                  </h2>
                ) : (
                  <h2 className="text-red-500">
                    You have already rejected the transfer request.
                  </h2>
                )}
                <h2>For any query contact admin.</h2>
              </div>
            )}
          </div>
          <Modal
            child={
              <>
                <div>
                  <textarea
                    placeholder="Reason for Verification or Rejection"
                    className="mt-2 w-full rounded-lg border-2 p-2"
                    id="request_rejection_reason"
                    name="request_rejection_reason"
                    onChange={(e) => setReason(e.target?.value)}
                    value={reason}
                  ></textarea>
                </div>
              </>
            }
            heading={"Reject Transfer Ownership"}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            size={"max-w-xl"}
            onSave={() => rejectRequest().then(setIsOpen(false))}
            saveButtonTitle={"Reject"}
          />
        </>
      )}
    </section>
  );
};

const FarmDetails = ({ details }) => {
  return (
    <div className="flex w-full flex-col border-b border-white border-opacity-70 pb-3">
      <div>
        <h1 className="pb-3 text-xl">Farm Details</h1>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <h1>Farm Name : </h1>
          <p> {details?.farm?.farm_name}</p>
        </div>
        <div className="flex gap-3">
          <h1>Farm Address :</h1>
          <p>{details?.farm?.farm_address}</p>
        </div>
        <div className="flex gap-3">
          <h1>Farm License Number :</h1>
          <p>{details?.farm?.license_no}</p>
        </div>
        <div className="flex gap-3">
          <h1>Farm License Expiry :</h1>
          <p>
            {moment(details?.farm?.license_expiry_date).format("DD-MM-YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
};

const AnimalDetails = ({ details }) => {
  return (
    <div className="flex w-full flex-col border-b border-white border-opacity-70 pb-3">
      <div>
        <h1 className="pb-3 text-xl">Animal Details</h1>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <h1>Animal Name : </h1>
          <p> {details?.animal_id?.animal_name}</p>
        </div>
        <div className="flex gap-3">
          <h1>Animal Gender :</h1>
          <p>{details?.animal_id?.animal_gender ?? "N.A."}</p>
        </div>
        <div className="flex gap-3">
          <h1>Animal Microchip ID :</h1>
          <p>
            {details?.animal_id?.animal_microchip_id !== ""
              ? details?.animal_id?.animal_microchip_id
              : "N.A."}
          </p>
        </div>
        <div className="flex gap-3">
          <h1>Animal Birth Date :</h1>
          <p>{details?.animal_id?.animal_date_of_birth ?? "N.A."}</p>
        </div>
      </div>
    </div>
  );
};

const OwnerDetailsBlock = ({ oldOwner, newOwner }) => {
  return (
    <div className="flex flex-col gap-6 py-4 sm:flex-row">
      <div>
        <h1 className="pb-3 text-left text-xl">Previous Owner Details</h1>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <h1>Name : </h1>
            <h1>{oldOwner?.user_name ?? "N.A."}</h1>
          </div>
          <div className="flex gap-3">
            <h1>Email : </h1>
            <h1>{oldOwner?.email ?? "N.A."}</h1>
          </div>
          <div className="flex gap-3">
            <h1>Contact : </h1>
            <h1>{oldOwner?.contact_no ?? "N.A."}</h1>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div>
          <h1 className="pb-3 text-xl">New Owner Details</h1>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <h1>Name : </h1>
              <h1>{newOwner?.user_name ?? "N.A."}</h1>
            </div>
            <div className="flex gap-3">
              <h1>Email : </h1>
              <h1>{newOwner?.email ?? "N.A."}</h1>
            </div>
            <div className="flex gap-3">
              <h1>Contact : </h1>
              <h1>{newOwner?.contact_no ?? "N.A."}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmTransfer;
