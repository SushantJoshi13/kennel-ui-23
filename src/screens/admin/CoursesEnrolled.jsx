import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { Table } from "../../components/Table/Table";
import { toastConfig } from "../../constants/toast.constant";
import { useSubmitForm } from "../../hooks/useSubmitForm";
import moment from "moment";
import { useNavigate } from "react-router";

const PaymentStatus = {
  0: "Failed",
  1: "Success",
  2: "Initiated",
};
const EnrolledCourseList = () => {
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
                <FaEye
                  onClick={() =>
                    nav(
                      `/admin-layout/enrolled-course/${row?.original?.id}/${row.original.user.id}`
                    )
                  }
                />
              </span>
            </>
          );
        },
      },
      {
        Header: "User",
        accessor: "user.user_name",
      },
      {
        Header: "Course Name",
        accessor: "course.name",
      },
      {
        Header: "Payment Status",
        accessor: "payment_status",
        Cell: ({ row }) => {
          return (
            <>
              <span>{PaymentStatus[row.original.payment_status]}</span>
            </>
          );
        },
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
        Header: "Completed",
        accessor: "completed",
        Cell: ({ row }) => {
          return (
            <>
              <span>
                {row.original.completed ? "✅ Completed" : "🕙 In Progress"}
              </span>
            </>
          );
        },
      },
    ],
    []
  );

  // Get All Costs
  const getEnrolledCourses = async () => {
    const response = await submit("GET", "userCourse", {});
    if (response?.data?.statusCode === 200) {
      setCourses(response?.data?.data);
    } else {
      toast.error(response?.data?.message, toastConfig);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <React.Fragment>
      <div className="m-5">
        <div className="flex items-center justify-between pr-4 pt-5">
          <p className="text-2xl font-semibold">Enrolled Courses</p>
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

export default EnrolledCourseList;
