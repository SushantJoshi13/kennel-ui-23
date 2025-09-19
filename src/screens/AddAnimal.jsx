import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AddAnimalForm } from "../components/forms/AddAnimalForm";
import { animalRegistrationSource } from "../constants/app.constants";
import { toastConfig } from "../constants/toast.constant";
import { useTreeContext } from "../context/TreeContext";
import useAuth from "../context/userContext";
import { usePaymentHook } from "../hooks/usePaymentHook";
import { useSubmitForm } from "../hooks/useSubmitForm";
import {
  submitAddPetSchemas,
  submitAddPetWithPedigreeSchemas,
} from "../schemas/AddPetSchema";
import { getGenderByParentType } from "../utils/helper";
import { processTree } from "../utils/tree.util";

export const animalInitialValues = {
  animal_type_id: "",
  animal_breed_id: "",
  name: "",
  dob: "",
  colorAndMark: "",
  gender: "Male",
  breeder_name: "",
  microchipNo: "",
  country: "",
  frontView: "",
  leftView: "",
  rightView: "",
  certificate: "",
  dnaDoc: "",
  hdedDoc: "",
  terms: false,
  tagNumber: "",
};

const AddAnimal = (props) => {
  // useContext
  const { user } = useAuth();
  const { tree, register_certificate, setRegisterCertificate, setTree } =
    useTreeContext();
  // const {
  //   createPayment,
  //   ccAvenuePayment,
  //   paymentStatus,
  //   orderDetails,
  //   setPaymentStatus,
  // } = usePayment();
  // cost Service
  // const costService = new CostService();
  // Loader
  const [loader, setLoader] = useState(false);
  const { loading, submit } = useSubmitForm();
  // Props
  const { hasCertificateOptions } = props;
  // useNavigate
  const nav = useNavigate();
  // useStates
  // const [cost, setCost] = useState(null);
  const [formData, setFormData] = useState();
  useEffect(() => {
    // used to toggle checkbox (false for import pedigree)
    if (!hasCertificateOptions) setRegisterCertificate(true);
  }, [hasCertificateOptions]);

  // useEffect(() => {
  //   if (paymentStatus === PAYMENT_STATUS.FAILED) {
  //     console.log("failed");
  //     failedPayment();
  //   }
  //   if (paymentStatus === PAYMENT_STATUS.SUCCESS) {
  //     console.log("success");
  //     determineFormSubmission();
  //   }
  //   if (paymentStatus === PAYMENT_STATUS.PROCESSING) {
  //     console.log("processing");
  //   }
  // }, [paymentStatus]);

  const failedPayment = () => {
    nav(`/payment?order_id=${orderDetails?.id}`);
  };
  // add animal to db
  const determineFormSubmission = () => {
    setLoader(true);
    if (register_certificate) {
      // meaning animal has registration certificate
      createAnimalWithPedigree(formData);
    } else {
      // meaning animal does not has registration certificate
      createAnimal(formData);
    }
    resetHook();
  };

  // useEffect to get cost of form
  // useEffect(() => {
  //   const getCost = async () => {
  //     const res = await costService.getCostById(3);
  //     setCost(res?.data?.data);
  //   };
  //   getCost();
  // }, []);

  // const initiatePayment = async () => {
  //   const payload = {
  //     amount: getTotalCost(Number(cost.amount), cost.tax, cost.delivery_fee),
  //     cost_id: cost.id ?? 3,
  //     description: cost.description,
  //     billing_address: user.user_address,
  //     user_id: user.id,
  //     user_name: user?.user_name,
  //   };

  //   await ccAvenuePayment(payload);
  // };

  // add animal with pedigree
  // deprecated
  // const addAnimalWithPedigree = async (formData) => {
  //   // Payment gateway for animal registration
  //   if (cost !== null) {
  //     await createPayment(
  //       {
  //         amount: getTotalCost(cost.amount, cost.tax, cost.delivery_fee),
  //         cost_id: cost.id ?? 3,
  //         description:
  //           cost.description ?? "Unknown Pedigree Animal Registration",
  //         billing_address: user.user_address,
  //         user_id: user.id,
  //       },
  //       async (completeOrder, order) => {
  //         if (completeOrder?.data?.statusCode === 200) {
  //           await createAnimalWithPedigree(formData);
  //         }
  //       }
  //     );
  //   } else {
  //     toast.error("Something went wrong. Please try again!", toastConfig);
  //   }
  //   setLoader(false);
  // };

  async function createAnimalWithPedigree(formData) {
    let animals = await processTree(tree);
    animals = animals.filter((animal) => animal.name !== "unknown");
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
      animal_tag: formData.tagNumber,
    };
    const form = new FormData();
    form.append("animalData", JSON.stringify(mainAnimal));
    form.append("animalTypeId", Number(formData.animal_type_id));
    form.append("breedId", Number(formData.animal_breed_id));
    form.append("generations", JSON.stringify(animals));
    form.append("breeder_name", formData.breeder_name);
    form.append("certificate", formData.certificate);
    form.append("userId", user?.id);
    form.append("animal_country", formData.country);
    form.append(
      "registration_source",
      animalRegistrationSource.adminRegistration
    );

    if (formData.dnaDoc) form.append("dnaDoc", formData.dnaDoc);
    if (formData.hdedDoc) form.append("hdedDoc", formData.hdedDoc);

    const response = hasCertificateOptions
      ? await submit("POST", "animal/create/pedigree", form, {
          "Content-Type": "multipart/form-data",
        })
      : await submit("POST", "animal/import-pedigree", form, {
          "Content-Type": "multipart/form-data",
        });

    if (response?.data?.data?.statusCode === 200 || response?.status === 201) {
      toast.success("Animal added👍!", toastConfig);
      setTree({});
      setTimeout(() => {
        nav("/services");
      }, 1000);
    } else {
      toast.error(
        response.data.message ?? "Something went wrong. Please try again later",
        toastConfig
      );
    }
    setLoader(false);
  }

  // add single animal
  // deprecated
  // const addSingleAnimal = async (data) => {
  //   // Payment gateway for single animal registration
  //   if (cost !== null) {
  //     ccAvenuePayment({
  //       amount: cost.amount,
  //       cost_id: cost.id,
  //       description: cost.description ?? "Animal Registration",
  //       billing_address: user.user_address,
  //       user_id: user.id,
  //       user_name: user?.user_name,
  //     });
  //     await createPayment(
  //       {
  //         amount: cost.amount,
  //         cost_id: cost.id,
  //         description: cost.description ?? "Animal Registration",
  //         billing_address: user.user_address,
  //         user_id: user.id,
  //         user_name: user?.user_name,
  //       },
  //       async (completeOrder, order) => {
  //         if (completeOrder?.data?.statusCode === 200) {
  //           await createAnimal(data);
  //         }
  //       }
  //     );
  //   } else {
  //     toast.error(
  //       "Something went wrong. Please try by refreshing the page",
  //       toastConfig
  //     );
  //   }
  //   setLoader(false);
  // };

  async function createAnimal(data) {
    const formData = new FormData();

    formData.append("animal_name", data.name);
    formData.append("animal_type_id", Number(data.animal_type_id));
    formData.append("animal_breed_id", Number(data.animal_breed_id));
    formData.append("animal_color_and_markings", data.colorAndMark);
    formData.append("animal_gender", data.gender);
    formData.append("animal_date_of_birth", data.dob);
    formData.append("breeder_name", data.breeder_name);
    formData.append("animal_microchip_id", data.microchipNo);
    formData.append("animal_owner_id", user?.id);
    formData.append("animal_country", data.country);
    formData.append("animal_front_view_image", data.frontView);
    formData.append("animal_left_view_image", data.leftView);
    formData.append("animal_right_view_image", data.rightView);
    formData.append("animal_tag", data.tagNumber);
    if (data.dnaDoc) formData.append("animal_dna_doc", data.dnaDoc);
    if (data.hdedDoc) formData.append("animal_hded_doc", data.hdedDoc);

    const res = await submit("POST", "animal/create", formData, {
      "Content-Type": "multipart/form-data",
    });

    if (res.data?.status === 200 || res.status === 200) {
      toast.success(res.data?.message, toastConfig);
      setTimeout(() => {}, 2000);
      nav("/");
    } else {
      toast.error(res.data?.message, toastConfig);
    }
  }

  const { initiatePayment, orderDetails, resetHook } = usePaymentHook(
    3,
    determineFormSubmission,
    failedPayment
  );

  return (
    <section className="h-full min-h-full bg-primary font-poppins">
      <div className="flex justify-center rounded-lg">
        <AddAnimalForm
          onSubmit={(data) => {
            setFormData(data);
            initiatePayment();
          }}
          initialValues={animalInitialValues}
          showCertificateOption={hasCertificateOptions} // used to toggle checkbox (false for import pedigree)
          editMode={false}
          validationSchema={
            register_certificate
              ? submitAddPetWithPedigreeSchemas
              : submitAddPetSchemas
          }
          btnLoading={loading || loader}
        />
      </div>
    </section>
  );
};
export default AddAnimal;
