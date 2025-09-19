import React from "react";
import logo from "../../assets/Logos/latest_logo.png";
import { Link } from "react-router-dom";
import { MdEmail, MdLocationOn, MdWhatsapp } from "react-icons/md";
class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="h-full w-full bg-main-yellow py-5">
          <div className="flex flex-col items-center justify-center gap-5 ">
            <div>
              <img
                src={logo}
                alt=""
                width={100}
                // style={{ filter: "grayscale(1) invert(1) brightness(0.5)" }}
              />
            </div>
            <div className="">
              <ul className="flex flex-col items-center justify-center gap-0 px-10 md:flex-row md:gap-20">
                <Link to="/terms" className="font-medium text-dark-blue">
                  Terms and Conditions
                </Link>
                <Link to="/about" className="font-medium text-dark-blue">
                  About Us
                </Link>
                <Link to="/contact-us" className="font-medium text-dark-blue">
                  Contact Us
                </Link>
                <Link to="/subscription" className="font-medium text-dark-blue">
                  Membership
                </Link>
                <Link to="/services" className="font-medium text-dark-blue">
                  Services
                </Link>
              </ul>
            </div>
            <div className="flex flex-col items-center gap-5 px-4 md:px-10 lg:flex-row">
              <a href="mailto:genuinebreederassociation@gmail.com">
                <p className="flex cursor-pointer items-center text-xs text-white md:text-base">
                  <MdEmail className="text-2xl xs:text-base" />
                  genuinebreederassociation@gmail.com
                </p>
              </a>
              <a href="https://wa.me/+918956643978">
                <p className="flex cursor-pointer items-center text-xs text-white md:text-base">
                  <MdWhatsapp className="text-2xl xs:text-base" />
                  +91 89566 43978
                </p>
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="http://maps.google.com/?q=M6MH+9R, Nimgaon Mhalungi, Maharashtra"
              >
                <p className="flex cursor-pointer items-center text-center text-xs text-white md:text-base">
                  <MdLocationOn className="text-3xl xs:text-base" />
                  Sr no, 12/1, B RAMLILA, LANE NO 3, Adarsh Nagar, Wadgaon
                  Sheri, Pune, Maharashtra 411014
                </p>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;
