import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { Table } from "../../components/Table/Table";
import { DropDownField } from "../../components/dropdown/DropDownField";
import InputField from "../../components/input/InputField";
import Modal from "../../components/modal/Modal";
import { toastConfig } from "../../constants/toast.constant";
import { addBreedSchema } from "../../schemas/Validator";
import { getApi } from "../../service/axios.service";
import { useSubmitForm } from "../../hooks/useSubmitForm";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlinePets } from "react-icons/md";

const BreedsList = () => {
  const [animalList, setAnimalList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState({});
  const [animalBreeds, setAnimalBreeds] = useState([]);
  const { loading, submit } = useSubmitForm();

  const [action, setAction] = useState({
    edit: false,
    id: "",
    value: {},
  });

  const Columns = [
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => {
        return (
          <React.Fragment>
            <div className="flex justify-start">
              <span className="flex gap-2">
                <BiEdit
                  className="cursor-pointer"
                  onClick={() => {
                    setAction({
                      edit: true,
                      id: row?.original?.id,
                      value: row?.original,
                    });
                    setIsOpen(true);
                  }}
                />
                <AiFillDelete
                  className="cursor-pointer text-red-500"
                  onClick={() => deleteBreed(row?.original?.animal_breed_id)}
                />
              </span>
            </div>
          </React.Fragment>
        );
      },
    },
    {
      Header: "Breeds Id",
      accessor: "animal_breed_id",
    },
    {
      Header: "Breed Image",
      Cell: ({ row }) => {
        return (
          <>
            {row?.original?.image_link ? (
              <img
                src={row?.original?.image_link}
                className="h-5 w-5 rounded-full md:h-10 md:w-10"
                alt={row?.original?.animal_breed_name}
              />
            ) : (
              <MdOutlinePets />
            )}
          </>
        );
      },
    },
    {
      Header: "Breeds Name",
      accessor: "animal_breed_name",
    },
    {
      Header: "Animal Type",
      accessor: "animal_type",
      Cell: ({ row }) => {
        return (
          <>
            <span className="text-left">
              {row.original.animal_type.animal_type_name}
            </span>
          </>
        );
      },
      Filter: () => (
        <DropDownField
          data={animalList}
          label={""}
          selected={selectedAnimal}
          onSelect={(data) => {
            setSelectedAnimal(data);
          }}
        />
      ),
    },
  ];
  const getAnimalTypes = async () => {
    const response = await getApi("animalMaster");
    const List = response.data?.data?.map((item) => {
      if (!item.animal_type_name.length || item.animal_type_id.length <= 0)
        item.animal_type_name = "N.A.";

      return {
        label: item.animal_type_name,
        value: item.animal_type_id,
      };
    });

    setAnimalList(List ?? []);
  };

  const getBreeds = async () => {
    let url = selectedAnimal.value
      ? `breedMaster?animal_type_id=${selectedAnimal.value}`
      : "breedMaster";

    const response = await submit("GET", url);

    if (response.status === 200) {
      setAnimalBreeds(response.data?.data ?? []);
    } else {
      toast.error(response.data?.message, toastConfig);
    }
  };

  const addBreeds = async (data) => {
    const payload = new FormData();
    payload.append("animal_type_id", data.animal_type_id.value);
    payload.append("animal_breed_name", data.animal_breed_name);
    payload.append("animal_breed_description", data.animal_breed_description);
    payload.append("animal_breed_image", data.breed_image);
    const response = await submit("POST", "breedMaster", payload, {
      "Content-Type": "multipart/form-data",
    });
    if (response.data?.statusCode === 200 || response?.status === 201) {
      setIsOpen(false);
      getBreeds();
      toast.success(
        response.data?.message ?? "Breed Added successfully",
        toastConfig
      );
      getAnimalTypes();
    } else {
      toast.error(
        response.data?.message ?? "Something Went wrong",
        toastConfig
      );
    }
  };
  const editBreed = async (data) => {
    const formData = new FormData();
    formData.append("animal_breed_image", data.breed_image);
    formData.append("animal_breed_name", data.animal_breed_name);
    formData.append("animal_breed_description", data.animal_breed_description);
    formData.append("breed_id", action.value.animal_breed_id);
    const response = await submit("PUT", "breedMaster", formData, {
      "Content-Type": "multipart/form-data",
    });
    if (response.data?.statusCode === 200) {
      getBreeds();
      setIsOpen(false);
      toast.success("Animal breed updated successfully!", toastConfig);
    } else {
      setIsOpen(false);
      getBreeds();
      toast.error(response.data?.message, toastConfig);
    }
  };
  const deleteBreed = async (id) => {
    const response = await submit("DELETE", `breedMaster/${id}`, {});
    if (response?.data?.status === 200 || response.status === 200) {
      toast.success(response?.data?.message);
      getBreeds();
    } else {
      toast.error(response?.data?.message);
    }
  };
  useEffect(() => {
    getBreeds();
  }, [selectedAnimal]);
  useEffect(() => {
    getAnimalTypes();
  }, []);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="m-5 ">
        <div className="flex items-center justify-between">
          <div className="flex w-1/3 flex-col"></div>
          <div>
            <button
              className="disabled:bg-gray-400 rounded-lg bg-blue-500 px-4 py-2 text-white hover:opacity-75 disabled:cursor-not-allowed"
              onClick={() => {
                setAction({
                  edit: false,
                  id: "",
                });
                setIsOpen((prev) => !prev);
              }}
              disabled={!selectedAnimal}
            >
              Add Breed
            </button>
          </div>
        </div>
        <div className="mt-10 flex ">
          <p className="text-2xl font-semibold ">Breeds List</p>
        </div>
        {animalBreeds?.length && !loading ? (
          <Table
            columns={Columns}
            data={animalBreeds}
            select={selectedAnimal}
          />
        ) : loading ? (
          <span className="loader"></span>
        ) : (
          <span className="text-lg font-normal ">No Breeds Added</span>
        )}
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          heading={`${action.edit ? "Edit" : "Add"} Breed`}
          size={"max-w-xl"}
          hasDefaultButtons={false}
          child={
            <>
              <Formik
                initialValues={
                  action?.edit
                    ? {
                        animal_breed_name: action?.value?.animal_breed_name,
                        breed_image: null,
                        animal_breed_description:
                          action?.value?.animal_breed_description,
                      }
                    : {
                        animal_breed_name: "",
                        animal_breed_description: "",
                        animal_type_id: "",
                        breed_image: null,
                      }
                }
                validationSchema={addBreedSchema}
                onSubmit={async (data) => {
                  if (!action.edit) {
                    addBreeds(data);
                  } else {
                    editBreed(data);
                  }
                }}
                component={({
                  errors,
                  touched,
                  handleSubmit,
                  handleChange,
                  setFieldValue,
                  values,
                }) => {
                  return (
                    <>
                      <form onSubmit={handleSubmit}>
                        {!action.edit && (
                          <div>
                            <DropDownField
                              data={animalList}
                              label={"Animal Type"}
                              onSelect={(data) =>
                                setFieldValue("animal_type_id", data)
                              }
                            />
                          </div>
                        )}
                        <div>
                          <InputField
                            className={"border"}
                            label={"Breed Name"}
                            name={"animal_breed_name"}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="block px-2 pb-1 text-sm font-bold text-gray-700">
                            Breed Description
                          </label>
                          <textarea
                            name="animal_breed_description"
                            id="animal_breed_description"
                            value={values.animal_breed_description}
                            className="focus:shadow-outline bg-primary-bgPrimary w-full rounded border px-3 py-3 leading-tight text-gray-700 focus:outline-none"
                            placeholder="Breed Description"
                            onChange={handleChange}
                          ></textarea>
                          <small className="pl-2 text-xs text-red-500">
                            {touched.animal_breed_description
                              ? errors.animal_breed_description
                              : ""}
                          </small>
                        </div>
                        <div>
                          <label className="mt-2 block px-2 pb-1 text-sm font-bold text-gray-700">
                            Breed Image
                          </label>
                          <input
                            type="file"
                            name="breed_image"
                            id="breed_image"
                            className="my-2 h-12 w-full rounded-lg border bg-transparent px-3 py-3 text-black shadow-md outline-gray-700 hover:shadow-xl hover:outline-none md:h-14"
                            onChange={(e) => {
                              setFieldValue("breed_image", e.target.files[0]);
                            }}
                            accept="image/*"
                          />
                          <small className="pl-2 text-xs text-red-500">
                            {touched.breed_image ? errors.breed_image : ""}
                          </small>
                        </div>

                        <div className="flex justify-end">
                          <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:opacity-75">
                            {loading ? (
                              <span className="loader"></span>
                            ) : action.edit ? (
                              "Edit"
                            ) : (
                              "Add"
                            )}
                          </button>
                        </div>
                      </form>
                    </>
                  );
                }}
              />
            </>
          }
        />
      </div>
    </>
  );
};

export default BreedsList;
