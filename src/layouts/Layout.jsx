import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import ScrollToTop from "../utils/ScrollToTop";
import useAuth from "../context/userContext";
const Layout = (props) => {
  const { loading, isLoggedIn } = useAuth();

  return (
    <div className="flex w-full flex-col font-poppins">
      <ScrollToTop />
      {isLoggedIn && loading ? (
        <div className="flex h-[90vh] w-full items-center justify-center">
          <span className="loader self-center"></span>
        </div>
      ) : (
        <>
          <Header hideBar={props.hideBar} />
          <div className="content relative">{props.children}</div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Layout;
