import { useFormik } from "formik";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import ImageUploader from "../components/ImageUploader";
import InputComponent from "../components/InputComponent";
import { Table } from "../components/Table/Table";
import { toastConfig } from "../constants/toast.constant";
import useAuth from "../context/userContext";
import { useFetchUser } from "../hooks/useFetchUser";
import { useSubmitForm } from "../hooks/useSubmitForm";
import UploadImageIcon from "../icons/illustrations/UploadImageIcon";
import { ProfileValidationSchema } from "../schemas/Validator";
import { BiMedal } from "react-icons/bi";
import FarmTypes from "./admin/farmTypes";
import { useRecoilState, useRecoilValue } from "recoil";
import { userCoursesAtom } from "../recoil/atom/userCourseAtom";
import { UserFarms } from "../components/user-profile/UserFarms";
import { UserCourses } from "../components/user-profile/UserCourses";
const UserDetails = () => {
  const nav = useNavigate();
  const { user, breeder } = useAuth();
  const userCourses = useRecoilValue(userCoursesAtom);
  const [profileImage, setProfileImage] = useState();
  const fetchUser = useFetchUser();
  const [isOpen, setIsOpen] = useState(false);
  const { loading, submit } = useSubmitForm();
  const [editMode, setEditMode] = useState(false);

  // set initial values to formik if error
  const initialValues = {
    name: user?.user_name ?? "",
    email: user?.email ?? "",
    phone: user?.contact_no ?? "",
    address: user?.user_address ?? "",
    license_number: user?.identification_id_no ?? "",
    licensed_document: user?.identity_doc_name ?? "",
  };

  const handleProfileUpdate = async (data, action) => {
    const formData = new FormData();
    formData.append("user_name", data.name);
    formData.append("user_id", user.id);
    formData.append("contact_no", data.phone);
    formData.append("identification_id_no", data.license_number);
    formData.append("identification_doc_name", data.licensed_document);
    formData.append("user_address", data.address);
    const response = await submit("PUT", "auth/update-user", formData, {
      "Content-Type": "multipart/formdata",
    });
    console.log("response", response);
    if (response?.data?.statusCode === 200 || response?.status === 200) {
      toast.success(response?.data?.message, toastConfig);
      setEditMode(false);
      fetchUser(user.id);
    } else {
      setEditMode(false);
      formik.setValues(initialValues);
      toast.error(response?.data?.message, toastConfig);
    }
  };

  const handleProfileUpload = async () => {
    const formData = new FormData();
    formData.append("profile_pic", profileImage);
    formData.append("user_id", user.id);
    const response = await submit(
      "POST",
      "auth/upload-profile-image",
      formData,
      { "Content-Type": "multipart/formdata" }
    );

    if (response?.data?.statusCode === 200 || response?.status === 200) {
      toast.success(response?.data?.message, toastConfig);
      setIsOpen(false);
      fetchUser(user.id);
    } else {
      toast.error(response?.data?.message, toastConfig);
    }
  };

  const cancelEdit = () => {
    setEditMode((curr) => !curr);
    formik.setValues(initialValues);
  };

  const formik = useFormik({
    initialValues: {
      name: user?.user_name ?? "",
      email: user?.email ?? "",
      phone: user?.contact_no ?? "",
      address: user?.user_address ?? "",
      license_number: user?.identification_id_no ?? "",
      licensed_document: user?.identity_doc_name ?? "",
    },
    validationSchema: ProfileValidationSchema,
    onSubmit: (data) => handleProfileUpdate(data),
    enableReinitialize: true,
  });

  return (
    <>
      <section className="flex items-center justify-center bg-gray py-10 pt-20">
        <div className="container mx-2 sm:mx-auto">
          <div className={`grid grid-cols-1 gap-5`}>
            <div className="rounded-lg bg-white p-5 ">
              <div className="flex flex-col items-center gap-10 md:flex-row">
                <div className="flex flex-col items-center md:w-1/3">
                  {user.subscription.length > 0 ? (
                    <div className="mb-5 flex items-center">
                      <BiMedal size={30} className="text-yellow" />
                      <p className="font-poppins font-semibold">
                        Premium Member
                      </p>
                    </div>
                  ) : null}

                  <div className="relative">
                    <div className="group relative rounded-full">
                      {user?.profile_pic && user?.profile_pic.length > 0 ? (
                        <img
                          src={user?.profile_pic}
                          alt={user?.user_name}
                          className="h-32 w-32 max-w-fit rounded-full"
                        />
                      ) : (
                        <img
                          className="mb-5 h-32 w-32 rounded-full hover:cursor-pointer hover:bg-black"
                          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                          alt="Profile "
                        />
                      )}

                      <label htmlFor="profile_image" className="cursor-pointer">
                        <div className="absolute right-0 top-0 hidden h-full w-full cursor-pointer rounded-full  bg-opacity-30 transition-all duration-300 group-hover:block group-hover:bg-black group-hover:bg-opacity-30 ">
                          <div className="flex h-full items-center justify-center">
                            <UploadImageIcon />
                          </div>
                          <InputComponent
                            name={"profile_image"}
                            id={"profile_image"}
                            onChange={(e) => setProfileImage(e.target.files[0])}
                            type={"file"}
                            className={"hidden"}
                            accept="image/*"
                          />
                          <ImageUploader
                            isLoading={loading}
                            image={profileImage}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            handleProfileUpload={handleProfileUpload}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-tertiary">
                    {editMode ? (
                      <div className="flex gap-3">
                        <button
                          className="rounded-lg bg-main-yellow px-4 py-2 text-white "
                          onClick={formik.handleSubmit}
                          type="submit"
                        >
                          Update
                        </button>
                        <button
                          className="rounded-lg border border-yellow-500 bg-white px-4 py-2 text-main-yellow "
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="flex gap-2"
                        onClick={() => setEditMode((curr) => !curr)}
                      >
                        <AiOutlineEdit className="mx-0 my-auto" />
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>
                <div className="w-full flex-1 md:max-w-[70%]">
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <div className="text-lg">
                      <p className="font-medium text-primary">Name: </p>
                      <InputComponent
                        name={"name"}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        className={"text-black"}
                        style={{
                          color: "black",
                        }}
                        disabled={!editMode}
                        errorMessage={
                          formik.errors.name && formik.touched.name
                            ? formik.errors.name
                            : null
                        }
                      />
                    </div>
                    <div className="text-lg">
                      <p className="font-medium text-primary">Email: </p>
                      <InputComponent
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        className={"text-black"}
                        style={{
                          color: "black",
                        }}
                        disabled={true}
                        errorMessage={
                          formik.errors.email && formik.touched.email
                            ? formik.errors.email
                            : null
                        }
                      />
                    </div>
                    <div className="text-lg">
                      <p className="font-medium text-primary">Phone: </p>
                      <InputComponent
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        className={"text-black"}
                        style={{
                          color: "black",
                        }}
                        disabled={!editMode}
                        errorMessage={
                          formik.errors.phone && formik.touched.phone
                            ? formik.errors.phone
                            : null
                        }
                      />
                    </div>
                    <div className="text-lg">
                      <p className="font-medium text-primary">Address: </p>
                      <InputComponent
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        className={"text-black"}
                        style={{
                          color: "black",
                        }}
                        disabled={!editMode}
                        errorMessage={
                          formik.errors.address && formik.touched.address
                            ? formik.errors.address
                            : null
                        }
                      />
                    </div>
                    <div className="text-lg">
                      <p className="font-medium text-primary">
                        Identification Id Number:{" "}
                      </p>
                      <InputComponent
                        name="license_number"
                        value={formik.values.license_number}
                        onChange={formik.handleChange}
                        className={"text-black"}
                        style={{
                          color: "black",
                        }}
                        disabled={!editMode}
                        errorMessage={
                          formik.errors.license_number &&
                          formik.touched.license_number
                            ? formik.errors.license_number
                            : null
                        }
                      />
                    </div>
                    <div className="text-lg">
                      <p className="font-medium text-primary">
                        Identification Document:{" "}
                      </p>
                      {editMode ? (
                        <InputComponent
                          accept="image/png, image/jpeg, application/pdf"
                          name="licensed_document"
                          type={"file"}
                          onChange={(e) =>
                            formik.setFieldValue(
                              "licensed_document",
                              e.target.files[0]
                            )
                          }
                          className={"text-black"}
                          style={{
                            color: "black",
                          }}
                          disabled={!editMode}
                          errorMessage={
                            formik.errors.licensed_document &&
                            formik.touched.licensed_document
                              ? formik.errors.licensed_document
                              : null
                          }
                        />
                      ) : (
                        <>
                          <InputComponent
                            accept="image/png, image/jpeg"
                            name={"licensed_document"}
                            value={user?.identity_doc_name}
                            style={{
                              color: "black",
                            }}
                            disabled={!editMode}
                            errorMessage={
                              formik.errors.licensed_document &&
                              formik.touched.licensed_document
                                ? formik.errors.licensed_document
                                : null
                            }
                          />
                          <a
                            href={user?.identification_doc}
                            target="_blank"
                            rel="noreferrer"
                            className="cursor-pointer text-blue-500"
                          >
                            View Document
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <UserCourses courses={userCourses} />
            {user?.user_role_id?.role_id === 1 && (
              <UserFarms farms={breeder?.farms} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default UserDetails;
