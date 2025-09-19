import React, { useEffect, useState } from "react";
import Modal from "../../components/modal/Modal";
import { Formik } from "formik";
import { Table } from "../../components/Table/Table";
import { addFarmTypeSchema } from "../../schemas/Validator";
import { ToastContainer, toast } from "react-toastify";
import { toastConfig } from "../../constants/toast.constant";
import InputField from "../../components/input/InputField";
import { FaEdit } from "react-icons/fa";
import { useSubmitForm } from "../../hooks/useSubmitForm";

import { AiFillDelete } from "react-icons/ai";
const FarmTypes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [farmType, setFarmType] = useState([]);
  const [values, setValues] = useState({});
  const [action, setAction] = useState({
    edit: false,
    id: "",
  });

  const { loading, submit } = useSubmitForm();

  const columns = [
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => {
        return (
          <>
            <span className="flex cursor-pointer gap-3">
              <FaEdit
                onClick={() => {
                  setAction({
                    edit: true,
                    id: row?.original?.farm_id,
                  });
                  setValues(row?.original);
                  setIsOpen(true);
                }}
              />
              <AiFillDelete
                className="cursor-pointer text-red-500"
                onClick={() => deleteFarmType(row?.original?.farm_id)}
              />
            </span>
          </>
        );
      },
    },
    {
      Header: "Farm Name",
      accessor: "farm_name",
      Cell: ({ row }) => {
        return (
          <span>
            {row.original?.farm_name?.length ? row.original?.farm_name : "N.A."}
          </span>
        );
      },
    },
    {
      Header: "Farm ID",
      accessor: "farm_id",
    },
  ];

  async function getFarmTypes() {
    const res = await submit("GET", "master/getAllFarmTypes", {});
    if (res.status === 200) {
      setFarmType(res.data?.data);
    } else {
      toast.error(res.data?.message, toastConfig);
    }
  }

  const addFarmType = async (data) => {
    const res = await submit(
      "POST",
      "master/addFarmType",
      JSON.stringify({
        farm_name: data?.farm_name,
        farm_description: "",
      })
    );
    if (res?.data?.status === 200) {
      setIsOpen(false);
      toast.success(res?.data?.message, toastConfig);
      getFarmTypes();
    } else {
      toast.success(res.data?.message, toastConfig);
      setIsOpen(false);
    }
  };
  const editFarmType = async (data) => {
    const res = await submit("PUT", `master/updateFarmType/${action.id}`, {
      farm_name: data?.farm_name,
      farm_description: "",
    });
    if (res?.data?.status === 200) {
      setIsOpen(false);
      toast.success(res?.data?.message);
      getFarmTypes();
    } else {
      toast.success(res.data?.message);
      setIsOpen(false);
    }
  };

  const deleteFarmType = async (id) => {
    const response = await submit("DELETE", `master/farmtype/${id}`, {});
    if (response?.data?.status === 200 || response.status === 200) {
      toast.success(response?.data?.message);
      getFarmTypes();
    } else {
      toast.error(response?.data?.message);
    }
  };
  useEffect(() => {
    getFarmTypes();
  }, []);
  return (
    <React.Fragment>
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
      <div className="m-5">
        <div className="flex items-center justify-between pr-4 pt-5">
          <p className="text-2xl font-semibold">Farm List</p>
          <button
            className="rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-400"
            onClick={() => {
              setAction({
                edit: false,
                id: "",
              });
              setIsOpen((prev) => !prev);
            }}
          >
            Add Farm Type
          </button>
        </div>
        {!loading && farmType.length ? (
          <Table columns={columns} data={farmType} />
        ) : (
          <>
            {loading ? (
              <span className="loader"></span>
            ) : (
              <h1>No Farm Types Found</h1>
            )}
          </>
        )}
      </div>
      <Modal
        hasDefaultButtons={false}
        child={
          <React.Fragment>
            <Formik
              initialValues={
                action.edit
                  ? { farm_name: values?.farm_name }
                  : { farm_name: "" }
              }
              validationSchema={addFarmTypeSchema}
              onSubmit={(data) => {
                if (!action.edit) {
                  addFarmType(data);
                } else {
                  editFarmType(data);
                }
              }}
              component={({ values, handleSubmit, handleChange }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="flex w-full flex-col gap-3 ">
                      <InputField
                        className="rounded-md border border-b-gray-500 px-4 py-2 outline-none"
                        name={"farm_name"}
                        label={"Farm name"}
                        onChange={handleChange}
                        value={values.farm_name}
                        type={"text"}
                      />
                    </div>

                    <div className="flex justify-end p-5">
                      <button
                        type="submit"
                        disabled={loading}
                        className="rounded-md bg-blue-400 px-4 py-2 text-white hover:opacity-70"
                      >
                        {action.edit && !loading ? (
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
          </React.Fragment>
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        size={"max-w-xl"}
        heading={`${action.edit ? "Edit" : "add"} Farm Type`}
      />
    </React.Fragment>
  );
};

export default FarmTypes;
