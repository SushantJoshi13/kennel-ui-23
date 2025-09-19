import React, { useEffect, useState } from "react";
import { Table } from "../../components/Table/Table";
import { FaEdit } from "react-icons/fa";
import { Formik } from "formik";
import Modal from "../../components/modal/Modal";
import { baseUrl, getApi, postApi } from "../../service/axios.service";
import { ToastContainer, toast } from "react-toastify";
import InputField from "../../components/input/InputField";
import { addCostSchema } from "../../schemas/Validator";
import { toastConfig } from "../../constants/toast.constant";
import { AiFillDelete } from "react-icons/ai";
import { useSubmitForm } from "../../hooks/useSubmitForm";

const CostMaster = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [AllCosts, setAllCosts] = useState([]);
  const [values, setValues] = useState({});
  const [actions, setActions] = useState({
    edit: false,
    id: "",
  });
  const { loading, submit } = useSubmitForm();

  const columns = React.useMemo(
    () => [
      {
        Header: "Action",
        accessor: "actions",
        Cell: ({ row }) => {
          return (
            <>
              <span className="flex cursor-pointer gap-4">
                <FaEdit
                  onClick={() => {
                    setActions({
                      edit: true,
                      id: row?.original?.id,
                    });
                    setValues(row?.original);
                    setIsOpen(true);
                  }}
                />
                <AiFillDelete
                  className="cursor-pointer text-red-500"
                  onClick={() => deleteCost(row?.original?.id)}
                />
              </span>
            </>
          );
        },
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Tax",
        accessor: "tax",
      },
      {
        Header: "Delivery Fee",
        accessor: "delivery_fee",
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: ({ row }) => {
          return (
            <>
              <span>
                {row.original?.description?.length
                  ? row.original?.description
                  : "N.A."}
              </span>
            </>
          );
        },
      },
      {
        Header: "amount",
        accessor: "amount",
      },
    ],
    []
  );

  // Get All Costs
  const getAllCosts = async () => {
    const response = await submit("GET", "master/getAllCosts", {});
    if (response?.data?.status === 200) {
      setAllCosts(response?.data?.data);
    } else {
      toast.error(response?.data?.message, toastConfig);
    }
  };

  // Create Cost
  const handleAddCost = async (data) => {
    const res = await submit("POST", "master/addCosts", {
      name: data?.name,
      amount: data?.amount,
      tax: data?.tax,
      delivery_fee: data?.delivery_fee,
      description: data?.description,
    });
    if (res?.data?.status === 200) {
      setIsOpen(false);
      getAllCosts();
      toast.success(res.data?.message, toastConfig);
    } else {
      toast.success(res.data?.message, toastConfig);
      setIsOpen(false);
    }
  };

  // Update Single Cost
  const updateCost = async (data) => {
    const res = await submit("PUT", `master/updateCosts/${values.id}`, {
      name: data?.name,
      amount: data?.amount,
      tax: data?.tax,
      delivery_fee: data?.delivery_fee,
      description: data?.description,
    });
    if (res?.data?.status === 200) {
      setIsOpen(false);
      getAllCosts();
      toast.success(res.data?.message, toastConfig);
    } else {
      toast.success(res.data?.message, toastConfig);
      setIsOpen(false);
    }
  };

  // delete cost by ID
  const deleteCost = async (id) => {
    const response = await submit("DELETE", `master/cost/${id}`, {});
    if (response?.data?.status === 200 || response.status === 200) {
      toast.success(response?.data?.message);
      getAllCosts();
    } else {
      toast.error(response?.data?.message);
    }
  };

  useEffect(() => {
    getAllCosts();
  }, []);
  // console.log('values', values);
  return (
    <React.Fragment>
      <div className="m-5">
        <div className="flex items-center justify-between pr-4 pt-5">
          <p className="text-2xl font-semibold">Cost Master</p>
          <button
            className="rounded-lg bg-blue-600 p-3 text-white"
            onClick={() => {
              setActions({
                edit: false,
              });
              setIsOpen((prev) => !prev);
            }}
          >
            Add
          </button>
        </div>
        {AllCosts?.length && !loading ? (
          <Table columns={columns} data={AllCosts} />
        ) : (
          <h1>
            {loading ? <span className="loader"></span> : "No Cost Found"}
          </h1>
        )}
      </div>
      <Modal
        child={
          <>
            <Formik
              initialValues={
                actions.edit
                  ? {
                      name: values.name,
                      description: values.description,
                      amount: values.amount,
                      tax: values.tax,
                      delivery_fee: values.delivery_fee,
                    }
                  : {
                      name: "",
                      description: "",
                      amount: "",
                      tax: "",
                      delivey_fee: "",
                    }
              }
              validationSchema={addCostSchema}
              onSubmit={async (data) => {
                if (actions.edit) {
                  updateCost(data);
                } else {
                  handleAddCost(data);
                }
              }}
              component={({ values, handleSubmit, handleChange }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="flex w-full flex-col gap-3 ">
                      <InputField
                        className="rounded-md border border-b-gray-500 px-4 py-2 outline-none"
                        name={"name"}
                        label={"Name"}
                        onChange={handleChange}
                        value={values.name}
                        type={"text"}
                      />
                    </div>
                    <div className="flex w-full flex-col gap-3 ">
                      <InputField
                        className="rounded-md border border-b-gray-500 px-4 py-2 outline-none"
                        name={"description"}
                        label={"Description"}
                        onChange={handleChange}
                        value={values.description}
                        type={"text"}
                      />
                      <div className="flex w-full flex-col gap-3 ">
                        <InputField
                          className="rounded-md border border-b-gray-500 px-4 py-2 outline-none"
                          name={"tax"}
                          label={"Tax"}
                          onChange={handleChange}
                          value={values.tax}
                          type={"number"}
                        />
                      </div>
                      <div className="flex w-full flex-col gap-3 ">
                        <InputField
                          className="rounded-md border border-b-gray-500 px-4 py-2 outline-none"
                          name={"delivery_fee"}
                          label={"Delivery Fee"}
                          onChange={handleChange}
                          value={values.delivery_fee}
                          type={"number"}
                        />
                      </div>
                    </div>
                    <div className="flex w-full flex-col gap-3 ">
                      <InputField
                        className="rounded-md border border-b-gray-500 px-4 py-2 outline-none"
                        name={"amount"}
                        label={"Amount"}
                        onChange={handleChange}
                        value={values.amount}
                        type={"text"}
                      />
                    </div>

                    <div className="flex justify-end p-5">
                      <button
                        type="submit"
                        disabled={loading}
                        className="rounded-md bg-blue-400 px-4 py-2 text-white hover:opacity-70"
                      >
                        {actions.edit && !loading ? (
                          "Update"
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
        heading={`${actions.edit ? "Edit Cost" : "Add Cost"}`}
        hasDefaultButtons={false}
      />
    </React.Fragment>
  );
};

export default CostMaster;
