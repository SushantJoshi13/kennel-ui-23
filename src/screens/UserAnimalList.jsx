import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { toastConfig } from "../constants/toast.constant";
import { Table, statusBooleanFilter } from "../components/Table/Table";
import Badge from "../components/Badge";
import { useSubmitForm } from "../hooks/useSubmitForm";
import useAuth from "../context/userContext";
import { getApi } from "../service/axios.service";

const UserAnimalList = () => {
  const nav = useNavigate();
  const { loading, submit } = useSubmitForm();
  const [animals, setAnimals] = useState([]);
  const { user } = useAuth();

  const getUserAnimalList = async () => {
    const res = await getApi(`animal/getAnimals?user_id=${user?.id}`);
    if (res.data?.statusCode === 200 || res.status === 200) {
      setAnimals(res.data.data);
    } else {
      toast.error(res.data?.message, toastConfig);
    }
  };

  useEffect(() => {
    getUserAnimalList();
  }, []);

  const columns = [
    {
      Header: "Action",
      accessor: "actions",
      Cell: ({ row }) => {
        return (
          <>
            <div className="flex gap-4 ">
              <span
                onClick={() =>
                  nav(`/userAnimalDetails/${row?.original?.animal_id}`)
                }
                className="cursor-pointer"
              >
                <FaEye />
              </span>
            </div>
          </>
        );
      },
    },
    {
      Header: "Animal Name",
      accessor: "animal_name",
    },
    {
      Header: "Owner Name",
      accessor: "number_of_litters",
      filter: "fuzzyText",
      Cell: ({ row }) => {
        return (
          <span>{row?.original?.animal_owner_id?.user_name ?? "N.A."}</span>
        );
      },
    },
    {
      Header: "Animal Type",
      accessor: "meeting_date_and_time",
      filter: "fuzzyText",
      Cell: ({ row }) => {
        return (
          <span>
            {row?.original?.animal_type_id?.animal_type_name ?? "N.A."}
          </span>
        );
      },
    },
    {
      Header: "Animal Registration Source",
      accessor: "animal_registration_source",
      filter: "fuzzyText",
      Cell: ({ row }) => {
        return <span>{row?.original?.registration_source ?? "N.A."}</span>;
      },
    },
    {
      Header: "Is Verified",
      accessor: "status",
      Cell: ({ row }) => {
        return (
          <Badge
            isVerified={row?.original?.is_active}
            text={row?.original?.is_active ? "Active" : "Pending Verification"}
          />
        );
      },
      Filter: statusBooleanFilter,
    },
  ];

  return (
    <div className="m-5 h-full min-h-[70vh] p-4">
      <div className="mt-10 flex ">
        <p className="text-2xl font-semibold ">User Animals</p>
      </div>
      {animals?.length && !loading ? (
        <Table columns={columns} data={animals ?? []} />
      ) : (
        <>
          {loading ? (
            <span className="loader"></span>
          ) : (
            <h1 className="mb-[5.3rem]">No Animals Found</h1>
          )}
        </>
      )}
    </div>
  );
};

export default UserAnimalList;
