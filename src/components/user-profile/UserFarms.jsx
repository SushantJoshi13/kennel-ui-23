import { useNavigate } from "react-router";

export const UserFarms = ({ farms }) => {
  const nav = useNavigate();
  return (
    <div className="rounded-lg bg-white p-5 ">
      <div className="flex flex-col md:flex-row justify-between">
        <h1>Farm Types</h1>
        <div className="flex flex-row mt-2 justify-between">
          <button
            onClick={() => nav("/add-farm")}
            className="rounded-lg bg-blue-400 px-4 py-2 font-semibold text-white mr-2"
          >
            Add Farm
          </button>
          <button
            onClick={() => nav("/transfer-farm")}
            className="rounded-lg bg-blue-400 px-4 py-2 font-semibold text-white "
          >
            Request Transfer
          </button>
        </div>
      </div>
      <div>
        {farms?.length ? (
          <>
            <table className="mx-auto mt-4 hidden w-full md:table">
              <thead>
                <tr>
                  <th className="bg-gray-100 border-b-2 border-gray-200 p-1 text-center text-xs font-semibold tracking-wider text-gray-700 md:px-5 md:py-3 md:text-left md:text-base">
                    Farm Logo
                  </th>
                  <th className="bg-gray-100 border-b-2 border-gray-200 p-1 text-center text-xs font-semibold tracking-wider text-gray-700 md:px-5 md:py-3 md:text-left md:text-base">
                    Farm Name
                  </th>
                  <th className="bg-gray-100 border-b-2 border-gray-200 p-1 text-center text-xs font-semibold tracking-wider text-gray-700 md:px-5 md:py-3 md:text-left md:text-base">
                    Address
                  </th>
                  <th className="bg-gray-100 border-b-2 border-gray-200 p-1 text-center text-xs font-semibold tracking-wider text-gray-700 md:px-5 md:py-3 md:text-left md:text-base">
                    License Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {farms?.map((c, i) => {
                  return (
                    <tr key={i}>
                      <td className="border-b border-gray-200 bg-white p-1 text-sm md:px-5 md:py-3">
                        <div className="">
                          <img
                            src={c.logo}
                            alt="logo"
                            className="mx-auto h-5 w-5 rounded-full md:h-10 md:w-10"
                          />
                        </div>
                      </td>
                      <td className="border-b border-gray-200 bg-white p-2 text-sm md:px-5 md:py-3">
                        <p className="whitespace-no-wrap text-center text-xs text-gray-900 md:text-left md:text-base">
                          {c.farm_name}
                        </p>
                      </td>
                      <td className="border-b border-gray-200 bg-white p-2 text-sm md:px-5 md:py-3">
                        <p className="whitespace-no-wrap text-center text-xs text-gray-600 md:text-left md:text-base">
                          {c.farm_address}
                        </p>
                      </td>
                      <td className="border-b border-gray-200 bg-white p-2 text-sm md:px-5 md:py-3">
                        <p className="whitespace-no-wrap text-center text-xs text-gray-600 md:text-left md:text-base">
                          {c.license_no}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="block md:hidden">
              {farms?.map((c) => {
                return (
                  <div
                    key={c.farm_name}
                    className="my-3 rounded-md p-3  shadow-lg"
                  >
                    <div className="flex gap-5">
                      <img
                        src={c.logo}
                        alt="logo"
                        className="m-0 h-7 w-7 rounded-full md:h-10 md:w-10"
                      />
                      <span className="text-sm font-semibold">
                        {c.farm_name}
                      </span>
                    </div>
                    <div className="my-2 grid grid-cols-2 items-center text-sm">
                      <p className="col-span-1">Address:</p>
                      <p className="col-span-1 font-semibold">
                        {c.farm_address}
                      </p>
                    </div>
                    <div className="my-2 grid grid-cols-2 items-center text-sm">
                      <p className="col-span-1">License Number:</p>
                      <p className="col-span-1 font-semibold">{c.license_no}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <h1>No Farms Added</h1>
          </>
        )}
      </div>
    </div>
  );
};
