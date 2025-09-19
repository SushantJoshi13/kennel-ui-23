import React from "react";
import { useNavigate } from "react-router";

const CategoryCard = ({ image, text, nav }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-main-yellow flex flex-col justify-center items-center rounded-2xl shadow-lg cursor-pointer"
      onClick={() => navigate(nav)}
    >
      <div>
        <img src={image} alt="" className="rounded-2xl" />
      </div>
      <div className="py-7">
        <p className="text-white font-medium">{text}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
