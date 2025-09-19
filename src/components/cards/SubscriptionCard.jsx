import React from "react";

const SubscriptionCard = ({ image, title, description }) => {
  return (
    <div className="flex cursor-pointer flex-col items-center rounded-lg bg-white p-5 shadow-lg transition-all duration-500 hover:bg-main-yellow hover:text-white">
      <div>
        {/* <img src={image} alt="subscription" width={90} /> */}
        {image}
      </div>
      <div>
        <h1 className="text-center text-xl font-semibold">{title}</h1>
      </div>
      {/* <div className="text-lg">
        <p>{description}</p>
      </div> */}
    </div>
  );
};

export default SubscriptionCard;
