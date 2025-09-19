import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAnimalBreeds } from "../service/masterData.service";

export const Breeds = () => {
  const [loading, setLoading] = useState(true);
  const [breeds, setBreeds] = useState([]);
  const params = useParams();
  useEffect(() => {
    if (params.animalTypeId) {
      getBreeds(params.animalTypeId);
    }
  }, [params.animalTypeId]);

  const getBreeds = async (animalTypeId) => {
    const breeds = await getAnimalBreeds(animalTypeId);
    setBreeds(breeds);
    setLoading(false);
  };

  return (
    <div className="min-h-[90vh]">
      <div className="mt-10 p-5 md:p-10">
        <h3 className="text-center text-3xl font-bold">Breed Information</h3>
        {loading ? (
          <div className="flex h-[90vh] w-full items-center justify-center">
            <span className="loader self-center"></span>
          </div>
        ) : (
          <div className="container mx-auto px-4 sm:px-8">
            <div className="py-2">
              <div className="-mx-4 hidden overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8 md:block">
                <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="bg-gray-100 border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                          Breed Name
                        </th>
                        <th className="bg-gray-100 border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                          Description
                        </th>

                        <th className="bg-gray-100 border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                          Image
                        </th>
                        <th className="bg-gray-100 border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                          Animal Type
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {breeds.map((c, i) => {
                        return (
                          <tr key={i}>
                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <div className="flex">
                                <div className="ml-3">
                                  <p className="whitespace-no-wrap text-gray-900">
                                    {c.animal_breed_name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <p className="whitespace-no-wrap text-gray-900">
                                {c.animal_breed_description}
                              </p>
                            </td>
                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <p className="whitespace-no-wrap text-gray-600">
                                <img
                                  src={c.image_link}
                                  alt={c.animal_breed_name}
                                />
                              </p>
                            </td>
                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <p className="whitespace-no-wrap text-gray-600">
                                {c.animal_type.animal_type_name}
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="block md:hidden">
                {breeds.map((c) => {
                  return (
                    <div
                      key={c.animal_breed_name}
                      className="my-3 rounded-md p-3  shadow-lg"
                    >
                      <img
                        className="w-full h-52 object-con"
                        src={c.image_link}
                        alt={c.animal_breed_name}
                      />

                      <p className="text-sm font-semibold">
                        {c.animal_breed_name}
                      </p>
                      <p className="my-2 text-xs">
                        {c.animal_breed_description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
