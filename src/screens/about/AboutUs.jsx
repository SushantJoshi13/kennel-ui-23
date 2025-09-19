import React from "react";
import { BsDashLg } from "react-icons/bs";
import { FaDog } from "react-icons/fa";
import { FiUserCheck } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { RiMedal2Line } from "react-icons/ri";
import Dogs from "../../assets/Images/dogs-about.png";
import GrassBg from "../../assets/Images/grass.png";
import Step1 from "../../assets/Images/step1-about.png";
import Step2 from "../../assets/Images/step2-about.png";
import Step3 from "../../assets/Images/step3-about.png";

const AboutUs = () => {
  return (
    <div>
      <div
        className="relative bg-cover bg-no-repeat p-12 text-center"
        style={{ backgroundImage: `url(${GrassBg})`, height: "400px" }}
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full  bg-fixed backdrop-brightness-[40%]">
          <div className="">
            <div className="text-white">
              <p className="mt-10 py-5 text-5xl font-semibold">About Us</p>
              <p className="absolute top-[35%] mx-[7%] my-5 text-center text-white md:mx-[20%]">
                {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Excepturi reiciendis veritatis quisquam commodi error
                dignissimos. */}
              </p>
            </div>
            <img
              src={Dogs}
              alt="dogs"
              className=" absolute bottom-0 w-full md:bottom-[-10%] lg:bottom-[-25%]"
            />
          </div>
        </div>
      </div>
      <div className="mx-10 mb-[2%] mt-[7%] md:mx-20">
        <p className="py-5 text-2xl font-semibold text-main-yellow md:text-5xl">
          Taking Care Of Your Pet
        </p>
        <p className="md:text-xl">
          GENUINE BREEDER ASSOCIATION is founded as Trust under <br />
          THE BOMBAY PUBLIC TRUSTS ACT, 1950 on date 05/08/2022 <br />
          Reg. no F-59689/PUNE.
          <br />
          <br />
          Aim Of GENUINE BREEDER ASSOCIATION is keep register record of all Pet
          animal pedigree, promote standard breed & breeding program for
          genetically sound breed.
        </p>
      </div>
      <div className="mx-10 md:mx-20">
        <p className="flex items-center justify-center py-5 text-lg text-main-yellow">
          <BsDashLg /> How We Work
        </p>
        <p className="text-center text-2xl font-bold md:text-4xl">
          Pet Adoption Process
        </p>
        <div className="grid-3">
          <div className="md:px-5">
            <img
              src={Step1}
              alt="step1
            "
              className="mx-auto p-5 md:p-10"
            />
            <p className="text-center text-xl font-bold">Find Your Pet</p>
            <p className="text-center">
              {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. */}
            </p>
          </div>
          <div className="md:px-5">
            <img src={Step2} alt="step2" className="mx-auto p-5 md:p-10" />
            <p className="text-center text-xl font-bold">Know Your Pet</p>
            <p className="text-center">
              {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. */}
            </p>
          </div>
          <div className="md:px-5">
            <img src={Step3} alt="step3" className="mx-auto p-5 md:p-10" />
            <p className="text-center text-xl font-bold">Take Your Pet Home</p>
            <p className="text-center">
              {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. */}
            </p>
          </div>
        </div>
      </div>
      <div
        className="relative mt-[60%] h-[300px] bg-cover bg-no-repeat p-12 text-center md:mt-[25%] md:h-[400px]"
        style={{ backgroundImage: `url(${GrassBg})` }}
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full  bg-fixed backdrop-brightness-[30%]">
          <div className="">
            <iframe
              className=" absolute top-[-60%] h-[200px] w-full opacity-100 md:left-[20%] md:top-[-40%] md:h-[315px] md:w-[60%]"
              src="https://www.youtube.com/embed/HG109eNCaqA"
              title="Genuine Breeder Association"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <div className="absolute top-[30%] grid w-full grid-cols-2 md:grid-cols-4 gap-5 text-center md:top-[45%]">
              <div className="flex-col font-bold text-main-yellow md:text-5xl">
                <HiOutlineUserGroup className="mx-auto md:mb-5" />
                <p className="text-white">
                  50
                  <span className="absolute text-sm font-normal text-main-yellow">
                    +
                  </span>
                </p>
                <p className="text-sm font-normal text-white">Participants</p>
              </div>
              <div className="flex-col gap-5 font-bold text-main-yellow md:text-5xl">
                <FaDog className="mx-auto md:mb-5" />
                <p className="text-white">
                  120
                  <span className="absolute text-sm font-normal text-main-yellow">
                    +
                  </span>
                </p>
                <p className="text-sm font-normal text-white">Dogs Adopted</p>
              </div>
              <div className="flex-col gap-5 font-bold text-main-yellow md:text-5xl">
                <FiUserCheck className="mx-auto md:mb-5" />
                <p className="text-white">
                  35
                  <span className="absolute text-sm font-normal text-main-yellow">
                    +
                  </span>
                </p>
                <p className="text-sm font-normal text-white">
                  Experienced Breeders
                </p>
              </div>
              <div className="flex-col gap-5 font-bold text-main-yellow md:text-5xl">
                <RiMedal2Line className="mx-auto md:mb-5" />
                <p className="text-white">
                  20
                  <span className="absolute text-sm font-normal text-main-yellow">
                    +
                  </span>
                </p>
                <p className="text-sm font-normal text-white">
                  Years Experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
