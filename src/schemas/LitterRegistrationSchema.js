import * as Yup from "yup";

export const LitterRegistrationSchema = Yup.object({
  dam_id: Yup.string().required("Please select Dam"),
  dob: Yup.string().required("Please select Date of Birth"),
  contactNumber: Yup.string().required(
    "Please enter sire owner contact number"
  ),
  mating_date: Yup.string().required("Please select Mating date"),
  sire_id: Yup.string().required("Please select Sire"),
  meeting_date: Yup.string().required("Please select Meeting date"),
  meeting_time: Yup.string().required("Please select Meeting time"),
  terms: Yup.bool().oneOf([true], "please accept the terms"),
});

export const SemenLitterRegistrationSchema = Yup.object({
  dam_id: Yup.string().required("Please select Dam"),
  dob: Yup.string().required("Please select Date of Birth"),
  mating_date: Yup.string().required("Please select Mating date"),
  meeting_date: Yup.string().required("Please select Meeting date"),
  meeting_time: Yup.string().required("Please select Meeting time"),
  terms: Yup.bool().oneOf([true], "Please accept the terms"),
});
