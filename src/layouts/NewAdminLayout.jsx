import React, { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import { Link } from "react-router-dom";
import logo1 from "../assets/Logos/NewLogo.png";
import useAuth from "../context/userContext";
import { adminRoutes } from "../routes/routes";

const NewAdminLayout = () => {
  const [open, setOpen] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-12">
      <div className="col-span-2 hidden md:block">
        <Sidebar />
      </div>
      <div className="col-span-full overflow-y-scroll md:col-span-10">
        <div className="sticky top-0">
          <Navbar
            setMenuOpen={setOpen}
            setMobileMenu={setMobileMenu}
            open={open}
            mobileMenu={mobileMenu}
          />
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ setMobileMenu, mobileMenu }) => {
  const location = useLocation();
  const pathLabel = useMemo(() => {
    const route = adminRoutes.find((p) => p.path === location.pathname);
    return route?.label ?? "Details";
  }, [location.pathname]);
  return (
    <nav className="w-full border-gray-200 bg-primary px-10 py-2.5">
      <div className="container mx-auto flex h-[50px] items-center justify-between md:justify-end">
        <div className="block pt-2 md:hidden">
          <HamburgerButton
            setMobileMenu={setMobileMenu}
            mobileMenu={mobileMenu}
          />
        </div>
        <UserMenu />
      </div>
      <div
        className={`${
          mobileMenu ? "flex" : "hidden"
        } absolute left-6 right-6 top-4 z-50 mt-16 flex-col items-center space-y-6 self-end rounded-xl bg-slate-900 py-8 font-bold  drop-shadow dark:bg-slate-800 dark:text-white sm:w-auto md:hidden`}
      >
        {adminRoutes.map((menu, index) => {
          if (!menu.showInSideBar) return null;
          return (
            <Link
              to={menu.path}
              key={index}
              onClick={() => setMobileMenu(false)}
            >
              <span
                className={` ${
                  location.pathname === menu.path &&
                  "bg-gray-200 dark:bg-gray-700"
                } hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl p-2 text-white`}
              >
                {menu.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
function UserMenu() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const nav = useNavigate();
  const { signOut } = useAuth();
  return (
    <div className="relative ml-3">
      <div>
        <button
          className="flex rounded-full border-2 border-transparent text-sm transition duration-150 ease-in-out focus:border-white focus:outline-none"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img
            alt="user"
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
        </button>
      </div>
      <div
        className={`absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg transition ease-${
          dropdownOpen ? "out" : "in"
        } duration-${dropdownOpen ? "100" : "75"} transform opacity-${
          dropdownOpen ? "100" : "0"
        } scale-${dropdownOpen ? "100" : "95"}`}
      >
        {dropdownOpen ? (
          <div
            className="shadow-xs rounded-md bg-white py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            {/* <a
              href="/profile"
              className="hover:bg-gray-100 focus:bg-gray-100 block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out focus:outline-none"
              role="menuitem"
            >
              Your Profile
            </a> */}
            <p
              className="hover:bg-gray-100 focus:bg-gray-100 block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out focus:outline-none"
              role="menuitem"
              onClick={() => {
                signOut();
                nav("/login", { replace: true });
              }}
            >
              Sign out
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const Sidebar = ({ open, setMenuOpen, mobileMenu, setMobileMenu }) => {
  const location = useLocation();
  return (
    <>
      <div
        style={{ transitionProperty: "width" }}
        className={`relative hidden h-screen w-fit md:w-full flex-col items-center bg-primary p-5 transition-all duration-300 ease-in-out md:flex`}
      >
        <Link to="/admin-layout/dashboard">
          <div className={`flex ${open && "gap-x-4"} items-center`}>
            <img
              src={logo1}
              alt="logo1"
              className="h-[8vh] rounded-lg object-center pl-2"
            />
          </div>
        </Link>

        <ul className="pt-6">
          {adminRoutes.map((menu, index) => {
            if (!menu.showInSideBar) return null;
            const path = `/admin-layout/${menu.path}`;
            return (
              <Link to={menu.path} key={index}>
                <li
                  style={
                    location.pathname === path ? { background: "#FFB803" } : {}
                  }
                  className={`flex cursor-pointer items-center gap-x-6 rounded-lg p-3 text-base font-normal transition-all hover:scale-105`}
                >
                  <span className="text-2xl text-white">{menu.icon}</span>
                  <span
                    className={`origin-left font-inter text-sm font-medium text-white duration-300 hover:block`}
                  >
                    {menu.label}
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      {/* Mobile Menu */}
    </>
  );
};
const HamburgerButton = ({ mobileMenu, setMobileMenu }) => {
  return (
    <button
      onClick={() => setMobileMenu(!mobileMenu)}
      className={`${
        mobileMenu ? "open" : ""
      } hamburger block focus:outline-none sm:hidden`}
    >
      <span className="hamburger-top bg-slate-50"></span>
      <span className="hamburger-middle bg-slate-50"></span>
      <span className="hamburger-bottom bg-slate-50"></span>
    </button>
  );
};
export default NewAdminLayout;
