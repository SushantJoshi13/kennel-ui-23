import React from "react";
import heroImg from "../../assets/Images/breeders-bg.png";
import changePetName from "../../assets/Images/change-pet-name.png";
import TransferOwnerImg from "../../assets/Images/transfer-oenwership.png";
import womenAndPet from "../../assets/Images/women-and-pet.png";
import CategoryCard from "../cards/CategoryCard";
import About from "./About";
import ContactSection from "./ContactSection";
import { useNavigate } from "react-router";

const Hero = () => {
  const nav = useNavigate();
  return (
    <section className="relative ">
      <div
        className="relative h-[50vh] bg-cover bg-no-repeat p-6 text-center md:h-[641px] md:bg-cover md:p-12"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-fixed backdrop-brightness-[40%]"></div>
      </div>
      <div className="">
        <div className="flex items-center  ">
          <div className="absolute top-0 mx-20 flex flex-col gap-4 sm:top-5 md:top-28">
            <div>
              <h1
                className="text-center text-4xl font-bold text-white sm:text-left md:text-7xl "
                style={{
                  fontFamily: "cursive",
                }}
              >
                Your pet, <br /> our priority
              </h1>
            </div>
            <div className="flex justify-center sm:block">
              <button className="rounded-lg bg-main-yellow px-5 py-3 text-white transition-all duration-300 hover:bg-secondary">
                Get Started
              </button>
            </div>
          </div>
        </div>
        <section className="mx-5 md:mx-20">
          <div className="relative -top-[100px] flex flex-col gap-11 md:flex-row">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              <div className="card group transform rounded-lg rounded-bl-lg bg-white p-7 shadow-lg duration-300 hover:bg-main-yellow hover:text-white">
                <h1 className="pb-4 text-lg font-medium">
                  Animal Registration
                </h1>
                <p className="pb-5">
                  Genuine Breeder Association is a 1 st Organization who
                  register all types Domestic animals under a same platform for
                  reference to improve breed standard .
                </p>
                <button
                  onClick={() => nav("/animal-registration")}
                  className="text-lg font-medium text-main-yellow group-hover:text-white"
                >
                  Read More
                </button>
              </div>
              <div className="card group transform rounded-lg bg-white p-7 shadow-lg duration-300 hover:bg-main-yellow hover:text-white">
                <h1 className="pb-4 text-lg font-medium">Legal Business</h1>
                <p className="pb-5">
                  Genuine Breeder Association is promote domestic animal
                  breeding business by guide to breeder by education.
                </p>
                <button className="text-lg font-medium text-main-yellow group-hover:text-white">
                  Read More
                </button>
              </div>
              <div className="card group transform rounded-lg rounded-br-lg bg-white p-7 shadow-lg duration-300 hover:bg-main-yellow hover:text-white">
                <h1 className="pb-4 text-lg font-medium">Education</h1>
                <p className="pb-5">
                  Genuine Breeder Association Start regularly basis education
                  Program for Professional and Pet Parents too.
                </p>
                <button
                  onClick={() => nav("/education")}
                  className="text-lg font-medium text-main-yellow group-hover:text-white"
                >
                  Read More
                </button>
              </div>
              <div className="card group transform rounded-lg rounded-br-lg bg-white p-7 shadow-lg duration-300 hover:bg-main-yellow hover:text-white">
                <h1 className="pb-4 text-lg font-medium">Shows</h1>
                <p className="pb-5">
                  Genuine Breeder Association start Breed Shows, Alights Show,
                  Obedience show, Progeny show for improving Breed standard and
                  develop interest in animals.
                </p>
                <button className="text-lg font-medium text-main-yellow group-hover:text-white">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="my-8">
          <About />
        </section>
        {/* CATRGORY BANNER  */}
        <section className="mx-5 md:mx-20">
          <div className="my-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            <CategoryCard
              image={womenAndPet}
              text={"Add Animal"}
              nav={"/add-animal"}
            />
            <CategoryCard
              image={TransferOwnerImg}
              text={"Transfer Ownership"}
              nav={"/transfer-owner"}
            />
            <CategoryCard
              image={changePetName}
              text={"Change Pet Name"}
              nav={"/change-name"}
            />
            {/* <CategoryCard
              image={TransferOwnerImg}
              text={"Export Pedigree"}
              nav={"/"}
            /> */}
          </div>
        </section>

        {/* CONTACT US  */}
        <ContactSection />
        {/* <section className="">
          <Testimonials />
        </section> */}
        {/* <NewFooter /> */}
      </div>
    </section>
  );
};

export default Hero;
