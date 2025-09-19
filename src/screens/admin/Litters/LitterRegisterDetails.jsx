import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";
import { Table } from "../../../components/Table/Table";

import { toast } from "react-toastify";
import { toastConfig } from "../../../constants/toast.constant";
import { useSubmitForm } from "../../../hooks/useSubmitForm";
import { AiFillDelete } from "react-icons/ai";

const LitterRegisterDetails = () => {
  const nav = useNavigate();
  const [litters, setLitters] = useState([]);
  const { loading, submit } = useSubmitForm();

  const getLitters = async () => {
    const response = await submit("GET", "litter", {});

    if (response?.data?.statusCode === 200) {
      setLitters(response?.data?.data);
    } else {
      toast.error(response?.data?.message, toastConfig);
    }
  };

  const columns = [
    {
      Header: "Action",
      accessor: "actions",
      Cell: ({ row }) => {
        return (
          <>
            <span
              onClick={() =>
                nav(`/admin-layout/litters-details/${row?.original?.id}`)
              }
              className="cursor-pointer"
            >
              <FaEye />
            </span>
          </>
        );
      },
    },
    {
      Header: "Dam Owner",
      accessor: "dam_owner",
      Cell: ({ row }) => {
        return (
          <>
            <span>{row?.original?.owner?.user_name}</span>
          </>
        );
      },
    },
    {
      Header: "Num of Litters",
      accessor: "number_of_litters",
      filter: "fuzzyText",
      Cell: ({ row }) => {
        return <span>{row?.original?.litters?.length}</span>;
      },
    },
    {
      Header: "Meeting Date",
      accessor: "meeting_date_and_time",
      filter: "fuzzyText",
      Cell: ({ row }) => {
        return (
          <span>
            {new Date(row?.original?.meeting_date).toLocaleDateString() ??
              "N.A."}
          </span>
        );
      },
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => {
        return (
          <span
            className={`${
              row?.original?.completed
                ? "bg-blue-500 text-white"
                : "bg-red-500 text-white"
            } rounded-md px-3 py-2 font-semibold `}
          >
            {row?.original?.completed ? "Completed" : "Pending"}
          </span>
        );
      },
    },
  ];

  useEffect(() => {
    getLitters();
  }, []);
  return (
    <>
      <div className="m-5 ">
        <div className="mt-10 flex ">
          <p className="text-2xl font-semibold ">Litters registered details</p>
        </div>
        {litters?.length && !loading ? (
          <Table columns={columns} data={litters} />
        ) : (
          <>
            {loading ? (
              <span className="loader"></span>
            ) : (
              <h1 className="pt-10 text-center">No Litters Found</h1>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default LitterRegisterDetails;
