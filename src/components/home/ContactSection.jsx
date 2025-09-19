import React from "react";

const ContactSection = () => {
  return (
    <div className="relative bg-gray bg-no-repeat py-12 text-center">
      <div className="h-full w-full bg-fixed backdrop-blur-md">
        <div className="">
          <div className="text-white">
            <p className="break-words font-semibold text-primary md:text-xl">
              Let's Care For Each Other
            </p>

            <p className="mx-5 my-10 break-words text-2xl font-semibold text-primary md:mx-20 md:text-5xl">
              Contact Us
            </p>
            <p className="mx-auto my-5 w-4/5 text-center text-sm text-black md:w-1/2 md:text-lg"></p>
            <a
              href="https://wa.me/+918956643978"
              className="rounded-lg bg-main-yellow px-5 py-3 font-bold text-white transition-all duration-300 hover:bg-secondary "
            >
              +91 89566 43978
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
