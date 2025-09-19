import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import InputComponent from "../../components/InputComponent";

import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { TextEditor } from "../../components/input/WysiwgEditor";
import { toastConfig } from "../../constants/toast.constant";
import { useSubmitForm } from "../../hooks/useSubmitForm";
import { getApi } from "../../service/axios.service";
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  syllabus: Yup.string().required("Syllabus is required"),
  fees: Yup.number()
    .required("Fees are required")
    .positive("Fees must be positive"),
  image: Yup.mixed().required("Cover Image is required"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date().required("End Date is required"),
});

export const AddCourses = ({ edit }) => {
  const { id } = useParams();
  const [courseValues, setValues] = useState({
    name: "",
    syllabus: "",
    fees: "",
    image: null,
    startDate: "",
    endDate: "",
  });
  useEffect(() => {
    if (edit) {
      getDetails();
    }
  }, [edit, id]);
  const getDetails = async () => {
    const response = await getApi(`courses/${id}`);
    setValues({
      ...response.data.data,
      startDate: response.data.data.start_date,
      endDate: response.data.data.end_date,
    });
  };
  console.log("courseValues", courseValues);
  const { loading, submit } = useSubmitForm();
  const nav = useNavigate();
  const formik = useFormik({
    initialValues: courseValues,
    enableReinitialize: true,
    validationSchema,
    validateOnBlur: false,
    onSubmit: async (values) => {
      // Handle form submission here

      if (edit) {
        editCourse(values);
        return;
      }
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("fees", Number(values.fees));
      formData.append("start_date", values.startDate);
      formData.append("syllabus", values.syllabus);
      formData.append("end_date", values.endDate);
      formData.append("image", values.image);
      const response = await submit("POST", "courses", formData, {
        "Content-Type": "multipart/form-data",
      });
      if (response.data?.statusCode === 201 || response.status === 200) {
        toast.success(response.data?.message, toastConfig);
        setTimeout(() => {}, 2000);
        nav("/admin-layout/courses");
      } else {
        toast.error(
          response.data?.message ??
            "Something went wrong please try again later",
          toastConfig
        );
      }
    },
  });
  const editCourse = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("fees", Number(values.fees));
    formData.append("start_date", values.startDate);
    formData.append("syllabus", values.syllabus);
    formData.append("end_date", values.endDate);
    if (typeof formData.image !== "string")
      formData.append("image", values.image);
    const response = await submit("PUT", `courses/${id}`, formData, {
      "Content-Type": "multipart/form-data",
    });
    if (response.data?.statusCode === 200 || response.status === 200) {
      toast.success(response.data?.message, toastConfig);
      setTimeout(() => {}, 2000);
      nav("/admin-layout/courses");
    } else {
      toast.error(
        response.data?.message ?? "Something went wrong please try again later",
        toastConfig
      );
    }
  };
  return (
    <section className="h-full p-7 font-poppins">
      <div className="flex flex-col justify-center gap-4">
        <h1 className="text-xl font-bold">Add Course</h1>

        <div>
          {/* Form */}
          <form id="add-course" onSubmit={formik.handleSubmit}>
            {/* Name Field */}
            <div className="mb-3">
              <InputComponent
                style={{ color: "black" }}
                name={"name"}
                placeholder={"Name"}
                onChange={formik.handleChange}
                value={formik.values.name}
                errorMessage={formik.touched.name ? formik.errors.name : ""}
              />
            </div>

            {/* Syllabus Field */}
            <div className="mb-3">
              <label htmlFor="syllabus">Syllabus:</label>
              <TextEditor
                setFieldValue={(val) => formik.setFieldValue("syllabus", val)}
                value={formik.values.syllabus}
              />
            </div>

            {/* Fees Field */}
            <div className="mb-3">
              <InputComponent
                style={{ color: "black" }}
                name={"fees"}
                placeholder={"Fees"}
                onChange={formik.handleChange}
                value={formik.values.fees}
                errorMessage={formik.touched.fees ? formik.errors.fees : ""}
              />
            </div>

            {/* Cover Image Field */}
            <div className="mb-3 flex flex-col">
              <label htmlFor="image">Upload Cover Image:</label>
              <input
                type="file"
                accept="image/*"
                className="mt-2"
                id="image"
                name="image"
                onChange={(event) => {
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                }}
              />
              {formik.touched.image && formik.errors.image ? (
                <div>{formik.errors.image}</div>
              ) : null}
              {formik.values.image ? (
                typeof formik.values.image === "string" ? (
                  <img
                    src={formik.values.image}
                    className="h-52 w-1/2 object-fill"
                    alt="Thumb"
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(formik.values.image)}
                    className="h-52 w-1/2 object-fill"
                    alt="Thumb"
                  />
                )
              ) : null}
            </div>

            {/* Start Date Field */}
            <div className="mb-3">
              <InputComponent
                style={{ color: "black" }}
                placeholder={"Start Date"}
                type="date"
                id="startDate"
                name="startDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.startDate}
                errorMessage={
                  formik.touched.startDate ? formik.errors.startDate : ""
                }
                min={new Date().toISOString().split("T")[0]}
                max={
                  new Date(new Date().setFullYear(new Date().getFullYear() + 2))
                    .toISOString()
                    .split("T")[0]
                }
              />
            </div>

            {/* End Date Field */}
            <div className="mb-3">
              <InputComponent
                style={{ color: "black" }}
                placeholder={"End Date"}
                type="date"
                id="endDate"
                name="endDate"
                onChange={formik.handleChange}
                value={formik.values.endDate}
                errorMessage={
                  formik.touched.endDate ? formik.errors.endDate : ""
                }
                min={new Date().toISOString().split("T")[0]}
                max={
                  new Date(new Date().setFullYear(new Date().getFullYear() + 2))
                    .toISOString()
                    .split("T")[0]
                }
              />
            </div>

            {/* Submit Button */}
            <button disabled={loading} className="btn-primary" type="submit">
              {loading ? <span className="loader"></span> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
