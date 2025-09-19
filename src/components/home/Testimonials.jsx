import React, { useEffect, useState } from "react";
import TestimonialImg from "../../assets/Images/testimonial.png";
import Testimonial2 from "../../assets/Images/change-pet-name.png";
import LeftArrow from "../../icons/illustrations/LeftArrow";
import RightArrow from "../../icons/illustrations/RightArrow";

export const NEXT = "NEXT";
export const PREV = "PREV";

const items = [
  {
    image: TestimonialImg,
    comment:
      "lorem ipsumipsumi psum  psum psum psum psum psum psum psum psum psum psum psum psum psum psum psum psum psum psum ",
    author: "Random Random",
  },
  {
    image: Testimonial2,
    comment:
      "lo psum psum psum psum psum psum psum psum psum psum psum psum psum psum psum psum psum psum ",
    author: "Random Random2222",
  },
  {
    image: TestimonialImg,
    comment:
      "lorem ipsumipsumi psum  psum psum psum psum psum psum psum psum psum psum psum psum psum psum psum psum psum psum ",
    author: "Random Random111",
  },
];
const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, items.length]);
  return (
    <div className="bg-dark-blue">
      <div className="py-5">
        <div className="relative mx-5 md:mx-20">
          <div className="pb-6">
            <h1 className="text-center text-2xl font-bold text-white md:text-left md:text-4xl">
              Few of our <br /> valuable clients.
            </h1>
          </div>
          <div className="md:items-left flex flex-col items-center gap-16 md:flex-row">
            <img
              src={items[currentSlide].image}
              alt={items[currentSlide].comment}
              width={300}
              className="rounded-lg"
            />
            <div className="flex flex-col gap-4">
              <div>
                <img
                  src={require("../../assets/Images/Quote.png")}
                  alt=""
                  width={80}
                />
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">
                  {items[currentSlide].comment}
                </p>
                <h1 className="text-2xl font-bold text-light-yellow">
                  {items[currentSlide].author}
                </h1>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-black p-4 hover:bg-[#3E3D3D] "
                  onClick={handlePrevSlide}
                >
                  <LeftArrow />
                </button>
                <button
                  className={`bg-black p-4 hover:bg-[#3E3D3D]`}
                  onClick={handleNextSlide}
                >
                  <RightArrow />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
