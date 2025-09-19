import { getApi } from "./axios.service";

export const getAllAnimalTypes = async () => {
  const response = await getApi("animalMaster");
  if (response?.status === 200) {
    return response?.data?.data;
  }

  return response?.data?.data ?? [];
};

export const getAnimalBreeds = async (animalId) => {
  const response = await getApi(`breedMaster?animal_type_id=${animalId}`);
  return response?.data?.data ?? [];
};
