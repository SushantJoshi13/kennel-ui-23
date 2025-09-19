import * as Yup from "yup";
const phoneRegExp = /^[0-9]{10}$/;

export const animalValidationSchema = Yup.object({
  animal_type: Yup.string().required("Please Enter Type of Animal"),
});

export const RegisterValidation = Yup.object({
  farm_type: Yup.array().min(1, "Please select at least one farm type"),
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string("Enter your password")
    .min(8, "Password should be of atleast 8 characters length")
    .required("Password is required"),
  contact_no: Yup.string("Enter your Contact Number")
    .min(10, "10 Digit number please")
    .max(10, "10 Digit number please")
    .required("Contact Number is required"),
  isBreeder: Yup.boolean(),
  country: Yup.string().required("Please select country"),
  identification_no: Yup.string("Enter your Identification Number").required(
    "Identification Number is required"
  ),
  first_name: Yup.string("Enter your First Name").required(
    "First name is required"
  ),
  last_name: Yup.string("Enter your Last Name").required(
    "Last name is required"
  ),

  identification_doc: Yup.mixed().required("Please upload Identity Document"),
  address: Yup.string("Please Enter Address").required("Address is Required"),
});

export const addBreedSchema = Yup.object({
  animal_breed_name: Yup.string().required("Breed Name is required"),
  animal_breed_description: Yup.string().required("Breed Description is required"),
  breed_image: Yup.mixed().required("Select an image"),
});

export const addFarmTypeSchema = Yup.object({
  farm_name: Yup.string().required("Please Enter a valid name"),
  farm_description: Yup.string(),
});

export const addCostSchema = Yup.object({
  name: Yup.string().required("Please Enter Name"),
  description: Yup.string().required("Please Enter Description"),
  amount: Yup.string().required("Please Enter Amount"),
  tax: Yup.number().required("Please Enter Tax"),
  delivery_fee: Yup.number().required("Please Enter Delivery Fee"),
});

export const StatusSchema = Yup.object({
  status: Yup.string().required("Please Select Status"),
  reason: Yup.string().required("Give a reason for it"),
});

export const UpdateProfileSchema = Yup.object({
  contact_no: Yup.string("Enter your Contact Number")
    .min(10, "10 Digit number please")
    .max(10, "10 Digit number please")
    .required("Contact Number is required"),
  user_name: Yup.string("Enter your User Name").required(
    "User name is required"
  ),
  identification_id_no: Yup.string("Enter your Identification Number").required(
    "Identification Number is required"
  ),
  identity_doc_name: Yup.mixed(),
  user_address: Yup.string("Please Enter Address").required(
    "Address is Required"
  ),
});

export const breederEditSchema = Yup.object({
  breeder_name: Yup.string().required("name is required"),
  breeder_contact_no: Yup.string().required("contact number is required"),
  identification_id_name: Yup.string().required(
    "Identification name is required"
  ),
  identification_number: Yup.string().required(
    "Identification number is required"
  ),
});

export const confirmRejectSchema = Yup.object({
  request_rejection_reason: Yup.string().required("Give a reason for it"),
});

export const AnimalByRegNoValidation = Yup.object({
  registerNumber: Yup.string().required("Please enter registration number"),
  terms: Yup.bool().required().oneOf([true], "please accept the terms"),
});

export const RegisterIndividualSchema = Yup.object({
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string("Enter your password")
    .min(8, "Password should be of atleast 8 characters length")
    .required("Password is required"),
  contact_no: Yup.string("Enter your Contact Number")
    .min(10, "10 Digit number please")
    .max(10, "10 Digit number please")
    .required("Contact Number is required"),
  country: Yup.string().required("Please select country"),
  identification_no: Yup.string("Enter your Identification Number").required(
    "Identification Number is required"
  ),
  first_name: Yup.string("Enter your First Name").required(
    "First name is required"
  ),
  last_name: Yup.string("Enter your Last Name").required(
    "Last name is required"
  ),
  identification_doc: Yup.mixed().required("Please upload Identity Document"),
});

export const changePetNameSchema = Yup.object({
  animal_registration_number: Yup.string().required(
    "Please Enter Animal Registraion number"
  ),
  name: Yup.string().required("New name is required"),
  terms: Yup.bool().oneOf([true], "please accept the terms"),
});

export const exportPedigree = Yup.object({
  animal_registration_number: Yup.string().required(
    "Please Enter Animal Registration number"
  ),
  country: Yup.string().required("Please select country"),
});

export const AddFarmValidation = Yup.object({
  farm_name: Yup.string().required("Farm Name is required"),
  farm_address: Yup.string().required("Farm Address is required"),
  license_number: Yup.string().required("License number is required"),
  license_expiry: Yup.string().required("License Expiry is required"),
  identification_doc: Yup.mixed().required(
    "Identification Document is required"
  ),
  logo: Yup.mixed().required("Logo is required"),
});

export const RegisterAnimalChangeStatusSchema = Yup.object({
  status: Yup.bool()
    .required("Please select status.")
    .oneOf([true, false], "Please select status"),
  reason: Yup.string().required("Please enter reason"),
});

export const ProfileValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  license_number: Yup.string().required("License number is required"),
  address: Yup.string().required("Address is required"),
});

export const BreederProfileSchema = Yup.object({
  farm_type: Yup.string().required("Farm type is required"),
  farm_name: Yup.string().required("Farm name is required"),
  farm_address: Yup.string().required("Farm address is required"),
});
