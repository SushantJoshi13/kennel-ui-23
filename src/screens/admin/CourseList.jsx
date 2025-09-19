import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { Table } from "../../components/Table/Table";
import { toastConfig } from "../../constants/toast.constant";
import { useSubmitForm } from "../../hooks/useSubmitForm";
import moment from "moment";
import { useNavigate } from "react-router";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const { loading, submit } = useSubmitForm();
  const nav = useNavigate();

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
                  onClick={() =>
                    nav(`/admin-layout/edit-course/${row?.original?.id}`)
                  }
                />
                <AiFillDelete
                  className="cursor-pointer text-red-500"
                  onClick={() => deleteCourse(row?.original?.id)}
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
        Header: "Fees",
        accessor: "fees",
      },
      {
        Header: "Start Date",
        accessor: "start_date",
        Cell: ({ row }) => {
          return (
            <>
              <span>
                {moment(row.original.start_date).format("DD-MM-YYYY")}
              </span>
            </>
          );
        },
      },
      {
        Header: "End Date",
        accessor: "end_date",
        Cell: ({ row }) => {
          return (
            <>
              <span>{moment(row.original.end_date).format("DD-MM-YYYY")}</span>
            </>
          );
        },
      },
      {
        Header: "isActive",
        accessor: "is_active",
        Cell: ({ row }) => {
          return (
            <>
              <span>{row.original.is_active ? "Active" : "Inactive"}</span>
            </>
          );
        },
      },
    ],
    []
  );

  // Get All Costs
  const getAllCourses = async () => {
    const response = await submit("GET", "courses", {});
    if (response?.data?.statusCode === 200) {
      setCourses(response?.data?.data);
    } else {
      toast.error(response?.data?.message, toastConfig);
    }
  };

  // delete cost by ID
  const deleteCourse = async (id) => {
    const response = await submit("PUT", `courses/${id}`, { is_active: false });
    if (response?.data?.status === 200 || response.status === 200) {
      toast.success(response?.data?.message);
      getAllCourses();
    } else {
      toast.error(response?.data?.message);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <React.Fragment>
      <div className="m-5">
        <div className="flex items-center justify-between pr-4 pt-5">
          <p className="text-2xl font-semibold">Courses</p>
          <button
            className="rounded-lg bg-blue-600 p-3 text-white"
            onClick={() => {
              nav("/admin-layout/add-course");
            }}
          >
            Add
          </button>
        </div>
        {courses?.length && !loading ? (
          <Table columns={columns} data={courses} />
        ) : (
          <h1>
            {loading ? <span className="loader"></span> : "No Cost Found"}
          </h1>
        )}
      </div>
    </React.Fragment>
  );
};

export default CourseList;
