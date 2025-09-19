import { useEffect, useState } from "react";
import { getAllAnimalTypes } from "../service/masterData.service";
import { useNavigate } from "react-router";

export const AnimalRegistrationDetails = () => {
  const [loading, setLoading] = useState(true);
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    getAllAnimals();
  }, []);

  const getAllAnimals = async () => {
    const animals = await getAllAnimalTypes();
    setAnimals(animals);
    setLoading(false);
  };

  const nav = useNavigate();
  return (
    <div className="min-h-[90vh]">
      <div className="mt-10 p-5 md:p-10">
        <h3 className="text-center text-3xl font-bold">Animal Information</h3>
        {loading ? (
          <div className="flex h-[90vh] w-full items-center justify-center">
            <span className="loader self-center"></span>
          </div>
        ) : (
          <div className="container mx-auto px-4 sm:px-8">
            <div className="py-2 flex flex-col">
              <div className=" overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                {animals.map((animal, i) => {
                  return (
                    <div
                      key={animal.animal_type_name}
                      className="my-3 rounded-md p-3 shadow-lg duration-300 hover:bg-main-yellow hover:text-white group cursor-pointer"
                    >
                      <p className="text-xl font-semibold text-center ">
                        {animal.animal_type_name}
                      </p>
                      <p className="my-2 text-base">
                        {animal.animal_type_description}
                      </p>
                      <button
                        onClick={() => nav(`/breeds/${animal.animal_type_id}`)}
                        className="text-sm font-normal text-main-yellow group-hover:text-white"
                      >
                        See Breeds
                      </button>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => nav("/add-animal")}
                className="rounded-lg bg-main-yellow w-3/4 md:w-1/5 px-5 py-3 text-white transition-all self-center duration-300 hover:bg-secondary"
              >
                Add Animal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
