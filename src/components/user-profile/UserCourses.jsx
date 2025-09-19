import moment from "moment";
import { PAYMENT_STATUS } from "../../context/PaymentContext";

export const UserCourses = ({ courses }) => {
  const getPaymentStatus = (status) => {
    let paymentStatus = PAYMENT_STATUS.PROCESSING;
    switch (status) {
      case 1:
        paymentStatus = PAYMENT_STATUS.SUCCESS;
        break;
      case 0:
        paymentStatus = PAYMENT_STATUS.FAILED;
        break;
      default:
        break;
    }
    return paymentStatus;
  };
  return (
    <div className="rounded-lg bg-white p-5 ">
      <h1>Courses Enrolled</h1>
      <div>
        {courses.length > 0 ? (
          <>
            <table className="mx-auto mt-4 hidden w-full md:table">
              <thead>
                <tr>
                  <th className="bg-gray-100 border-b-2 border-gray-200 p-1 text-center text-xs font-semibold tracking-wider text-gray-700 md:px-5 md:py-3 md:text-left md:text-base">
                    Course Name
                  </th>
                  <th className="bg-gray-100 border-b-2 border-gray-200 p-1 text-center text-xs font-semibold tracking-wider text-gray-700 md:px-5 md:py-3 md:text-left md:text-base">
                    Start Date
                  </th>
                  <th className="bg-gray-100 border-b-2 border-gray-200 p-1 text-center text-xs font-semibold tracking-wider text-gray-700 md:px-5 md:py-3 md:text-left md:text-base">
                    End Date
                  </th>
                  <th className="bg-gray-100 border-b-2 border-gray-200 p-1 text-center text-xs font-semibold tracking-wider text-gray-700 md:px-5 md:py-3 md:text-left md:text-base">
                    Status
                  </th>
                  <th className="bg-gray-100 border-b-2 border-gray-200 p-1 text-center text-xs font-semibold tracking-wider text-gray-700 md:px-5 md:py-3 md:text-left md:text-base">
                    Payment Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses?.map((c, i) => {
                  // if (c.payment_status === 1 || c.payment_status === 0)
                  //   return null;
                  return (
                    <tr key={i}>
                      <td className="border-b border-gray-200 bg-white p-1 text-sm md:px-5 md:py-3">
                        <p className="whitespace-no-wrap text-center text-xs text-gray-900 md:text-left md:text-base">
                          {c.course.name}
                        </p>
                      </td>
                      <td className="border-b border-gray-200 bg-white p-2 text-sm md:px-5 md:py-3">
                        <p className="whitespace-no-wrap text-center text-xs text-gray-900 md:text-left md:text-base">
                          {moment(c.start_date).format("DD-MM-YYYY")}
                        </p>
                      </td>
                      <td className="border-b border-gray-200 bg-white p-2 text-sm md:px-5 md:py-3">
                        <p className="whitespace-no-wrap text-center text-xs text-gray-600 md:text-left md:text-base">
                          {moment(c.end_date).format("DD-MM-YYYY")}
                        </p>
                      </td>
                      <td className="border-b border-gray-200 bg-white p-2 text-sm md:px-5 md:py-3">
                        <p className="whitespace-no-wrap text-center text-xs text-gray-600 md:text-left md:text-base">
                          {getPaymentStatus(c.payment_status) ===
                          PAYMENT_STATUS.FAILED
                            ? "NA"
                            : c.completed
                            ? "Completed"
                            : "In Progress"}
                        </p>
                      </td>
                      <td className="border-b border-gray-200 bg-white p-2 text-sm md:px-5 md:py-3">
                        <p className="whitespace-no-wrap text-center text-xs capitalize text-gray-600 md:text-left md:text-base">
                          {getPaymentStatus(c.payment_status)}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="block md:hidden">
              {courses?.map((c) => {
                return (
                  <div className="my-3 rounded-md p-3  shadow-lg">
                    <div className="flex gap-5">
                      <span className="text-sm font-semibold">
                        {c.course.name}
                      </span>
                    </div>
                    <div className="my-2 grid grid-cols-2 items-center text-sm">
                      <p className="col-span-1">Start Date:</p>
                      <p className="col-span-1 font-semibold">
                        {moment(c.start_date).format("DD-MM-YYYY")}
                      </p>
                    </div>
                    <div className="my-2 grid grid-cols-2 items-center text-sm">
                      <p className="col-span-1">End Date:</p>
                      <p className="col-span-1 font-semibold">
                        {moment(c.end_date).format("DD-MM-YYYY")}
                      </p>
                    </div>
                    <div className="my-2 grid grid-cols-2 items-center text-sm">
                      <p className="col-span-1">Payment Status:</p>
                      <p className="col-span-1 font-semibold capitalize">
                        {getPaymentStatus(c.payment_status) ===
                        PAYMENT_STATUS.FAILED
                          ? "NA"
                          : c.completed
                          ? "Completed"
                          : "In Progress"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <h1>No Courses Enrolled</h1>
        )}
      </div>
    </div>
  );
};
