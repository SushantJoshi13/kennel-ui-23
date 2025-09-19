import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { animalGender } from "../../constants/app.constants";
import { useTreeContext } from "../../context/TreeContext";
import { animalAtom } from "../../recoil/atom/animalAtom";
import {
  getAllAnimalTypes,
  getAnimalBreeds,
} from "../../service/masterData.service";
import CountryDropDown from "../CountryDropDown";
import InputComponent from "../InputComponent";
import TermsCheckbox from "../input/TermsCheckbox";
export const AddAnimalForm = ({
  onSubmit,
  initialValues,
  showCertificateOption,
  editMode,
  validationSchema,
  btnLoading,
  btnTitle,
}) => {
  const { tree, register_certificate, setRegisterCertificate } =
    useTreeContext();
  const [animals, setAnimals] = useRecoilState(animalAtom);

  const [breedList, setBreedList] = useState([]);
  useEffect(() => {
    getAnimals();

    if (animals.length > 0) {
      getBreeds(animals[0].animal_type_id);
    }
  }, [animals]);

  useEffect(() => {
    if (editMode) {
      getBreeds(initialValues.animal_type_id);
    }
  }, [editMode]);

  async function getAnimals() {
    if (animals.length === 0) {
      const animalsData = await getAllAnimalTypes();
      setAnimals(animalsData);
    }
  }
  const getBreeds = async (id) => {
    const breeds = await getAnimalBreeds(id);
    setBreedList(breeds);
  };

  const getAnimalTypeName = (id) => {
    const animal = animals.find((a) => a.animal_type_id === id);
    return animal?.animal_type_name ?? "";
  };

  const nav = useNavigate();

  return (
    <Formik
      onSubmit={(data) => {
        onSubmit(data);
      }}
      initialValues={{
        ...initialValues,
        animal_type_id:
          typeof initialValues.animal_type_id === "number"
            ? initialValues.animal_type_id
            : animals?.[0]?.animal_type_id,
      }}
      validationSchema={validationSchema}
      validateOnChange={true}
      enableReinitialize={true}
      validateOnBlur={true}
      component={({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => {
        const test = (e, id, location, setFieldValue) => {
          var loc = document.getElementById(location);
          loc.firstChild && loc.removeChild(loc.firstChild);
          var file = document.getElementById(id)?.files[0];
          // console.log("filename", file);
          var reader = new FileReader();
          // it's onload event and you forgot (parameters)
          // console.log(reader);
          reader.onload = function (e) {
            var image = document.createElement("img");
            // the result image data
            image.src = e.target.result;
            loc.appendChild(image);
          };
          setFieldValue(id, e.target.files[0]);
          // you have to declare the file loading
          file && reader.readAsDataURL(file);
        };

        return (
          <Form className="w-[90%] max-w-[90%] py-5 lg:w-1/2 lg:max-w-[50%]">
            <div className="mx-5 flex flex-col">
              {!editMode && (
                <div className="my-10 grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <AnimalTypeTabs
                    animalTypes={animals}
                    onClick={(id) => {
                      setFieldValue("animal_type_id", id);
                      setFieldValue("animal_breed_id", "");
                      getBreeds(id);
                    }}
                    selected={values?.animal_type_id}
                  />
                </div>
              )}

              {values?.animal_type_id && (
                <h3 className="mb-2 text-lg font-bold text-white">
                  {editMode ? "Update" : "Add"}{" "}
                  {getAnimalTypeName(values.animal_type_id)}
                </h3>
              )}

              {showCertificateOption && !editMode ? (
                <>
                  <p className="font-semibold text-white">
                    Do you have Registration Certificate?
                  </p>
                  <div className="space-x-4 font-semibold text-white">
                    <label className="space-x-1">
                      <input
                        type="radio"
                        name="register_certificate"
                        disabled={editMode}
                        value="Yes"
                        checked={register_certificate}
                        onChange={() => {
                          setRegisterCertificate("Yes");
                        }}
                      />
                      <span>YES</span>
                    </label>
                    <label className="space-x-1">
                      <input
                        type="radio"
                        disabled={editMode}
                        name="register_certificate"
                        value="No"
                        checked={!register_certificate}
                        onChange={() => {
                          setRegisterCertificate(!register_certificate);
                        }}
                      />
                      <span>NO</span>
                    </label>
                  </div>
                </>
              ) : null}

              {register_certificate && (
                <div className="mt-4">
                  <p className="font-semibold text-white">Animal pedigree</p>

                  <span
                    className="btn-primary my-4 w-full cursor-pointer"
                    onClick={() =>
                      nav("/tree", {
                        state: `${
                          showCertificateOption
                            ? "addAnimal"
                            : "pedegreeRegistration"
                        }`,
                      })
                    }
                  >
                    {Object.keys(tree).length > 0 ? "View" : "Create"} Animal
                    Pedigree
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {!register_certificate && (
                  <InputComponent
                    name={`name`}
                    type="text"
                    value={values.name}
                    placeholder="Enter Name"
                    onChange={handleChange}
                    errorMessage={touched?.name ? errors.name : ""}
                  />
                )}
                <div className="mt-3">
                  <label className="text-sm font-medium text-white">
                    Breed
                  </label>

                  <select
                    name="animal_breed_id"
                    value={values.animal_breed_id}
                    onChange={handleChange}
                    placeholder="Select Breed"
                    className="my-2 h-12 w-full rounded-lg border bg-transparent px-3 py-3 text-white shadow-md outline-gray-700  hover:shadow-xl hover:outline-none md:h-14"
                  >
                    <option value={"0"} className="text-white">
                      Select Breed
                    </option>

                    {breedList.map((breed, i) => {
                      return (
                        <option
                          key={i}
                          value={breed.animal_breed_id}
                          className="max-w-full capitalize text-black"
                        >
                          {breed.animal_breed_name}
                        </option>
                      );
                    })}
                  </select>
                  <small className="pl-2 text-xs capitalize text-red-500">
                    {touched?.animal_breed_id ? errors.animal_breed_id : ""}
                  </small>
                </div>
                <div>
                  <InputComponent
                    name={`dob`}
                    type="date"
                    value={values.dob}
                    placeholder="Date of Birth"
                    onChange={handleChange}
                    errorMessage={errors.dob}
                    max={new Date().toISOString().split("T")[0]}
                    min={
                      new Date(
                        new Date().setFullYear(new Date().getFullYear() - 30)
                      )
                        .toISOString()
                        .split("T")[0]
                    }
                  />
                </div>
                <div>
                  <InputComponent
                    value={values.breeder_name}
                    name={`breeder_name`}
                    type="text"
                    placeholder="Enter Breeder Name"
                    onChange={handleChange}
                    errorMessage={errors.breeder_name}
                  />
                </div>
                <div>
                  <InputComponent
                    value={values.microchipNo}
                    name={`microchipNo`}
                    type="text"
                    placeholder="Enter Microchip number"
                    onChange={handleChange}
                    errorMessage={
                      touched?.microchipNo ? errors.microchipNo : ""
                    }
                  />
                </div>
                <div>
                  <InputComponent
                    value={values.tagNumber}
                    name={`tagNumber`}
                    type="text"
                    placeholder="Enter Tag / Tattoo number"
                    onChange={handleChange}
                    errorMessage={touched?.tagNumber ? errors.tagNumber : ""}
                  />
                </div>
                <div>
                  <InputComponent
                    name={`colorAndMark`}
                    type="text"
                    placeholder="Color or mark of pet"
                    value={values.colorAndMark}
                    onChange={handleChange}
                    errorMessage={errors.colorAndMark}
                  />
                </div>
                <div className="mt-3">
                  <label className="text-sm font-medium text-white">
                    Select Gender
                  </label>
                  <select
                    name={`gender`}
                    value={values.gender}
                    onChange={handleChange}
                    className="my-2 h-12 w-full rounded-lg border bg-transparent px-3 py-3 text-white shadow-md outline-gray-700 hover:shadow-xl hover:outline-none md:h-14"
                  >
                    <option value={""} className="text-white">
                      Select Gender
                    </option>

                    {animalGender.map((gender, i) => {
                      return (
                        <option key={i} value={gender} className="text-black">
                          {gender}
                        </option>
                      );
                    })}
                  </select>
                  <small className="pl-2 text-xs text-red-500">
                    {touched.gender && errors.gender}
                  </small>
                </div>
                <CountryDropDown
                  value={values.country}
                  onChange={handleChange}
                  errorMessage={touched.country ? errors.country : ""}
                />
              </div>

              {!register_certificate ? (
                <div className="my-5 rounded-xl border p-5">
                  <label className="text-xl text-[#FAB417]">
                    {getAnimalTypeName(values.animal_type_id)} Images
                  </label>
                  <div>
                    <InputComponent
                      name={`frontView`}
                      id="frontView"
                      type="file"
                      placeholder="Front View of Animal"
                      onChange={(e) =>
                        test(e, "frontView", "output", setFieldValue)
                      }
                      errorMessage={errors.frontView}
                    />
                    {editMode && !!values.animal_front_view_image && (
                      <DocDetails
                        fieldValue={"Animal Front View Image"}
                        labelName={"Uploaded Animal Front View Image"}
                        isDoc={true}
                        docLink={values.animal_front_view}
                      />
                    )}
                    <br />
                    <div id="output" className="output max-w-[200px]"></div>
                  </div>
                  <div>
                    <InputComponent
                      name={`leftView`}
                      id="leftView"
                      type="file"
                      placeholder="Left View"
                      onChange={(e) =>
                        test(e, "leftView", "output2", setFieldValue)
                      }
                      errorMessage={errors.leftView}
                    />
                    {editMode && !!values.animal_left_view_image && (
                      <DocDetails
                        fieldValue={"Animal Left View Image"}
                        labelName={"Uploaded Animal Left View Image"}
                        isDoc={true}
                        docLink={values.animal_left_view}
                      />
                    )}
                    <br />
                    <div id="output2" className="output2 max-w-[200px]"></div>
                  </div>
                  <div>
                    <InputComponent
                      name={`rightView`}
                      id="rightView"
                      type="file"
                      placeholder="Right View"
                      onChange={(e) =>
                        test(e, "rightView", "output3", setFieldValue)
                      }
                      errorMessage={errors.rightView}
                    />
                    {editMode && !!values.animal_right_view_image && (
                      <DocDetails
                        fieldValue={"Animal Right View Image"}
                        labelName={"Uploaded Animal Right View Image"}
                        isDoc={true}
                        docLink={values.animal_right_view}
                      />
                    )}
                    <br />
                    <div id="output3" className="output3 max-w-[200px]"></div>
                  </div>
                </div>
              ) : (
                <div>
                  <InputComponent
                    name={`certificate`}
                    type="file"
                    placeholder="Register Certificate"
                    onChange={(e) => {
                      setFieldValue("certificate", e.target.files[0]);
                    }}
                    errorMessage={touched.certificate ? errors.certificate : ""}
                  />
                  {editMode && (
                    <DocDetails
                      fieldValue={"Registration Document"}
                      labelName={"Uploaded Registration Document"}
                      isDoc={true}
                      docLink={values.animal_registration}
                    />
                  )}
                </div>
              )}
              <div>
                <InputComponent
                  name={`dnaDoc`}
                  id="dnaDoc"
                  type="file"
                  placeholder="DNA Document (optional)"
                  onChange={(e) => test(e, "dnaDoc", "output4", setFieldValue)}
                />
                {editMode && !!values.animal_dna_doc && (
                  <DocDetails
                    fieldValue={"DNA Document"}
                    labelName={"Uploaded DNA Document"}
                    isDoc={true}
                    docLink={values.animal_dna}
                  />
                )}
                <br />
                <div id="output4" className="output4 max-w-[200px]"></div>
              </div>
              <div>
                <InputComponent
                  name={`hdedDoc`}
                  id="hdedDoc"
                  type="file"
                  placeholder="HDED Document (optional)"
                  onChange={(e) => test(e, "hdedDoc", "output5", setFieldValue)}
                />
                {editMode && !!values.animal_hded_doc && (
                  <DocDetails
                    fieldValue={"HDED Document"}
                    labelName={"Uploaded HDED Document"}
                    isDoc={true}
                    docLink={values.animal_hded}
                  />
                )}
                <br />
                <div id="output5" className="output5 max-w-[200px]"></div>
              </div>
              {!editMode && (
                <TermsCheckbox
                  onChange={(checked) => setFieldValue("terms", checked)}
                  name={"Add-Animal"}
                  error={touched.terms ? errors.terms : ""}
                  termTitle={""}
                  linkTitle={"Terms & condition"}
                  termContent={
                    <p>
                      I / We hereby declare that the above domestic animal is
                      solely and unconditionally my / our property and that
                      particulars given are true to the best of my / our
                      knowledge and belief.
                      <br />I / We further declare that I / We am / are not
                      suspended or disqualified or indebted to any club of INDIA
                      or Dog Show or Dog Trial or Working Trial or Field Trial
                      in making this application.
                      <br /> I / We agree to be bound by GENUINE BREEDER
                      ASSOCIATION Rules & Regulations & Bye Laws as may be
                      amended & in force from time to time and I / We do hereby
                      acknowledge the jurisdiction of the Committee of the
                      GENUINE BREEDER ASSOCIATION as the governing body for
                      canine affairs in India and the Final Court of Appeal or
                      Umpire, on all questions or disputes or complaints or
                      reports of any kind whatsoever arising in respect of
                      Registered Club, Dog Shows, Dog Trials, Working Trials and
                      Field Trials and of the Registration or Transfer of name
                      of any Dog or dogs and of any transaction in respect of
                      breeding or sale or pedigree of any dog or dogs, and I/ We
                      hereby expressly agree that the decision of the Committee
                      upon any question or dispute or complaint or report shall
                      be final and binding on me / us.
                    </p>
                  }
                  modalTitle={"Add Animal"}
                />
              )}
              <div className="">
                <button
                  className={`btn-primary my-4 w-full `}
                  type="submit"
                  name="submit_form"
                  disabled={btnLoading}
                >
                  {!btnLoading ? (
                    btnTitle ? (
                      btnTitle
                    ) : editMode ? (
                      "Update"
                    ) : (
                      "  Pay and Submit"
                    )
                  ) : (
                    <span className="loader"></span>
                  )}
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    />
  );
};

export const AnimalTypeTabs = ({ animalTypes, onClick, selected }) => {
  return (
    <>
      {Array.isArray(animalTypes) &&
        animalTypes.map((animal, i) => {
          return (
            <button
              key={i}
              value={animal.animal_type_id}
              className={`rounded-3xl ${
                selected === animal.animal_type_id
                  ? "cards-primary bg-yellow mx-auto h-10 w-full py-0 text-white"
                  : "cards-primary mx-auto h-10 w-full border border-black bg-changecol py-0 text-changecol"
              }`}
              onClick={() => onClick(animal.animal_type_id)}
            >
              {animal.animal_type_name}
            </button>
          );
        })}
    </>
  );
};

const DocDetails = ({ labelName, docLink, fieldValue }) => {
  return (
    <div className="my-2 ">
      <label className="py-2 text-sm font-medium text-white">{labelName}</label>
      <p
        onClick={() => {
          window.open(docLink, "_blank", "noreferrer");
        }}
        className={`my-2 cursor-pointer rounded-lg border-2 
           p-2 text-blue-200
        `}
      >
        {fieldValue}
      </p>
    </div>
  );
};
