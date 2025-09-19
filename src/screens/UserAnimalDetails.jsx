import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import BreederDetailsComponent from "../components/BreederDetailsComponent";
import { toastConfig } from "../constants/toast.constant";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { animalRegistrationSource } from "../constants/app.constants";
import { useTreeContext } from "../context/TreeContext";

const UserAnimalDetails = () => {
  const [animalDetails, setAnimalDetails] = useState(null);
  const { setTree } = useTreeContext();
  const { loading, submit } = useSubmitForm();
  const { id } = useParams();
  const nav = useNavigate();
  const getAnimalDetails = async () => {
    const res = await submit("GET", `animal/getAnimalById?id=${id}`, {});
    if (res?.data?.statusCode === 200 || res.status === 200) {
      setAnimalDetails(res?.data?.data);
    } else {
      toast.error(res?.data?.message, toastConfig);
      nav("/userAnimalsList");
    }
  };
  useEffect(() => {
    getAnimalDetails();
  }, [id]);

  return (
    <div className="m-7">
      {loading || !animalDetails ? (
        <div className="flex h-[90vh] w-full items-center justify-center">
          <span className="loader self-center"></span>
        </div>
      ) : (
        <>
          <div className="my-10 flex flex-col items-center justify-between sm:flex-row">
            <p className="text-2xl font-semibold">Registered Animal Details</p>
            {!animalDetails?.is_active &&
              animalDetails?.registration_source ===
                animalRegistrationSource.registration && (
                <button
                  onClick={() => {
                    setTree(animalDetails?.animal_pedigree ?? {});
                    nav("/edit-animal", { state: animalDetails });
                  }}
                  className="btn-primary mt-10 w-8/12 sm:mt-0 sm:w-fit"
                >
                  Edit
                </button>
              )}
          </div>
          <div className="my-4 grid grid-cols-1 gap-5 md:grid-cols-2">
            <BreederDetailsComponent
              labelName="Animal Name"
              fieldValue={animalDetails?.animal_name}
            />
            <BreederDetailsComponent
              labelName="Animal breed"
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
              fieldValue={animalDetails?.animal_owner_id?.user_name}
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
              fieldValue={animalDetails.is_active ? "Active" : "Inactive"}
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
          </div>

          <div>
            {!animalDetails?.animal_pedigree ? (
              <div className="grid grid-cols-1 gap-4 py-3 md:grid-cols-2">
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
              </div>
            ) : (
              <div className="my-3 w-2/4">
                <button
                  className="w-full rounded-md bg-blue-500 px-3 py-2 text-white"
                  onClick={() =>
                    nav("/animalPedigree", {
                      state: {
                        data: animalDetails?.animal_pedigree,
                        id,
                      },
                    })
                  }
                >
                  View Pedigree
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserAnimalDetails;
