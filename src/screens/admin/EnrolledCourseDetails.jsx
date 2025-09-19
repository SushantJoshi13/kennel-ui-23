import { useParams } from "react-router";
import BreederDetailsComponent from "../../components/BreederDetailsComponent";
import { useEffect, useState } from "react";
import { useSubmitForm } from "../../hooks/useSubmitForm";
import { toastConfig } from "../../constants/toast.constant";
import { toast } from "react-toastify";
import moment from "moment";

const EnrolledCourseDetails = () => {
  const [courses, setCourses] = useState();
  const { loading, submit } = useSubmitForm();
  const { courseId, userId } = useParams();
  const getEnrolledCourses = async () => {
    const response = await submit(
      "GET",
      `userCourse?userId=${userId}&id=${courseId}`,
      {}
    );
    if (response?.data?.statusCode === 200) {
      setCourses(response?.data?.data[0]);
    } else {
      toast.error(response?.data?.message, toastConfig);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, [courseId, userId]);

  const markComplete = async () => {
    const response = await submit(
      "PUT",
      `userCourse/completeCourse/${courseId}`
    );
    if (response.data.statusCode === 200) {
      toast.success("Course marked as complete", toastConfig);
    } else {
      toast.error(response?.data?.message, toastConfig);
    }
    getEnrolledCourses();
  };

  return (
    <section className="h-full p-7 font-poppins">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Enrolled Course Details</h1>
      </div>
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="my-4">
          <h1 className="font-semibold">User Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-4">
            <BreederDetailsComponent
              fieldValue={courses?.user?.user_name}
              labelName={"Name"}
            />
            <BreederDetailsComponent
              fieldValue={courses?.user?.contact_no}
              labelName={"Contact"}
            />
            <BreederDetailsComponent
              fieldValue={courses?.user?.email}
              labelName={"Email"}
            />
            <BreederDetailsComponent
              fieldValue={courses?.user?.user_country}
              labelName={"Country"}
            />
          </div>
          <div className="my-4">
            <h1 className="font-semibold">Course Details</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-4">
              <BreederDetailsComponent
                fieldValue={courses?.course?.name}
                labelName={"Course Name"}
              />
              <BreederDetailsComponent
                fieldValue={moment(courses?.start_date).format("DD-MM-YYYY")}
                labelName={"Start Date"}
              />
            </div>
          </div>

          <p className="mt-5 text-2xl font-semibold">
            Course Completion Status
          </p>
          <div className="my-4 grid grid-cols-1 gap-5 md:grid-cols-2">
            <BreederDetailsComponent
              labelName="Status"
              fieldValue={courses?.completed ? "Completed" : "In Progress"}
            />
            {!courses?.completed && (
              <button
                type="button"
                className="mt-8 max-h-11 rounded-lg bg-green-500 py-3 font-semibold text-white"
                onClick={(e) => markComplete()}
              >
                Mark Course as Complete
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
export default EnrolledCourseDetails;
