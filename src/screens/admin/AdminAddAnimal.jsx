import { useLocation, useNavigate } from "react-router";
import { AddAnimalForm } from "../../components/forms/AddAnimalForm";
import { useTreeContext } from "../../context/TreeContext";
import { submitAddPetWithPedigreeSchemas } from "../../schemas/AddPetSchema";
import { getGenderByParentType } from "../../utils/helper";
import { processTree } from "../../utils/tree.util";
import { animalInitialValues } from "../AddAnimal";
import { useSubmitForm } from "../../hooks/useSubmitForm";
import { toast } from "react-toastify";
import { toastConfig } from "../../constants/toast.constant";
import { animalRegistrationSource } from "../../constants/app.constants";

export const AdminAddAnimal = () => {
  const { state } = useLocation();
  const { loading, submit } = useSubmitForm();
  const nav = useNavigate();

  const { tree, setTree } = useTreeContext();

  async function addAnimal(formData) {
    let animals = processTree(tree);
    animals = animals.map((a) => {
      const sire = a.children.find((p) => p.attributes.parentType === "Sire");
      const dam = a.children.find((p) => p.attributes.parentType === "Dam");
      const data = {
        name: a.name,
        id: a.attributes.uuid,
        sireId: sire?.attributes?.uuid ?? null,
        damId: dam?.attributes?.uuid ?? null,
        breedId: Number(formData.animal_breed_id),
        animalType: Number(formData.animal_type_id),
        gender:
          a.attributes.parentType !== ""
            ? getGenderByParentType(a.attributes.parentType)
            : formData.gender,
        pedigree: a,
      };
      return data;
    });
    let mainAnimal = animals.shift();
    mainAnimal = {
      ...mainAnimal,
      colorMarking: formData.colorAndMark,
      dob: formData.dob,
      microchip: formData.microchipNo,
    };
    const form = new FormData();
    form.append("animalData", JSON.stringify(mainAnimal));
    form.append("animalTypeId", Number(formData.animal_type_id));
    form.append("breedId", Number(formData.animal_breed_id));
    form.append("generations", JSON.stringify(animals));
    form.append("certificate", formData.certificate);
    form.append("userId", state?.companyId);
    form.append("animal_country", formData.country);
    form.append(
      "registration_source",
      animalRegistrationSource.adminRegistration
    );
    if (formData.dnaDoc) form.append("dnaDoc", formData.dnaDoc);
    if (formData.hdedDoc) form.append("hdedDoc", formData.hdedDoc);

    const response = await submit("POST", "animal/import-pedigree", form, {
      "Content-Type": "multipart/form-data",
    });

    if (response?.data?.data?.statusCode === 200 || response?.status === 201) {
      toast.success("Animal added👍!", toastConfig);
      setTree({});
      console.log(
        "response?.data?.data?",
        response?.data?.data?.mainAnimalResult?.identifiers?.[0]
      );

      setTimeout(() => {
        nav(`/admin-layout/litters-details/${state.litterId}`, {
          state: {
            animal_id:
              response?.data?.data?.mainAnimalResult?.identifiers?.[0]
                ?.animal_id,
          },
        });
      }, 1000);
    } else {
      toast.error(
        response.data.message ?? "Something went wrong. Please try again later",
        toastConfig
      );
    }
  }
  return (
    <section className="h-full p-7 font-poppins">
      <div className="flex flex-col justify-center gap-4">
        <h1 className="text-xl font-bold">Add Animal</h1>
        <div className="flex justify-center rounded-lg bg-black">
          <AddAnimalForm
            onSubmit={(data) => addAnimal(data)}
            initialValues={animalInitialValues}
            showCertificateOption={false} // used to toggle checkbox (false for import pedigree)
            editMode={false}
            validationSchema={submitAddPetWithPedigreeSchemas}
            btnLoading={loading}
            btnTitle={"Add Animal"}
          />
        </div>
      </div>
    </section>
  );
};
