import React, { useEffect, useState } from "react";

import { Formik } from "formik";
import { matchSorter } from "match-sorter";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { Table } from "../../components/Table/Table";
import InputField from "../../components/input/InputField";
import Modal from "../../components/modal/Modal";
import { toastConfig } from "../../constants/toast.constant";
import { useSubmitForm } from "../../hooks/useSubmitForm";
import { animalValidationSchema } from "../../schemas/Validator";

const AnimalList = () => {
  const fuzzyTextFilterFn = (rows, id, filterValue) => {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
  };

  fuzzyTextFilterFn.autoRemove = (val) => !val;

  const filterGreaterThan = (rows, id, filterValue) => {
    return rows.filter((row) => {
      const rowValue = row.values[id];
      return rowValue >= filterValue;
    });
  };

  filterGreaterThan.autoRemove = (val) => typeof val !== "number";

  const [animals, setAnimals] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({});
  const { loading, submit } = useSubmitForm();
  const [editMode, setEdit] = useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: "Action",
        canFilter: false,
        accessor: "actions",
        Cell: ({ row }) => {
          return (
            <>
              <span className="flex cursor-pointer gap-3">
                <FaEdit
                  onClick={() => {
                    setValues(row?.original);
                    setEdit(true);
                    setIsOpen(true);
                  }}
                />
                <AiFillDelete
                  className="cursor-pointer text-red-500"
                  onClick={() =>
                    deleteAnimalType(row?.original?.animal_type_id)
                  }
                />
              </span>
            </>
          );
        },
      },
      {
        Header: "Animal Name",
        accessor: "animal_type_name",
      },
      {
        Header: "Description",
        accessor: "animal_type_description",
        Cell: ({ row }) => {
          return (
            <>
              <span>
                {row.original?.animal_type_description?.length
                  ? row.original?.animal_type_description
                  : "N.A."}
              </span>
            </>
          );
        },
      },
    ],
    []
  );

  const addAnimalType = async (data) => {
    const response = await submit(
      "POST",
      "animalMaster",
      { animal_type_name: data.animal_type, animal_type_description: "" },
      {}
    );
    if (response?.data?.status === 200) {
      setIsOpen(false);
      toast.success(response?.data?.message ?? "Animal Added Successfully!");
      getAllAnimals();
    } else {
      toast.success(response.data?.message ?? "Something went wrong!");
      setIsOpen(false);
    }
  };
  const editAnimalType = async (data) => {
    const res = await submit("PUT", "animalMaster", {
      animal_type_id: values?.animal_type_id,
      animal_type_name: data?.animal_type,
      animal_type_description: data.animal_type_description,
    });

    if (res?.data?.statusCode === 200 || res.status === 200) {
      setIsOpen(false);
      toast.success(
        res?.data?.message ?? "Animal Added Successfully!",
        toastConfig
      );
      getAllAnimals();
    } else {
      toast.success(res.data?.message ?? "Something went wrong!", toastConfig);
      setIsOpen(false);
    }
  };

  const deleteAnimalType = async (id) => {
    const response = await submit("DELETE", `animalMaster/${id}`, {});

    if (response?.data?.status === 200 || response.status === 200) {
      toast.success(response?.data?.message);
      getAllAnimals();
    } else {
      toast.error(response?.data?.message);
    }
  };
  const getAllAnimals = async () => {
    const res = await submit("GET", "animalMaster", {});
    setAnimals(res.data.data);
  };
  useEffect(() => {
    getAllAnimals();
  }, []);
  return (
    <React.Fragment>
      <div className="m-5">
        <div className="flex items-center justify-between pr-4 pt-5">
          <p className="text-2xl font-semibold">Animal List</p>
          <button
            className="rounded-lg bg-blue-600 p-3 text-white"
            onClick={() => {
              setEdit(false);
              setIsOpen((prev) => !prev);
            }}
          >
            Add Animal Type
          </button>
        </div>
        {animals?.length && !loading ? (
          <Table columns={columns} data={animals} />
        ) : (
          <h1>
            {loading ? <span className="loader"></span> : "No Animal Added"}
          </h1>
        )}
      </div>
      <Modal
        child={
          <>
            <Formik
              initialValues={
                !editMode
                  ? { animal_type: "" }
                  : {
                      animal_type: values?.animal_type_name,
                      animal_type_description: values.animal_type_description
                    }
              }
              validationSchema={animalValidationSchema}
              onSubmit={async (data) => {
                if (!editMode) addAnimalType(data);
                else {
                  editAnimalType(data);
                }
              }}
              component={({ values, handleSubmit, handleChange }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="flex w-full flex-col gap-3 ">
                      <InputField
                        className="rounded-md border border-b-gray-500 px-4 py-2 outline-none"
                        name={"animal_type"}
                        label={`${editMode ? "Edit" : "Add"} Animal Type`}
                        onChange={handleChange}
                        value={values.animal_type}
                        type={"text"}
                      />
                       <InputField
                        className="rounded-md border border-b-gray-500 px-4 py-2 outline-none"
                        name={"animal_type_description"}
                        label={`${editMode ? "Edit" : "Add"} Animal Description`}
                        onChange={handleChange}
                        value={values.animal_type_description}
                        type={"text"}
                      />
                    </div>

                    <div className="flex justify-end p-5">
                      <button
                        type="submit"
                        disabled={loading}
                        className="rounded-md bg-blue-400 px-4 py-2 text-white hover:opacity-70"
                      >
                        {editMode && !loading ? (
                          "Edit"
                        ) : loading ? (
                          <span className="loader"></span>
                        ) : (
                          "Add"
                        )}
                      </button>
                    </div>
                  </form>
                );
              }}
            />
          </>
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        size={"max-w-xl"}
        heading={`${editMode ? "Edit" : "Add"} Animal Type`}
        hasDefaultButtons={false}
      />
    </React.Fragment>
  );
};
export default AnimalList;
