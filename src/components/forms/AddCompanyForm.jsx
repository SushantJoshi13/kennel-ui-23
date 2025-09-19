import { Formik } from "formik";
import InputField from "../input/InputField";
import { DropDownField } from "../dropdown/DropDownField";
import CountryIds from "../../assets/JSON/CountryIds.json";
import { useMemo } from "react";
import { postApi } from "../../service/axios.service";

export const AddCompanyForm = ({ onAddCompany }) => {
  const countries = useMemo(() => {
    return CountryIds.map((c) => ({ label: c.Country, value: c.Country }));
  }, []);

  const addCompany = async (data) => {
    const response = await postApi("company", {
      ...data,
      country: data.country.value,
    });
    return onAddCompany(response.data.data.id);
  };
  return (
    <Formik
      initialValues={{
        companyName: "",
        email: "",
        contact: "",
        address: "",
        country: "",
      }}
      onSubmit={(data) => addCompany(data)}
      component={({ handleChange, setFieldValue, handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <DropDownField
              data={countries}
              label={"Country"}
              onSelect={(data) => setFieldValue("country", data)}
            />
            <InputField
              className={"border"}
              label={"Company Name"}
              name={"companyName"}
              onChange={handleChange}
            />
            <InputField
              className={"border"}
              label={"Company Email"}
              name={"email"}
              onChange={handleChange}
            />
            <InputField
              className={"border"}
              label={"Company Contact"}
              name={"contact"}
              onChange={handleChange}
            />
            <InputField
              className={"border"}
              label={"Company Address"}
              name={"address"}
              onChange={handleChange}
            />
            <button
              onClick={handleSubmit}
              type="submit"
              className="rounded-md bg-green-400 px-4 py-2 text-white self-end"
            >
              Add Company
            </button>
          </form>
        );
      }}
    />
  );
};
