import * as Yup from "yup";

export const submitAddPetSchemas = Yup.object().shape({
  animal_type_id: Yup.string().required("Please select type of Animal"),
  animal_breed_id: Yup.string().required("Please enter your Animal's Breed "),
  name: Yup.string().required("Please add animal name"),
  dob: Yup.mixed().required("Please select DOB"),
  colorAndMark: Yup.string().required("Please enter Color or Mark of Animal"),
  breeder_name: Yup.string().required("Please enter Breeder's Name"),
  microchipNo: Yup.string().notRequired(),
  country: Yup.string().required("Please select country"),
  frontView: Yup.mixed().required("Please add front view image"),
  leftView: Yup.mixed().required("Please add left view image"),
  rightView: Yup.mixed().required("Please add right view image"),
  terms: Yup.bool().oneOf([true], "please accept the terms"),
});

export const editAnimalSchema = Yup.object().shape({
  animal_type_id: Yup.string().required("Please select type of Animal"),
  animal_breed_id: Yup.string().required("Please enter your Animal's Breed "),
  name: Yup.string().required("Please add animal name"),
  dob: Yup.mixed().required("Please select DOB"),
  colorAndMark: Yup.string().required("Please enter Color or Mark of Animal"),
  breeder_name: Yup.string().required("Please enter Breeder's Name"),
  microchipNo: Yup.string().notRequired(),
  country: Yup.string().required("Please select country"),
});

export const submitAddPetWithPedigreeSchemas = Yup.object().shape({
  animal_type_id: Yup.string().required("Please select type of Animal"),
  animal_breed_id: Yup.string().required("Please enter your Animal's Breed "),
  dob: Yup.mixed().required("Please select DOB"),
  colorAndMark: Yup.string().required("Please enter Color or Mark of Animal"),
  breeder_name: Yup.string().required("Please enter Breeder's Name"),
  microchipNo: Yup.string().notRequired(),
  country: Yup.string().required("Please select country"),
  certificate: Yup.mixed().required("Please upload registration certificates"),
  terms: Yup.bool().oneOf([true], "please accept the terms"),
});

export const editAddPetWithPedigreeSchemas = Yup.object().shape({
  animal_type_id: Yup.string().required("Please select type of Animal"),
  animal_breed_id: Yup.string().required("Please enter your Animal's Breed "),
  dob: Yup.mixed().required("Please select DOB"),
  colorAndMark: Yup.string().required("Please enter Color or Mark of Animal"),
  breeder_name: Yup.string().required("Please enter Breeder's Name"),
  microchipNo: Yup.string().notRequired(),
  country: Yup.string().required("Please select country"),
});
