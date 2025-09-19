import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../context/userContext";
import { useSubmitForm } from "../hooks/useSubmitForm";

import { exportPedigree } from "../schemas/Validator";
import CountryDropDown from "../components/CountryDropDown";
import { getApi } from "../service/axios.service";

const ExportPedigree = () => {
  const nav = useNavigate();
  const { loading, submit } = useSubmitForm();
  const { user } = useAuth();
  const [Animals, setAnimals] = useState([]);

  const formik = useFormik({
    initialValues: {
      animal_registration_number: "",
      country: "",
    },
    validationSchema: exportPedigree,
    onSubmit: () => {},
  });

  useEffect(() => {
    const getAnimals = async () => {
      const res = await getApi(`animal/getAnimals?user_id=${user.id}`);
      setAnimals(res.data.data);
    };
    getAnimals();
  }, [user?.id]);
  return (
    <section className="h-screen bg-primary  p-7 font-poppins">
      <div className="max-w-10 container mx-auto">
        <div className="mx-auto h-auto rounded-2xl bg-primary py-8 sm:w-3/4 sm:px-8 md:w-3/4 md:px-10 lg:w-5/12">
          <p className="mb-4 text-2xl font-semibold text-white">
            Export Pedigree
          </p>
          <form onSubmit={formik.handleSubmit}>
            <label className="mt-4 text-sm font-medium text-white">
              Select Animal
            </label>
            <select
              className="my-2 h-12 w-full rounded-lg border bg-transparent px-3 py-3 text-white shadow-md outline-gray-700 hover:shadow-xl hover:outline-none md:h-14"
              onChange={formik.handleChange}
              name="animal_registration_number"
            >
              <option value={""} className="text-black" disabled selected>
                Select Animal
              </option>
              {Animals?.map((d, i) => {
                return (
                  <option
                    key={i}
                    value={d.animal_registration_number}
                    className="text-black"
                  >
                    {d.animal_name} ({d.animal_breed_id.animal_breed_name})
                  </option>
                );
              })}
            </select>
            {formik.errors && (
              <small className="pl-2 text-red-500">
                {formik.errors.animal_registration_number}
              </small>
            )}
            <CountryDropDown
              value={formik.values.country}
              onChange={formik.handleChange}
              errorMessage={formik.touched.country ? formik.errors.country : ""}
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary mt-4 w-full"
              onClick={() => console.log("Viewing Certificate")}
            >
              {loading ? <span className="loader"></span> : "View Certificate"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ExportPedigree;
