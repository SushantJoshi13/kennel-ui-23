import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import InputComponent from "../components/InputComponent";
import { DropDownField } from "../components/dropdown/DropDownField";
import { toastConfig } from "../constants/toast.constant";
import usePayment, { PAYMENT_STATUS } from "../context/PaymentContext";
import useAuth from "../context/userContext";
import { useFetchUser } from "../hooks/useFetchUser";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { AddFarmValidation } from "../schemas/Validator";
import CostService from "../service/cost.service";
import { getTotalCost } from "../utils/getTotalCost";

const AddFarm = () => {
  const { loading, submit } = useSubmitForm();
  const [loader, setLoader] = useState(false);

  const [farmType, setFarmType] = useState([]);
  const [selectedAnimalType, setSelectedAnimalType] = useState({
    label: "",
    value: "",
  });
  const [selectedFarm, setSelectedFarm] = useState({ label: "", value: "" });
  const { user, breeder } = useAuth();
  const [AnimalType, setAnimalType] = useState([]);
  const nav = useNavigate();
  const costService = new CostService();
  const [cost, setCost] = useState(null);
  const {
    createPayment,
    ccAvenuePayment,
    paymentStatus,
    orderDetails,
    setPaymentStatus,
  } = usePayment();
  const [formData, setFormData] = useState();
  useEffect(() => {
    const getCost = async () => {
      const res = await costService.getCostById(2);
      setCost(res?.data?.data);
    };
    getCost();
  }, []);
  const failedPayment = () => {
    nav(`/payment?order_id=${orderDetails?.id}`);
  };
  useEffect(() => {
    if (paymentStatus === PAYMENT_STATUS.FAILED) {
      console.log("failed");
      failedPayment();
    }
    if (paymentStatus === PAYMENT_STATUS.SUCCESS) {
      console.log("success");
      submitForm(formData);
    }
    if (paymentStatus === PAYMENT_STATUS.PROCESSING) {
      console.log("processing");
    }
  }, [paymentStatus]);

  async function getFarmTypes() {
    const res = await submit("GET", "master/getAllFarmTypes", {});
    if (res.status === 200) {
      const FarmList = res.data?.data?.map((item) => {
        if (!item || !item.farm_name) item.farm_name = "N.A.";
        return {
          label: item.farm_name,
          value: item.farm_id,
        };
      });
      setFarmType(FarmList);
    } else {
      toast.error(res.data?.message, toastConfig);
    }
  }
  const getAnimalTypes = async () => {
    const res = await submit("GET", "animalMaster", {});
    if (res.status === 200) {
      const AnimalTypeList = res.data?.data?.map((item) => {
        if (!item || !item.animal_type_name) item.animal_type_name = "N.A.";
        return {
          label: item.animal_type_name,
          value: item.animal_type_id,
        };
      });
      setAnimalType(AnimalTypeList);
    } else {
      toast.error(res.data?.message, toastConfig);
    }
  };
  useEffect(() => {
    getFarmTypes();
    getAnimalTypes();
  }, []);

  const fetchUser = useFetchUser();

  const initiatePayment = async () => {
    const payload = {
      amount: getTotalCost(Number(cost.amount), cost.tax, cost.delivery_fee),
      cost_id: cost.id ?? 3,
      description: cost.description,
      billing_address: user.user_address,
      user_id: user.id,
      user_name: user?.user_name,
    };

    await ccAvenuePayment(payload);
  };
  // razorpay deprecated
  const handleAddFarm = async (data, action) => {
    if (cost !== null) {
      setLoader(true);
      await createPayment(
        {
          amount: getTotalCost(cost.amount, cost.tax, cost.delivery_fee),
          cost_id: cost.id ?? 2,
          description: cost.description ?? "Kennel Registration",
          billing_address: user.user_address,
          user_id: user.id,
        },
        async (completeOrder, order) => {
          if (completeOrder?.data?.statusCode === 200) {
            await submitForm(data, action);
          }
        }
      );
      setLoader(false);
    } else {
      toast.error(
        "Something went wrong. Please try by refreshing the page",
        toastConfig
      );
      return;
    }
  };

  const submitForm = async (data) => {
    const fd = new FormData();
    fd.append("user_id", user.id);
    fd.append("breeder_id", breeder.breeder.breeder_id);
    fd.append("farm_id", selectedFarm.value);
    fd.append("farm_name", data.farm_name);
    fd.append("animal_type_id", selectedAnimalType.value);
    fd.append("farm_address", data.farm_address);
    fd.append("license_no", data.license_number);
    fd.append("license_expiry_date", data.license_expiry);
    fd.append("license_doc_name", data.identification_doc);
    fd.append("logo", data.logo);
    const res = await submit("POST", "breederFarm/add-farm", fd, {
      "Content-Type": "multipart/formdata",
    });

    if (res.data.statusCode === 200) {
      toast.success(res.data.message, toastConfig);
      fetchUser(user.id);
      formik.resetForm({
        values: {
          farm_name: "",
          farm_address: "",
          license_number: "",
          license_expiry: "",
          identification_doc: null,
          logo: null,
        },
      });
      nav("/profile");
    } else {
      toast.error(res.data?.message, toastConfig);
    }
    setLoader(false);
  };

  useEffect(() => {
    getFarmTypes();
    getAnimalTypes();
  }, []);

  const formik = useFormik({
    initialValues: {
      farm_name: "",
      farm_address: "",
      license_number: "",
      license_expiry: "",
      identification_doc: null,
      logo: null,
    },
    validationSchema: AddFarmValidation,

    onSubmit: (data, action) => {
      setFormData(data);
      initiatePayment();
    },
  });

  return (
    <section className="h-full bg-primary p-7 font-poppins">
      <div className="flex flex-col items-center justify-center gap-4 text-white">
        <div>
          <h1 className="text-2xl">Add Farm</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div>
              <DropDownField
                data={farmType}
                label={"Farm Types"}
                className={"font-medium text-white"}
                onSelect={(data) => setSelectedFarm(data)}
              />
            </div>
            <div>
              <DropDownField
                data={AnimalType}
                label={"Animal Types"}
                className={"font-medium text-white"}
                onSelect={(data) => setSelectedAnimalType(data)}
              />
              <InputComponent
                name={"farm_name"}
                placeholder={"Farm Name"}
                value={formik.values.farm_name}
                onChange={formik.handleChange}
                errorMessage={
                  formik.touched.farm_name ? formik.errors.farm_name : ""
                }
              />
            </div>
            <div>
              <InputComponent
                name={"farm_address"}
                value={formik.values.farm_address}
                placeholder={"Farm Address"}
                onChange={formik.handleChange}
                errorMessage={
                  formik.touched.farm_address ? formik.errors.farm_address : ""
                }
              />
            </div>

            <div>
              <InputComponent
                name={"license_number"}
                value={formik.values.license_number}
                placeholder={"License Number"}
                onChange={formik.handleChange}
                errorMessage={
                  formik.touched.license_number
                    ? formik.errors.license_number
                    : ""
                }
              />
            </div>
            <div>
              <InputComponent
                id="license_expiry"
                name="license_expiry"
                type="date"
                value={formik.values.license_expiry}
                placeholder="Date of License expiry"
                onChange={formik.handleChange}
                errorMessage={
                  formik.touched.license_expiry
                    ? formik.errors.license_expiry
                    : ""
                }
                required={true}
              />
            </div>
            <div>
              <label htmlFor="identification_doc">License</label>
              <input
                className="my-2 h-12 w-full rounded-lg border bg-transparent px-3 py-3 text-white shadow-md outline-gray-700 hover:shadow-xl hover:outline-none md:h-14"
                id="identification_doc"
                name="identification_doc"
                type="file"
                // value={formik.values.identification_doc}
                onChange={(e) => {
                  formik.setFieldValue("identification_doc", e.target.files[0]);
                }}
                // onChange={formik.handleChange}
              />
              <span className="text-red-400">
                {formik.touched.identification_doc
                  ? formik.errors.identification_doc
                  : ""}
              </span>
            </div>
            <div>
              <label htmlFor="logo">Logo</label>
              <input
                className="my-2 h-12 w-full rounded-lg border bg-transparent px-3 py-3 text-white shadow-md outline-gray-700 hover:shadow-xl hover:outline-none md:h-14"
                id="logo"
                name="logo"
                type="file"
                // value={formik.values.logo}
                onChange={(e) => {
                  formik.setFieldValue("logo", e.target.files[0]);
                }}
              />
              <span className="text-red-400">
                {formik.touched.logo ? formik.errors.logo : ""}
              </span>
            </div>
            <div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary m-auto mt-4 flex w-full items-center justify-center rounded-md py-1 text-white"
                >
                  {loading || loader ? (
                    <span className="loader"></span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddFarm;
