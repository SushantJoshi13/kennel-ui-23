import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import BreederDetailsComponent from "../../../components/BreederDetailsComponent";
import { Table } from "../../../components/Table/Table";
import Modal from "../../../components/modal/Modal";
import {
  LitterStatus,
  VerificationStatus,
} from "../../../constants/app.constants";
import { toastConfig } from "../../../constants/toast.constant";
import { getApi, postApi, putApi } from "../../../service/axios.service";
import { useSubmitForm } from "../../../hooks/useSubmitForm";
import { DropDownField } from "../../../components/dropdown/DropDownField";
import { AddCompanyForm } from "../../../components/forms/AddCompanyForm";

const LittersDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [litter, setLitter] = useState({});
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const { loading, submit } = useSubmitForm();

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState();
  const [showAddCompany, toggleAddCompany] = useState(false);
  const [companySire, setCompanySire] = useState([]);
  const [selectedSire, setSelectedSire] = useState();
  useEffect(() => {
    if (litter?.is_semen) {
      getCompanies();
    }
  }, [litter?.is_semen]);

  useEffect(() => {
    if (state?.animal_id) setSelectedSire(state?.animal_id);
  }, [state]);

  useEffect(() => {
    getCompanyAnimals();
  }, [selectedCompany]);

  const getCompanyAnimals = async () => {
    const animals = await getApi(
      `animal/getAnimals?gender=Male&user_id=${selectedCompany}`
    );
    setCompanySire(animals.data.data);
  };
  const getCompanies = async () => {
    const list = await getApi("company");
    setCompanies(list.data.data);
  };

  const getLitters = async () => {
    const response = await submit("GET", `litter/${id}`, {});
    if (response?.data?.statusCode === 200) {
      setLitter(response?.data?.data);
      if (response?.data?.data.sire_owner_id) {
        setSelectedCompany(response?.data?.data.sire_owner_id);
      }
      if (response?.data?.data.sire_id) {
        setSelectedSire(response?.data?.data.sire_id);
      }
    } else {
      toast.error(response?.data?.message, toastConfig);
    }
  };

  const approveLitter = async () => {
    const payload = {
      id,
      remarks: litter.remarks
        ? [...litter.remarks, { message: `Approved` }]
        : [{ message: `Approved` }],
    };
    const response = await postApi(`litter/approve`, payload);
    if (response?.data?.statusCode === 200 || response?.status === 200) {
      toast.success(response?.data?.message, toastConfig);
    } else {
      toast.error(response?.data?.message, toastConfig);
    }
  };

  const rejectLitter = async () => {
    const payload = {
      id,
      remarks: litter.remarks
        ? [...litter.remarks, { message: `Rejected: ${reason}` }]
        : [{ message: `Rejected: ${reason}` }],
    };
    const response = await postApi("litter/reject", payload);
    if (response?.data?.statusCode === 200 || response?.status === 200) {
      toast.success(response?.data?.message, toastConfig);
    } else {
      toast.error(response?.data?.message, toastConfig);
    }
  };

  const onAddCompany = async (companyId) => {
    updateCompany(Number(companyId));
    getCompanies();
    toggleAddCompany(false);
  };

  const updateCompany = async (companyId) => {
    const updateResponse = await putApi("litter/semen/updateCompany", {
      companyId: companyId,
      litterId: Number(id),
    });
    setSelectedCompany(companyId);
    toast.success("Company Updated Successfully!");
  };

  const updateSire = async (animalId) => {
    console.log("animalId", animalId);
    const updateResponse = await putApi("litter/semen/updateSire", {
      animalId,
      litterId: Number(id),
    });
    setSelectedSire(animalId);
    toast.success("Sire Updated Successfully!");
  };
  const columns = [
    {
      Header: " Name",
      accessor: "litter_name",
    },
    {
      Header: "Color & mark",
      accessor: "litter_color_mark",
      filter: "fuzzyText",
    },
    {
      Header: "Gender",
      accessor: "litter_gender",
    },
  ];

  useEffect(() => {
    getLitters();
  }, [id]);
  console.log("litter.remarks", litter.remarks, typeof litter.remarks);
  return (
    <div className="px-4 pb-10">
      {loading ? (
        <div className="flex h-[90vh] w-full items-center justify-center">
          <span className="loader self-center"></span>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between py-3">
            <p className="mt-5 text-2xl font-semibold">Litters</p>
          </div>
          <Table
            columns={columns}
            data={litter.litters ? [...litter.litters] : []}
          />
          <hr className="border-1 mt-4  border-gray-500" />
          <div className="font-poppins">
            <p className="mt-10 text-2xl font-semibold">Litters Details</p>
            <div className="my-4 grid grid-cols-1 gap-5 md:grid-cols-2">
              <BreederDetailsComponent
                labelName="dam owner name"
                fieldValue={litter?.owner?.user_name}
              />
              <BreederDetailsComponent
                labelName="dam animal name"
                fieldValue={litter?.dam?.animal_name}
              />
              <BreederDetailsComponent
                labelName=" dam animal breed"
                fieldValue={litter?.dam?.animal_breed_id?.animal_breed_name}
              />
              {litter.is_semen ? (
                <>
                  <BreederDetailsComponent
                    labelName="Semen Bill"
                    isDoc={true}
                    docLink={litter?.semenBillLink}
                    fieldValue={litter?.semen_bill}
                  />
                  <BreederDetailsComponent
                    labelName="Vet Certificate"
                    docLink={litter?.vetCertificateLink}
                    isDoc={true}
                    fieldValue={litter?.vet_certificate}
                  />
                </>
              ) : (
                <>
                  <BreederDetailsComponent
                    labelName="sire owner name"
                    fieldValue={litter?.sire?.animal_owner_id?.user_name}
                  />
                  <BreederDetailsComponent
                    labelName="sire animal name"
                    fieldValue={litter?.sire?.animal_name}
                  />
                </>
              )}
            </div>
          </div>

          <hr className="border-1 mt-4  border-gray-500" />
          {litter.is_semen ? (
            <div className="mt-4">
              <h2>Admin Verification</h2>
              <div className="my-4 grid grid-cols-3 gap-5 items-end">
                <DropDownField
                  label={"Select Company"}
                  data={companies.map((c) => ({
                    label: c.user.user_name,
                    value: c.user_id,
                  }))}
                  placeholder="Select Company"
                  selected={selectedCompany}
                  onSelect={(value) => updateCompany(value.value)}
                />
                <h2 className="text-center mb-4">OR</h2>
                <button
                  onClick={() => toggleAddCompany(!showAddCompany)}
                  className="btn-primary mb-4"
                >
                  Add Company
                </button>
              </div>

              {selectedCompany ? (
                <div className="my-4 grid grid-cols-3 gap-5 items-end">
                  <DropDownField
                    label={"Select Sire"}
                    data={companySire.map((a) => ({
                      label: a.animal_name,
                      value: a.animal_id,
                    }))}
                    placeholder="Select Sire"
                    selected={selectedSire}
                    onSelect={(value) => updateSire(value.value)}
                  />
                  <h2 className="text-center mb-4">OR</h2>

                  <button
                    onClick={() => {
                      selectedCompany
                        ? navigate("/admin-layout/add-animal", {
                            state: {
                              companyId: selectedCompany,
                              litterId: id,
                            },
                          })
                        : toast.error("Select Company", toastConfig);
                    }}
                    className="btn-primary mb-4"
                  >
                    Add Animal
                  </button>
                </div>
              ) : null}
              {litter.is_semen && selectedCompany && selectedSire ? (
                <button
                  type="button"
                  className="mt-8 max-h-11 rounded-lg bg-green-500 p-3 font-semibold text-white"
                  onClick={(e) => setIsOpen((prev) => !prev)}
                >
                  Change Status
                </button>
              ) : null}
            </div>
          ) : (
            <div>
              <div className="my-4 grid grid-cols-1 gap-5 md:grid-cols-2">
                <BreederDetailsComponent
                  labelName="Sire approval Status"
                  fieldValue={
                    !litter.sire_action_taken
                      ? "Verification Pending"
                      : LitterStatus[litter.sire_approval ? 1 : 2]
                  }
                />
                {litter?.sire_rejection_reason && (
                  <BreederDetailsComponent
                    labelName="Sire Rejection Reason"
                    fieldValue={litter.sire_rejection_reason}
                  />
                )}
              </div>
              <div className="my-4 grid grid-cols-1 gap-5 md:grid-cols-2">
                <BreederDetailsComponent
                  labelName="Status"
                  fieldValue={
                    !litter.sire_action_taken
                      ? "Verification Pending"
                      : LitterStatus[litter.completed ? 1 : 2]
                  }
                />
                {litter.sire_action_taken ? (
                  <button
                    type="button"
                    className="mt-8 max-h-11 rounded-lg bg-green-500 py-3 font-semibold text-white"
                    onClick={(e) => setIsOpen((prev) => !prev)}
                  >
                    Change Status
                  </button>
                ) : (
                  <h2 className="mt-8 max-h-11  py-3 font-semibold text-red-500">
                    Sire haven't taken any action yet.
                  </h2>
                )}
              </div>
            </div>
          )}
          <Modal
            heading={"Add Company"}
            isOpen={showAddCompany}
            setIsOpen={toggleAddCompany}
            size={"max-w-2xl"}
            saveButtonTitle={"Add"}
            child={
              <AddCompanyForm
                onAddCompany={(companyId) => onAddCompany(companyId)}
              />
            }
            hasDefaultButtons={false}
          />
          <Modal
            heading={"Change Status"}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            height={""}
            size={"max-w-2xl"}
            onSave={() => {
              if (status !== "3") {
                approveLitter();
              } else {
                rejectLitter();
              }
              setIsOpen(false);
            }}
            saveButtonTitle={"update"}
            child={
              <>
                <div>
                  <select
                    className="w-full rounded-lg border-2 p-2"
                    onChange={(sel) => {
                      setStatus(sel.target.value);
                    }}
                    value={status}
                    id="status_options"
                    name="status"
                  >
                    <option value={""} className="text-black" disabled selected>
                      Select status
                    </option>
                    {VerificationStatus?.map((item, idx) => {
                      return (
                        <>
                          {item[2] ? null : (
                            <option
                              key={idx}
                              selected={idx === 1}
                              value={Object.keys(item)?.toString()}
                            >
                              {item[idx + 1]}
                            </option>
                          )}
                        </>
                      );
                    })}
                  </select>

                  {status === "3" && (
                    <textarea
                      placeholder="Reason for Verification or Rejection"
                      className="mt-2 w-full rounded-lg border-2 p-2"
                      id="reason"
                      name="reason"
                      onChange={(txt) => setReason(txt.target.value)}
                      value={reason}
                    ></textarea>
                  )}
                </div>
              </>
            }
          />
        </div>
      )}
    </div>
  );
};

export default LittersDetails;
