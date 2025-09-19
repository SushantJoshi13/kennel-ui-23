import { atom, selectorFamily } from "recoil";

export const animalAtom = atom({
  key: "animals",
  default: [],
});

export const getAnimalTypeName = selectorFamily({
  key: "getAnimalTypeName",
  get:
    (animal_type_id) =>
    ({ get }) => {
      const animals = get(animalAtom);

      return animals.find((a) => a.animal_type_id === animal_type_id);
    },
});
