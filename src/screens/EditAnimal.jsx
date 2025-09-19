import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AddAnimalForm } from "../components/forms/AddAnimalForm";
import { useTreeContext } from "../context/TreeContext";
import useAuth from "../context/userContext";
import { useSubmitForm } from "../hooks/useSubmitForm";
import {
  editAddPetWithPedigreeSchemas,
  editAnimalSchema,
} from "../schemas/AddPetSchema";
import { processTree } from "../utils/tree.util";
import { getGenderByParentType } from "../utils/helper";
import { toast } from "react-toastify";
import { toastConfig } from "../constants/toast.constant";

const animalInitialValues = {
  animal_type_id: "",
  animal_breed_id: "",
  name: "",
  dob: "",
  colorAndMark: "",
  gender: "Male",
  microchipNo: "",
  country: "",
  frontView: "",
  leftView: "",
  rightView: "",
  certificate: "",
  dnaDoc: "",
  hdedDoc: "",
  terms: false,
};

const EditAnimal = (props) => {
  // useContext
  const { user } = useAuth();
  const { state } = useLocation();
  const { tree, register_certificate, setRegisterCertificate, setTree } =
    useTreeContext();
  // Loader
  const { loading, submit } = useSubmitForm();
  // Props
  const { hasCertificateOptions, edit = false } = props;
  // useNavigate
  const nav = useNavigate();

  useEffect(() => {
    // setTree(state?.animal_pedigree ?? {});
    if (state?.animal_pedigree === null) {
      setRegisterCertificate(false);
    } else {
      setRegisterCertificate(true);
    }
  }, []);

  const editAnimal = async (data) => {
    const form = new FormData();
    if (Object.keys(tree).length > 0) {
      let animals = processTree(tree);
      console.log("animals", animals);
      animals = animals.map((a) => {
        const sire = a.children.find((p) => p.attributes.parentType === "Sire");
        const dam = a.children.find((p) => p.attributes.parentType === "Dam");
        const animalData = {
          name: a.name,
          id: a.attributes.uuid,
          sireId: sire?.attributes?.uuid ?? null,
          damId: dam?.attributes?.uuid ?? null,
          breedId: Number(data.animal_breed_id),
          animalType: Number(data.animal_type_id),
          gender:
            a.attributes.parentType !== ""
              ? getGenderByParentType(a.attributes.parentType)
              : data.gender,
          pedigree: a,
        };
        return animalData;
      });
      let mainAnimal = animals.shift();
      mainAnimal = {
        ...mainAnimal,
        colorMarking: data.colorAndMark,
        dob: data.dob,
        microchip: data.microchipNo,
      };
      form.append("animal_name", mainAnimal.name);
      form.append("generations", JSON.stringify(animals));
    } else {
      form.append("animal_name", data.name);
    }
    form.append("animal_type_id", Number(data.animal_type_id));
    form.append("animal_breed_id", Number(data.animal_breed_id));
    form.append("animal_date_of_birth", data.dob);
    form.append("animal_owner_id", user?.id);
    form.append("animal_color_and_markings", data.colorAndMark);
    form.append("animal_gender", data.gender);
    form.append("animal_microchip_id", data.microchipNo);
    form.append("animal_country", data.country);
    if (data.dnaDoc) form.append("animal_dna_doc", data.dnaDoc);
    if (data.hdedDoc) form.append("animal_hded_doc", data.hdedDoc);
    if (data.certificate)
      form.append("animal_registration_doc", data.certificate);
    if (data.frontView) form.append("animal_front_view_image", data.frontView);
    if (data.leftView) form.append("animal_left_view_image", data.leftView);
    if (data.rightView) form.append("animal_right_view_image", data.rightView);

    const response = await submit(
      "PUT",
      `animal/update/${state.animal_id}`,
      form,
      {
        "Content-Type": "multipart/form-data",
      }
    );
    if (response?.data?.statusCode === 200 && response?.status === 200) {
      toast.success("Animal updated!", toastConfig);
      setTree({});
      setTimeout(() => {
        nav(-1);
      }, 1000);
    } else {
      toast.error(
        response.data.message ?? "Something went wrong. Please try again later",
        toastConfig
      );
    }
  };

  return (
    <section className="h-full min-h-full bg-primary font-poppins">
      <div className="flex justify-center rounded-lg">
        <AddAnimalForm
          onSubmit={(data) => editAnimal(data)}
          initialValues={
            edit
              ? {
                  ...animalInitialValues,
                  ...state,
                  animal_type_id: state.animal_type_id.animal_type_id,
                  animal_breed_id: state.animal_breed_id.animal_breed_id,
                  name: state.animal_name,
                  dob: state.animal_date_of_birth,
                  colorAndMark: state.animal_color_and_markings,
                  gender: state.animal_gender,
                  microchipNo: state.animal_microchip_id,
                  country: state.animal_country,
                  terms: true,
                }
              : animalInitialValues
          }
          showCertificateOption={hasCertificateOptions} // used to toggle checkbox (false for import pedigree)
          editMode={edit}
          validationSchema={
            state?.animal_pedigree
              ? editAddPetWithPedigreeSchemas
              : editAnimalSchema
          }
          btnLoading={loading}
        />
      </div>
    </section>
  );
};
export default EditAnimal;
