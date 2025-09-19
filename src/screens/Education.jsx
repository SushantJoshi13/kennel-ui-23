import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getApi } from "../service/axios.service";

export const Education = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    const response = await getApi("courses?isActive=true");
    setCourses(response.data.data);
  };

  const nav = useNavigate();
  return (
    <div className="min-h-[90vh]">
      <div className="mt-10 p-5 md:p-10">
        <h3 className="text-center text-3xl font-bold">Education</h3>
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-2">
            <div className="-mx-4 hidden overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8 md:block">
              <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="bg-gray-100 border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                        Courses Name
                      </th>

                      <th className="bg-gray-100 border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c, i) => {
                      return (
                        <tr key={i}>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <div className="flex">
                              <div className="ml-3">
                                <p className="whitespace-no-wrap capitalize text-gray-900">
                                  {c.name}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <button
                              onClick={() => nav(`/education/${c.id}`)}
                              className="btn-primary"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="block md:hidden">
              {courses.map((c, i) => {
                return (
                  <div key={i} className="my-3 rounded-md p-3  shadow-lg">
                    <p className="text-sm font-semibold capitalize">{c.name}</p>

                    <div className="my-2 grid grid-cols-2 items-center text-sm">
                      <button
                        onClick={() => nav(`/education/${c.id}`)}
                        className="btn-primary"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
