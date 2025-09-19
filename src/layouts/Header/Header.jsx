import React, { Fragment, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import logo1 from "../../assets/Logos/latest_logo.png";
import { DropDownMenu } from "../../components/dropdown/DropDownMenu";
import useAuth from "../../context/userContext";
import { GiHamburgerMenu } from "react-icons/gi";
import useDebounce from "../../hooks/useDebounce";
import { useSubmitForm } from "../../hooks/useSubmitForm";
import { Menu, Transition } from "@headlessui/react";

const Header = (props) => {
  const nav = useNavigate();
  const [isNav, setVisible] = useState(false);
  const [searchParams, setSearchParams] = useState("");
  const [searchResponse, setSearchResponse] = useState([]);
  const { submit } = useSubmitForm();
  const { hideBar } = props;
  const getAnimalAndOwner = async (query) => {
    const res = await submit(
      "GET",
      `animal/getAnimalAndOwner?animal_microchip_id=${query}`,
      {}
    );
    if (res.data?.statusCode === 200 || res.status === 200) {
      setSearchResponse(res.data?.data);
    }
  };
  useDebounce(() => getAnimalAndOwner(searchParams), 1000, [searchParams]);
  const { isLoggedIn, user, signOut, isSubscribed, loading } = useAuth();

  return (
    <div className="relative bg-main-yellow shadow-lg md:h-[20vh]">
      <div className="mx-5 block">
        <header className="sticky top-0 z-50 w-full bg-main-yellow">
          <div className="px- flex flex-col  items-center justify-between py-2 sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex w-full items-center justify-between">
              <div>
                <Link to="/" className="text-gray-800">
                  <img
                    alt="logo"
                    src={logo1}
                    className="h-[10vh] rounded-lg object-center md:h-[15vh] "
                    // style={{ filter: "grayscale(1) invert(1) brightness(0.5)" }}
                  />
                </Link>
              </div>
              <div className="hidden w-2/5 gap-5 md:flex md:w-2/5">
                {isLoggedIn && (
                  <div className="flex w-full flex-col items-center ">
                    <div className="flex w-full space-x-1">
                      <input
                        type="search"
                        className="block w-full rounded-full border-2 border-slate-300 bg-white px-4 py-2 text-black focus:border-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-40"
                        placeholder="Enter microchip number"
                        onChange={(e) => setSearchParams(e.target.value)}
                      />
                      <button className="rounded-full bg-main-yellow px-3 text-white ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div>
                      {searchResponse && searchResponse.length > 0 && searchParams.length ? (
                        <Menu>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                            show={searchParams.length > 2}
                          >
                            <Menu.Items
                              open
                              className="absolute right-0 z-50 mt-2 w-2/5 origin-top-right divide-y divide-gray-100 rounded-md bg-white p-3 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              {searchResponse?.map((a, i) => {
                                return (
                                  <Menu.Item key={i}>
                                    <div className="my-2">
                                      <p>Animal Name: {a.animal_name}</p>
                                      <p>
                                        Owner Name:{" "}
                                        {a.animal_owner_id.user_name}
                                      </p>
                                      <p>
                                        Contact:{" "}
                                        {a.animal_owner_id.contact_no}
                                      </p>
                                    </div>
                                  </Menu.Item>
                                );
                              })}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      ) : searchResponse.length === 0 ? (
                        <>
                          {searchParams.length > 1 && (
                            <Menu>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                                show={searchResponse !== null}
                              >
                                <Menu.Items
                                  open
                                  className="absolute right-0 z-50 mt-2 w-2/5 origin-top-right divide-y divide-gray-100 rounded-md bg-white p-3 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >
                                  <div className="px-1 py-1 ">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <div className="flex flex-col">
                                          <span>No Results</span>
                                        </div>
                                      )}
                                    </Menu.Item>
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          )}
                        </>
                      ) : (
                        <Menu>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                            show={
                              searchResponse === null && searchParams.length > 2
                            }
                          >
                            <Menu.Items
                              open
                              className="absolute right-0 z-50 mt-2 w-2/5 origin-top-right divide-y divide-gray-100 rounded-md bg-white p-3 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <div className="px-1 py-1 ">
                                <Menu.Item>
                                  {({ active }) => (
                                    <div className="flex flex-col">
                                      <span>No Results</span>
                                    </div>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div
                className="text-3xl md:hidden"
                onClick={() => setVisible(!isNav)}
              >
                <GiHamburgerMenu />
              </div>
            </div>
            {!hideBar ? (
              <div className="relative top-[15vh] hidden w-10/12 rounded-xl bg-white p-4 px-5 shadow-lg md:absolute md:flex lg:w-8/12">
                <div className="hidden w-full justify-between space-y-4 sm:items-center sm:space-y-0 md:flex">
                  <Link to="/about" className="header-buttons">
                    About Us
                  </Link>
                  <Link to="/pricing" className="header-buttons">
                    Pricing
                  </Link>
                  {isSubscribed ? null : (
                    <Link to="/subscription" className="header-buttons">
                      Membership
                    </Link>
                  )}
                  <Link to="/services" className="header-buttons">
                    Services
                  </Link>

                  <Link to="/contact-us" className="header-buttons">
                    Contact Us
                  </Link>
                  {!isLoggedIn ? (
                    <>
                      <Link
                        to="/register"
                        className="header-login-register border-2 border-transparent text-black"
                      >
                        Register
                      </Link>
                      <Link
                        to="/login"
                        className="header-login-register border-2 border-transparent text-black"
                      >
                        Login
                      </Link>{" "}
                    </>
                  ) : (
                    <>
                      {!loading && (
                        <DropDownMenu
                          icon={
                            <div className="flex flex-row-reverse items-center justify-end gap-2">
                              <img
                                src={logo1}
                                alt="icon for user"
                                width={40}
                              />

                              <div className="flex flex-col">
                                <h2 className="text-sm font-medium text-black">
                                  {user?.user_name ?? "NA"}
                                </h2>
                                {!loading && user.user_status !== 1 && (
                                  <span
                                    className="rounded-lg bg-red-400 px-3 py-2 text-white"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    Profile Not Verified
                                  </span>
                                )}
                              </div>
                            </div>
                          }
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </header>
        <div
          className={`${
            isNav ? "left-0" : "-left-[100%]"
          } fixed top-0 z-[999] block h-[100vh]  w-full items-end justify-end bg-primary p-[30px] transition-all duration-700 md:hidden`}
        >
          <div
            className="absolute right-[20px] top-[20px] z-[999] cursor-pointer"
            onClick={() => setVisible(!isNav)}
          >
            <RxCross1 className="mr-1 text-white" />
          </div>
          <ul className=" text-secondary" onClick={() => setVisible(!isNav)}>
            {isLoggedIn ? (
              <>
                <div
                  className="mb-4 ml-0 flex cursor-pointer flex-row items-center justify-start gap-2"
                  onClick={() => setVisible(!isNav)}
                >
                  <img
                    src={logo1}
                    alt="icon for user"
                    width={40}
                    className="bg-white rounded"
                  />
                  <h2 className="text-sm font-medium text-white">
                    {user?.user_name ?? "NA"}
                  </h2>
                </div>
                <li
                  className="cursor-pointer pb-4 pl-1"
                  onClick={() => nav("/profile")}
                >
                  Profile
                </li>
                <li
                  className="cursor-pointer pb-4 pl-1"
                  onClick={() => nav("/userAnimals")}
                >
                  Animals Added
                </li>
              </>
            ) : null}

            <li className="cursor-pointer pb-4 pl-1" onClick={() => nav("/")}>
              Home
            </li>
            <li
              className="cursor-pointer pb-4 pl-1"
              onClick={() => nav("/search")}
            >
              Search
            </li>
            <li
              className="cursor-pointer pb-4 pl-1"
              onClick={() => nav("/services")}
            >
              Services
            </li>
            <li
              className="cursor-pointer pb-4 pl-1"
              onClick={() => nav("/pricing")}
            >
              Pricing
            </li>
            {isSubscribed ? null : (
              <li
                className="cursor-pointer pb-4 pl-1"
                onClick={() => nav("/subscription")}
              >
                Membership
              </li>
            )}

            <li
              className="cursor-pointer pb-4 pl-1"
              onClick={() => nav("/about")}
            >
              About Us
            </li>
            <li
              className="cursor-pointer pb-4 pl-1"
              onClick={() => nav("/contact-us")}
            >
              Contact Us
            </li>
            {isLoggedIn ? (
              <li
                className="cursor-pointer pb-4 pl-1"
                onClick={() => signOut()}
              >
                Logout
              </li>
            ) : (
              <>
                <li
                  className="cursor-pointer pb-4 pl-1"
                  onClick={() => nav("/register")}
                >
                  Register
                </li>
                <li
                  className="cursor-pointer pb-4 pl-1"
                  onClick={() => nav("/login")}
                >
                  Login
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Header;
