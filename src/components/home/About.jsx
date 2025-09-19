import React from "react";
import AboutImg from "../../assets/Images/about-bg.png";
import PetHealth from "../../icons/illustrations/PetHealth";
import PetFood from "../../icons/illustrations/PetFood";
import PetGrooming from "../../icons/illustrations/PetGrooming";

const About = () => {
  return (
    <div className="grid grid-2 gap-3 mx-5 md:mx-20 mb-[10%]">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-black text-3xl font-semibold mb-5">About Us</h1>
          <h1 className="text-main-yellow font-bold text-3xl md:text-5xl">
            Taking Care Of Your Pet
          </h1>
        </div>
        <div className="flex flex-col gap-3">
          <div className="pb-3 text-sm md:text-lg">
            GENUINE BREEDER ASSOCIATION is founded as Trust under THE BOMBAY
            PUBLIC TRUSTS ACT, 1950 on date 05/08/2022 Reg. no F-59689/PUNE.
          </div>
          <div className=" text-sm md:text-lg">
            Aim Of GENUINE BREEDER ASSOCIATION is keep register record of all
            Pet animal pedigree, promote standard breed & breeding program for
            genetically sound breed.
          </div>
          <div>
            <button className="bg-main-yellow px-5 py-3 rounded-lg text-white hover:bg-secondary transition-all duration-300 mt-5">
              Read More
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:justify-end">
        <div className="relative">
          <div className="hidden md:block p-4 bg-white shadow-lg absolute top-6 -left-10 rounded-lg z-10">
            <PetHealth />
          </div>
          <div className="hidden md:block p-4 bg-white shadow-lg absolute top-1/2 -right-10 rounded-lg z-10">
            <PetGrooming />
          </div>
          <div className="hidden md:block p-4 bg-white shadow-lg absolute bottom-4 -left-10 rounded-lg z-10">
            <PetFood />
          </div>
          <div className="relative">
            <div className="bg-main-yellow absolute sm:h-[450px] w-full top-14 left-3 z-[-1] rounded-xl"></div>
            <img
              src={AboutImg}
              alt="pet with owner "
              className="sm:h-[500px] rounded-xl"
            />
            <span className="bg-secondary"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
