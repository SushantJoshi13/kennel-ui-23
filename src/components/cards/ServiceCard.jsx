import React from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { FaPaw } from "react-icons/fa";
import { useNavigate } from "react-router";

const ServiceCard = ({ title, redirect, text }) => {
  const nav = useNavigate();
  return (
    <div
      className="p-5 shadow-xl rounded-xl cursor-pointer hover:scale-[105%] duration-300"
      onClick={() => nav(redirect)}
    >
      <FaPaw className="text-white bg-main-yellow text-4xl p-2 rounded-full mx-auto my-2" />
      <p className="text-main-yellow text-xl text-center p-2 font-semibold">
        {title}
      </p>
      <p className="text-center text-xs py-2">{text}</p>
      <div className="flex items-center justify-center gap-2">
        <p className="text-center text-main-yellow text-xs py-2">Learn More</p>
        <BsArrowRightCircleFill className="text-xs text-main-yellow" />
      </div>
    </div>
  );
};

export default ServiceCard;
