import React from "react";
import DogCover from "../../assets/Images/service-img.png";
import ServiceCard from "../../components/cards/ServiceCard";
import { BsCheckLg } from "react-icons/bs";
import Dog1 from "../../assets/Images/service-group.jpg";
import FindDog from "../../assets/Images/service-find-dog.png";
import useAuth from "../../context/userContext";

const Services = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <div
        className="relative bg-cover bg-no-repeat text-center"
        style={{
          backgroundImage: `url(${DogCover})`,
          backdropFilter: "brightness(20%)",
        }}
      >
        <div className="flex h-full w-full items-center justify-center bg-fixed backdrop-brightness-[40%]">
          <div className="my-20">
            <div className="text-white">
              <p className="pt-10 text-5xl font-semibold">Services</p>
              <p className="px-5 py-5 text-center text-white md:px-32 md:py-10">
                {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Excepturi reiciendis veritatis quisquam commodi error
                dignissimos. */}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 py-10 md:px-20">
        <p className="py-5 text-center text-xs text-main-yellow">
          Our Services
        </p>
        <p className="text-center text-3xl font-bold md:text-5xl">
          Our Best Services
        </p>
        <p className="py-5 text-center text-xs">
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
          voluptatem vero facere nobis et quod accusantium aliquid cum. Deleniti
          amet, aut magnam nobis ipsum sequi illo. Accusantium fugiat ab natus
          molestias necessitatibus facere, porro vel. */}
        </p>
        <div className="grid-3">
          <ServiceCard
            text={
              " Genuine Breeder Association is a 1 st organization who register all types Domestic animals under a same platform for given separate identity and reference to breeding program, legal Formality too."
            }
            title={"Animal Registration"}
            redirect={"/add-animal"}
          />
          {user?.user_role_id.role_id === 1 && (
            <ServiceCard
              title={"Litter Registration"}
              redirect={"/litter"}
              text={
                " Genuine Breeder Association is a only organization who online  register  legal breeder's breeding litter of all Domestic animals with many  verification."
              }
            />
          )}
          <ServiceCard
            title={"Transfer Ownership"}
            text={
              "Genuine Breeder Association is a only organization who transfer  ownership of  Domestic animals very quickly after online verification and confirmation of previous owner"
            }
            redirect={"/transfer-owner"}
          />
          <ServiceCard
            title={"Change Animal Name"}
            text={
              " Genuine Breeder Association is a only Organization who allows to make change Animal name multiple times but not change his registration number & Microchip number."
            }
            redirect={"/change-name"}
          />
          <ServiceCard
            title={"Import Pedigree"}
            redirect={"/import-pedigree"}
            text={
              "Genuine Breeder Association is a only organization who cross verify import dog's County, Pedigree, previous owner's confirmation & legal documents of import domestic animal."
            }
          />
          <ServiceCard
            title={"Export Pedigree"}
            redirect={"/export-pedigree"}
            text={
              " Genuine Breeder Association is a organization who provide export pedigree for shifting from one country to other counry of all domestic animal's with DNA, HD,ED report on demand."
            }
          />
        </div>
      </div>
      <div
        className="relative bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${FindDog})`,
          backdropFilter: "brightness(20%)",
        }}
      >
        <div className="flex h-full w-full items-center justify-end bg-fixed backdrop-brightness-[40%]">
          <div className="my-20">
            <div className="flex-row justify-end px-5 text-white md:px-20">
              <p className="text-center text-xs text-main-yellow md:text-right">
                Find Your Dog |
              </p>
              <p className="my-5 text-center text-2xl font-semibold md:pl-[50%] md:text-right md:text-4xl">
                Dogs Are Not Our Whole Life, but They Make Our Life Whole
              </p>
              <button className="mx-auto flex rounded-lg bg-main-yellow p-2 md:float-right md:mx-0">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 py-10 md:px-20">
        <div className="grid-2">
          <img
            src={Dog1}
            className="mx-auto my-auto flex max-h-[400px]"
            alt="Dog "
          />
          <div>
            <p className="text-xs text-main-yellow">| The Benefit</p>
            <p className="py-5 text-3xl font-semibold md:text-5xl">
              Not just a Pet, but We Give You A Best Friend
            </p>
            <p className="text-xs">
              {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
              quod maxime? Aliquid ut saepe eveniet asperiores maiores quaerat
              labore corporis? */}
            </p>
            <ul className="py-5 text-sm">
              <li className="flex gap-2 pt-2 md:items-center">
                <BsCheckLg className="text-md text-main-yellow" />
                Work professionally and quickly
              </li>
              {/* <li className="flex gap-2 pt-2 md:items-center">
                <BsCheckLg className="text-md text-main-yellow" />
                If you don't win, we don't take money
              </li> */}
              <li className="flex gap-2 pt-2 md:items-center">
                <BsCheckLg className="text-md text-main-yellow" />
                Warning of updated legal risks for customers
              </li>
              {/* <li className="flex gap-2 pt-2 md:items-center">
                <BsCheckLg className="text-md text-main-yellow" />
                Excepteur sint occaecat cupidatat non proident
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
