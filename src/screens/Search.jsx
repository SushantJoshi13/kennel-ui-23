import React, { useState } from "react";
import useAuth from "../context/userContext";
import useDebounce from "../hooks/useDebounce";
import { useSubmitForm } from "../hooks/useSubmitForm";

const Search = () => {
  const [searchParams, setSearchParams] = useState("");
  const [searchResponse, setSearchResponse] = useState([]);
  const { loading, submit } = useSubmitForm();
  const { setLoading } = useAuth();
  const getAnimalAndOwner = async (query) => {
    try {
      const res = await submit(
        "GET",
        `animal/getAnimalAndOwner?animal_microchip_id=${query}`,
        {}
      );
      if (res.data?.statusCode === 200 || res.status === 200) {
        setSearchResponse(res.data?.data);
      }
    } catch (error) {
      searchResponse = [];
      setLoading(false);
    }
  };
  useDebounce(() => getAnimalAndOwner(searchParams), 1000, [searchParams]);
  return (
    <div className="min-h-[90vh]">
      <div className="p-5 md:p-16">
        <h3 className="text-center text-3xl font-bold">Search</h3>
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-2">
            <div className="-mx-4 overflow-x-auto py-4 sm:-mx-8 sm:px-8 md:block">
              <div className="inline-block min-w-full overflow-hidden rounded-lg">
                <div className="w-full flex-col items-center ">
                  <div className="flex w-full space-x-1">
                    <input
                      type="search"
                      className="block w-full rounded-full border-2 border-slate-300 bg-white px-3 py-2 text-black focus:border-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-40"
                      placeholder="Enter microchip number"
                      onChange={(e) => setSearchParams(e.target.value)}
                    />
                    <button className="rounded-full bg-main-yellow px-3 text-white ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div>
                    {searchParams.length > 2 ? (
                      <>
                        {loading ? (
                          <span className="loader m-2"></span>
                        ) : searchResponse.length > 0 ? (
                          searchResponse?.map((a, i) => {
                            return (
                              <div className="my-6 rounded-lg border-2 p-2 shadow-xl">
                                <p>Animal Name: {a.animal_name}</p>
                                <p>Owner Name: {a.animal_owner_id.user_name}</p>
                                <p>Contact : {a.animal_owner_id.contact_no}</p>
                              </div>
                            );
                          })
                        ) : (
                          <p className="p-2">No Results Found!</p>
                        )}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
