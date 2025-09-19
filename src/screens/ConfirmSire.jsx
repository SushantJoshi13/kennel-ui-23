import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Modal from "../components/modal/Modal";
import { toastConfig } from "../constants/toast.constant";
import { getApi, putApi } from "../service/axios.service";

const ConfirmSire = () => {
  const [details, setDetails] = useState({});
  const search = useLocation().search;
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);

  const requestId = new URLSearchParams(search).get("requestId");
  const nav = useNavigate();

  const getLitterDetails = async () => {
    const response = await getApi(`litter/litterDetails/${requestId}`);

    if (response?.data?.statusCode === 200) {
      setDetails(response?.data?.data);
    } else {
      toast.error(response?.data?.message, toastConfig);
      nav("/", { replace: true });
    }
  };

  const approveRequest = async () => {
    const data = {
      id: requestId,
      remarks: [
        ...details?.remarks,
        { message: "Sire request Approved", timeStamp: new Date() },
      ],
    };
    const response = await putApi("litter/sire-approve", data);
    if (response?.data?.statusCode === 200 || response?.status === 200) {
      toast.success(response?.data?.message ?? "Litter Approved", toastConfig);
      nav("/");
    } else {
      toast.error(response?.data?.message, toastConfig);
    }
  };
  const rejectRequest = async () => {
    const response = await putApi("litter/sire-reject", {
      id: requestId,
      reason: reason ?? "",
      remarks: [
        ...details?.remarks,
        { message: "Sire request Rejected", timeStamp: new Date() },
      ],
    });
    if (response?.data?.statusCode === 200 || response?.status === 200) {
      toast.success(response?.data?.message ?? "Litter rejected!", toastConfig);
      setReason("");
      nav("/");
    } else {
      toast.error(response?.data?.message, toastConfig);
    }
  };

  useEffect(() => {
    getLitterDetails();
  }, [requestId]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [details]);

  return (
    <section className="flex h-full flex-col items-center bg-primary font-poppins text-white">
      {loading && Object.keys(details).length === 0 ? (
        <div className="flex h-[90vh] w-full items-center justify-center">
          <span className="loader self-center"></span>
        </div>
      ) : (
        <>
          <div className="py-2">
            <div>
              <div>
                <h1 className="py-3 text-2xl">
                  Litter's Sire Confirmation Request
                </h1>
              </div>
            </div>
            <div className="flex w-full flex-col pb-4">
              <div>
                <h1 className="pb-2 text-xl">Litter Details</h1>
              </div>
              <div className="flex flex-wrap gap-3">
                {details?.litters?.map((litter, index) => {
                  return (
                    <div className="rounded-md border-[1px] border-white p-2">
                      <h2>Litter {index + 1} : </h2>
                      <div className="flex gap-3">
                        <h3>Litter Name : </h3>
                        <p> {litter?.litter_name}</p>
                      </div>
                      <div className="flex gap-3">
                        <h1>Animal Gender :</h1>
                        <p>{litter?.litter_gender}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-3">
              <h3>Birth Date of Litters : </h3>
              <p> {details?.dob}</p>
            </div>
            <hr className="border-white border-opacity-70" />

            <div className="flex flex-col gap-6 py-2 sm:flex-row sm:justify-between">
              <div>
                <h1 className="pb-1 text-left text-xl">Dam Details</h1>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-3">
                    <h1>Name : </h1>
                    <h1>{details?.dam?.animal_name}</h1>
                  </div>
                  <div className="flex gap-3">
                    <h1>Registration Number : </h1>
                    <h1>{details?.dam?.animal_registration_number}</h1>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="pb-1 text-left text-xl">Sire Details</h1>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-3">
                    <h1>Name : </h1>
                    <h1>{details?.sire?.animal_name}</h1>
                  </div>
                  <div className="flex gap-3">
                    <h1>Registration Number : </h1>
                    <h1>{details?.sire?.animal_registration_number}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-3 pb-2">
              <h1>Dam and Sire Mating Date : </h1>
              <h1>{details?.mating_date}</h1>
            </div>
            <hr className="border-white border-opacity-70 pb-4" />
            <div className="flex gap-4">
              <div>
                <h1 className="pb-3 text-xl"> Dam Owner Details</h1>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <h1>Name : </h1>
                    <h1>{details?.owner?.user_name ?? "N.A."}</h1>
                  </div>
                  <div className="flex gap-3">
                    <h1>Email : </h1>
                    <h1>{details?.owner?.email ?? "N.A."}</h1>
                  </div>
                  <div className="flex gap-3">
                    <h1>Contact : </h1>
                    <h1>{details?.owner?.contact_no ?? "N.A."}</h1>
                  </div>
                </div>
              </div>
            </div>
            {details?.sire_action_taken ? (
              <div className="py-4 text-center ">
                {details?.sire_action_taken ? (
                  <h2 className="text-green-500">
                    You have already approved the litter.
                  </h2>
                ) : (
                  <h2 className="text-red-500">
                    You have already rejected the litter.
                  </h2>
                )}
                <h2>For any query contact the admin.</h2>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:gap-8 ">
                <button
                  onClick={() => approveRequest()}
                  className="btn-primary mt-4 flex w-full items-center justify-center rounded-md py-1 font-semibold text-white hover:shadow-xl"
                >
                  Accept Litter
                </button>
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="btn-primary mt-4 flex w-full items-center justify-center rounded-md py-1 font-semibold text-white hover:shadow-xl"
                >
                  Reject Litter
                </button>
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

export default ConfirmSire;
