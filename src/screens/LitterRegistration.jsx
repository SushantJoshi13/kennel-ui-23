import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import InputComponent from "../components/InputComponent";
import TermsCheckbox from "../components/input/TermsCheckbox";
import { toastConfig } from "../constants/toast.constant";
import usePayment, { PAYMENT_STATUS } from "../context/PaymentContext";
import { useCost } from "../context/costContext";
import useAuth from "../context/userContext";
import { useSubmitForm } from "../hooks/useSubmitForm";
import {
  LitterRegistrationSchema,
  SemenLitterRegistrationSchema,
} from "../schemas/LitterRegistrationSchema";
import { getApi } from "../service/axios.service";
import CostService from "../service/cost.service";
import { getTotalCost } from "../utils/getTotalCost";

const LitterRegister = () => {
  // Gender
  const litterGender = ["Male", "Female"];
  // useEffects
  const [editMode, setEditMode] = useState(false);
  const [animals, setAnimals] = useState([]);
  const [dams, setDams] = useState([]);
  const [sires, setSires] = useState([]);
  const [animalSelect, setSelectAnimal] = useState(1);
  const [sireOwner, setSireOwner] = useState();
  const [rowEditIndex, setRowEditIndex] = useState();
  const [cost, setCost] = useState(null);
  const [semenFlow, setSemenFlow] = useState(false);
  const [semenDocs, setSemenDocs] = useState({
    semenBill: null,
    certificate: null,
  });
  // useContext
  const [loader, setLoader] = useState(false);
  const { loading, submit } = useSubmitForm();
  const { user } = useAuth();
  const { ccAvenuePayment, paymentStatus, orderDetails, setPaymentStatus } =
    usePayment();
  const { costs } = useCost();
  const [selectedDamBreed, setSelectedDamBreed] = useState();
  // useNavigate Hook
  const nav = useNavigate();
  // cost service
  const costService = new CostService();

  // useEffect to get cost of form
  useEffect(() => {
    const getCost = async () => {
      const res = await costService.getCostById(6);
      setCost(res?.data?.data);
    };
    getCost();
  }, []);

  const Row = (props) => {
    const { name, gender, colorMark, index, setValues, values } = props;
    return (
      <tr className="text-md">
        <td className="border-2 p-2">{name}</td>
        <td className="border-2 p-2">{gender}</td>
        <td className="border-2 p-2">{colorMark}</td>
        <td className="flex p-2">
          <AiOutlineEdit
            className="mr-4 hover:cursor-pointer"
            onClick={() => {
              setEditMode(true);
              values.litterData = {
                litterName: name,
                litterGender: gender,
                colorMark: colorMark,
              };
              setRowEditIndex(index);
            }}
          />
          <AiOutlineDelete
            onClick={() => {
              setRowEditIndex(index);
              deleteLitter(values, values.litters, setValues);
            }}
            className="hover:cursor-pointer"
          />
        </td>
      </tr>
    );
  };

  const Table = (props) => {
    return (
      <table className="mt-5 w-full border-2">
        <thead className="">
          <th className="border-2 p-3 text-start">Litter Name</th>
          <th className="border-2 p-3 text-start">Litter Gender</th>
          <th className="border-2 p-3 text-start">Color/Mark</th>
          <th className="border-2 p-3 text-start">Action</th>
        </thead>
        <tbody>
          {props.data?.litters?.map((row, index) => (
            <Row
              key={index}
              index={index}
              name={row.litterName}
              gender={row.litterGender}
              colorMark={row.colorMark}
              setValues={props.setValues}
              values={props.data}
            />
          ))}
        </tbody>
      </table>
    );
  };

  const [formData, setFormData] = useState();
  useEffect(() => {
    if (paymentStatus === PAYMENT_STATUS.FAILED) {
      console.log("failed");
      failedPayment();
    }
    if (paymentStatus === PAYMENT_STATUS.SUCCESS) {
      console.log("success");
      litterRegistration(formData);
    }
    if (paymentStatus === PAYMENT_STATUS.PROCESSING) {
      console.log("processing");
    }
  }, [paymentStatus]);
  const failedPayment = () => {
    nav(`/payment?order_id=${orderDetails?.id}`);
  };
  const initiatePayment = async (amount) => {
    const payload = {
      amount: getTotalCost(Number(amount), cost.tax, cost.delivery_fee),
      cost_id: cost.id ?? 6,
      description: cost.description,
      billing_address: user.user_address,
      user_id: user.id,
      user_name: user?.user_name,
    };

    await ccAvenuePayment(payload);
  };
  const formik = useFormik({
    initialValues: {
      dam_id: "",
      //  breedId:"",
      contactNumber: "",
      dob: "",
      sire_id: "",
      meeting_date: "",
      meeting_time: "",
      litters: [],
      mating_date: "",
      litterData: {
        litterName: "",
        litterGender: "",
        colorMark: "",
      },
      terms: false,
    },
    enableReinitialize: true,
    validationSchema: semenFlow
      ? SemenLitterRegistrationSchema
      : LitterRegistrationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setFormData(values);
      // Payment gateway for litter registration
      if (semenFlow) {
        registerSemen(values);
        return;
      }
      if (cost !== null) {
        const amount = cost.amount * values.litters.length;
        setLoader(true);
        initiatePayment(amount);
      } else {
        toast.error(
          "Something went wrong. Please try by refreshing the page",
          toastConfig
        );
        return;
      }
      setLoader(false);
    },
  });

  // Actual Registration
  async function litterRegistration(values) {
    const payload = {
      dam_id: values.dam_id,
      dob: values.dob,
      litters: values.litters,
      sire_id: values.sire_id,
      mating_date: values.mating_date,
      owner_id: user?.id,
      owner_name: user?.name,
      sire_owner_id: sireOwner?.id,
      meeting_date: values.meeting_date,
      meeting_time: values.meeting_time,
    };
    // console.log('payload', payload);
    setPaymentStatus("");
    const res = await submit("POST", "litter/registration", payload);
    if (res?.data?.statusCode === 200 || res.status === 200) {
      toast.success(res?.data?.message, toastConfig);
      nav("/services");
    } else {
      toast.error(res?.data?.message, toastConfig);
    }
  }

  // semen registration
  async function registerSemen(values) {
    const formData = new FormData();
    formData.append("dam_id", values.dam_id);
    formData.append("dob", values.dob);
    formData.append("litters", JSON.stringify(values.litters));
    formData.append("mating_date", values.mating_date);
    formData.append("owner_id", user?.id);
    formData.append("owner_name", user?.name);
    formData.append("meeting_date", values.meeting_date);
    formData.append("meeting_time", values.meeting_time);
    formData.append("semenBill", semenDocs.semenBill);
    formData.append("vetCertificate", semenDocs.certificate);

    const res = await submit("POST", "litter/registration/semen", formData, {
      "Content-Type": "multipart/formdata",
    });
    console.log("semen reg response", res);
  }
  useEffect(() => {
    const getUserDams = async () => {
      const res = await getApi(
        `animal/getAnimals?animal_type_id=${animalSelect}&gender=Female&user_id=${user?.id}`
      );
      setDams(res.data.data);
    };
    getUserDams();
  }, [user?.id, animalSelect]);
  useEffect(() => {
    const getAllAnimal = async () => {
      const res = await getApi("animalMaster");
      setAnimals(res.data.data);
      setSelectAnimal(res.data.data[0].animal_type_id);
    };
    getAllAnimal();
  }, []);

  const handleAddAnimal = (values, setValues) => {
    if (
      formik.values.litterData.litterName === "" ||
      formik.values.litterData.litterGender === "" ||
      formik.values.litterData.colorMark === ""
    ) {
      return toast.error("Please fill all the fields of litter data");
    }
    const updatedLitters = [...values.litters, values.litterData];
    setValues({
      ...values,
      litters: updatedLitters,
      litterData: {
        litterName: "",
        litterGender: "",
        colorMark: "",
      },
    });
  };

  const deleteLitter = (values, litters, setValues) => {
    const data = litters;
    data.splice(rowEditIndex, 1);
    setValues({
      ...values,
      litters: data,
    });
  };

  //! Not working
  const editFn = (litters, values, setValues) => {
    const data = litters;
    data.splice(rowEditIndex, 1, values.litterData);
    setValues({
      ...values,
      litters: data,
      litterData: {
        litterName: "",
        litterGender: "",
        colorMark: "",
      },
    });
    setEditMode(false);
  };

  const getSireOwner = async (number) => {
    const response = await submit(
      "GET",
      `auth/userByContact?contact_no=${number}`
    );
    // getApi(`auth/userByContact?contact_no=${number}`);
    if (response.data.statusCode === 200) {
      setSireOwner(response.data.data);

      const sireResponse = await getApi(
        `animal/getAnimals?animal_type_id=${animalSelect}&gender=Male&user_id=${response.data.data?.id}&animal_breed_id=${selectedDamBreed}`
      );
      setSires(sireResponse.data.data);
    } else {
      toast.error(
        response.data.message ?? "Something went wrong. Please try again"
      );
    }
  };

  const getDamBreed = async (id) => {
    // get dam from dams array with id
    const dam = dams.find((d) => d.animal_id === id);
    // get breed of dam
    setSelectedDamBreed(dam?.animal_breed_id?.animal_breed_id);
  };

  const setFile = (e, id, location) => {
    var loc = document.getElementById(location);
    if (loc) {
      loc.firstChild && loc.removeChild(loc.firstChild);
      var file = document.getElementById(id)?.files[0];
      // console.log("filename", file);
      var reader = new FileReader();
      // it's onload event and you forgot (parameters)
      // console.log(reader);
      reader.onload = function (e) {
        var image = document.createElement("img");
        // the result image data
        image.src = e.target.result;
        loc.appendChild(image);
      };
      file && reader.readAsDataURL(file);
    }

    setSemenDocs({ ...semenDocs, [id]: e.target.files[0] });
    // you have to declare the file loading
  };

  console.log("formik.errors", formik.errors);
  return (
    <section className="h-full bg-primary text-white">
      <div className="max-w-10 container mx-auto">
        <div className="mx-auto h-auto rounded-2xl bg-primary px-5 py-8 sm:w-3/4 sm:px-8 md:w-3/4 lg:w-3/4">
          <p className="w-100 block text-2xl font-semibold">
            Litter Registration
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="my-10 grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
              {animals?.map((animal, i) => {
                return (
                  <button
                    key={i}
                    value={animal.animal_type_id}
                    className={`${
                      animalSelect === animal.animal_type_id
                        ? "cards-primary mx-auto h-10 w-full py-0"
                        : "cards-primary mx-auto h-10 w-full bg-changecol py-0 text-changecol"
                    }`}
                    onClick={(e) => {
                      setSelectAnimal(animal.animal_type_id);
                    }}
                  >
                    {animal.animal_type_name}
                  </button>
                );
              })}
            </div>
            <div>
              <label className="text-sm font-medium text-white">
                Select Dam
              </label>
              <select
                onChange={(e) => {
                  formik.handleChange(e);
                  getDamBreed(e.target.value);
                }}
                name="dam_id"
                className="my-2 h-12 w-full rounded-lg border bg-transparent px-3 py-3 shadow-md outline-gray-700 hover:shadow-xl hover:outline-none md:h-14"
              >
                <option value={""} className="text-black">
                  Select Dam
                </option>
                {dams?.map((d, i) => {
                  return (
                    <option key={i} value={d.animal_id} className="text-black">
                      {d.animal_name} ({d.animal_breed_id.animal_breed_name})
                    </option>
                  );
                })}
              </select>
              <small className="text-red-500">{formik.errors.dam_id}</small>

              <InputComponent
                name="dob"
                type="date"
                placeholder="Litter's Date of Birth"
                onChange={formik.handleChange}
                errorMessage={formik.errors.dob}
                max={new Date().toISOString().split("T")[0]}
                min={
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() - 30)
                  )
                    .toISOString()
                    .split("T")[0]
                }
              />
            </div>
            <div className="rounded-xl md:block">
              <div>
                <p className="mt-8 font-semibold">Litter Details</p>
                <div>
                  <InputComponent
                    variant="standard"
                    type="text"
                    id="litterName"
                    name="litterData.litterName"
                    placeholder="Litter Name"
                    value={formik.values.litterData.litterName}
                    onChange={formik.handleChange}
                  />
                  <div className="mt-3 text-white">
                    <label className="text-sm font-medium text-white">
                      Select Gender
                    </label>
                    <select
                      name="litterData.litterGender"
                      onChange={formik.handleChange}
                      value={formik.values.litterData.litterGender}
                      className="my-2 h-12 w-full rounded-lg border bg-transparent px-3 py-3 shadow-md outline-gray-700 hover:shadow-xl hover:outline-none md:h-14"
                    >
                      <option
                        value={""}
                        // disabled={true}
                        className="text-black"
                      >
                        Select Gender
                      </option>

                      {litterGender?.map((gender, i) => {
                        return (
                          <option key={i} value={gender} className="text-black">
                            {gender}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <InputComponent
                    variant="standard"
                    type="text"
                    id="colorMark"
                    name="litterData.colorMark"
                    placeholder="Litter Color or Mark"
                    value={formik.values.litterData.colorMark}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="">
                  <button
                    className="btn-primary mt-4 w-full"
                    type="button"
                    name="add_more_animals"
                    onClick={() =>
                      editMode
                        ? editFn(
                            formik.values.litters,
                            formik.values,
                            formik.setValues
                          )
                        : handleAddAnimal(formik.values, formik.setValues)
                    }
                  >
                    {editMode ? "Update" : "Add"}
                  </button>
                </div>
              </div>
              {formik.values.litters.length > 0 ? (
                <div className="p-2">
                  <Table data={formik.values} setValues={formik.setValues} />
                </div>
              ) : (
                ""
              )}

              <InputComponent
                name="mating_date"
                type="date"
                placeholder="Dam and Sire Mating Date"
                onChange={formik.handleChange}
                errorMessage={formik.errors.mating_date}
                max={new Date().toISOString().split("T")[0]}
                min={
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() - 30)
                  )
                    .toISOString()
                    .split("T")[0]
                }
              />

              <div className="mt-5">
                <p className="font-semibold text-white">
                  Do you have Sire Owner Details?
                </p>
                <div className="space-x-4 font-semibold text-white">
                  <label className="space-x-1">
                    <input
                      type="radio"
                      name="register_certificate"
                      value="Yes"
                      checked={!semenFlow}
                      onChange={() => {
                        setSemenFlow(!semenFlow);
                      }}
                    />
                    <span>YES</span>
                  </label>
                  <label className="space-x-1">
                    <input
                      type="radio"
                      name="register_certificate"
                      value="No"
                      checked={semenFlow}
                      onChange={() => {
                        setSemenFlow(!semenFlow);
                      }}
                    />
                    <span>NO</span>
                  </label>
                </div>
              </div>
              {semenFlow ? (
                <div className="mt-5">
                  <InputComponent
                    name={`semenBill`}
                    id="semenBill"
                    type="file"
                    placeholder="Semen Bill"
                    onChange={(e) =>
                      setFile(e, "semenBill", "semenBillDisplay")
                    }
                    errorMessage={
                      semenDocs.semenBill
                        ? ""
                        : "Semen Bill is required for verification"
                    }
                  />
                  <InputComponent
                    name={`certificate`}
                    id="certificate"
                    type="file"
                    placeholder="Vet certificate"
                    onChange={(e) =>
                      setFile(e, "certificate", "certificateDisplay")
                    }
                    errorMessage={
                      semenDocs.certificate ? "" : "Vet certificate is required"
                    }
                  />
                  {/* <div
                    id="semenBillDisplay"
                    className="output max-w-[200px]"
                  ></div> */}
                </div>
              ) : (
                <div className="mt-8">
                  <p className="font-semibold">
                    Sire Owner Details Confirmation
                  </p>
                  {!!sireOwner ? (
                    <div className="mt-5">
                      <p className="font-semibold">
                        Name: {sireOwner?.user_name}
                      </p>
                      <p className="my-4 font-semibold">
                        Contact Number :{sireOwner?.contact_no}
                      </p>
                      <select
                        onChange={formik.handleChange}
                        value={formik.values.sire_id}
                        name="sire_id"
                        className="my-2 h-12 w-full rounded-lg border bg-transparent px-3 py-3 shadow-md outline-gray-700 hover:shadow-xl hover:outline-none md:h-14 md:w-1/3"
                      >
                        <option value={""} className="text-black">
                          Select Sire
                        </option>
                        {sires?.map((d, i) => {
                          return (
                            <option
                              key={i}
                              value={d.animal_id}
                              className="text-black"
                            >
                              {d.animal_name} (
                              {d.animal_breed_id.animal_breed_name})
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  ) : (
                    <div className="grid items-center md:grid-cols-2 md:gap-5">
                      <InputComponent
                        id="contactNumber"
                        name="contactNumber"
                        placeholder="Mobile Number"
                        onChange={formik.handleChange}
                        errorMessage={formik.errors.contactNumber}
                      />
                      <button
                        disabled={loading}
                        onClick={() => {
                          if (formik.values.contactNumber.length !== 10) {
                            formik.setFieldError(
                              "contactNumber",
                              "Please enter valid mobile number"
                            );
                          } else {
                            getSireOwner(formik.values.contactNumber);
                          }
                        }}
                        className="btn-primary mt-8 content-end md:h-14"
                      >
                        {loading ? (
                          <span className="loader"></span>
                        ) : (
                          "Get Owner Details"
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8">
                <p className="font-semibold">Video Call Meet Details</p>
                <div className="mt-2 py-2">
                  <p className="font-semibold">Meeting Date</p>
                  <InputComponent
                    variant="standard"
                    type="date"
                    id="meetDate"
                    name="meeting_date"
                    value={formik.values.meeting_date}
                    errorMessage={formik.errors.meeting_date}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="mt-2 py-2">
                  <p className="font-semibold">Meeting Time</p>
                  <InputComponent
                    variant="standard"
                    type="time"
                    id="meetTime"
                    name="meeting_time"
                    value={formik.values.meeting_time}
                    onChange={formik.handleChange}
                    errorMessage={formik.errors.meeting_time}
                  />
                </div>
              </div>
              <TermsCheckbox
                onChange={(checked) => formik.setFieldValue("terms", checked)}
                name={"terms"}
                error={formik.errors.terms}
                termTitle={""}
                linkTitle={"Terms & condition"}
                termContent={
                  <p>
                    DECLARATION TO BE SIGNED BY BREEDER/S IN CASE OF LITTER
                    REGISTRATION
                    <br />
                    <br />
                    I/We hereby declare that the bitch gave birth to a litter of
                    puppies of which MALE and FEMALE are alive today, and
                    application for registration has been made for all live
                    puppies.
                    <br />
                    <br />
                  </p>
                }
                modalTitle={"Litter Registration"}
              />
            </div>
            <div>
              {formik.values.litters.length > 0 ? (
                <>
                  <button
                    type="submit"
                    disabled={
                      formik.values.litters.length === 0 || loading || loader
                    }
                    className="btn-primary mt-5 w-full disabled:cursor-not-allowed"
                  >
                    {loading || loader ? (
                      <span className="loader"></span>
                    ) : (
                      "Pay and Submit"
                    )}
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  className="btn-disabled w-full mt-5"
                  disabled
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default LitterRegister;
