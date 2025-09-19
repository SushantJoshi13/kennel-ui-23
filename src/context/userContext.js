import { createContext, useState, useContext, useEffect } from "react";
import { getToken } from "../service/axios.service";
import { useCookies } from "react-cookie";
import { appConstants } from "../constants";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [breeder, setBreeder] = useState();
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const signIn = (userData) => {
    setLoading(true);
    setUser(userData?.data);
    if (userData.data.breederDetails) {
      setBreeder(userData.data.breederDetails);
    }
    if (userData?.data?.subscription.length > 0) {
      setIsSubscribed(true);
    }
    localStorage.setItem(appConstants.appToken, userData?.token);
    localStorage.setItem(appConstants.appUserId, userData?.data?.id);
    localStorage.setItem(
      appConstants.appUserRole,
      userData?.data?.user_role_id.role_id
    );
    // Create cookie
    setCookie("token", userData?.token, {
      path: "/",
      maxAge: 24 * 60 * 60, // 1 day
    });

    setLoggedIn(true);
    setLoading(false);
  };
  const signBreeder = (data) => {
    setBreeder(data);
  };
  const signOut = () => {
    setUser(null);
    localStorage.clear();

    removeCookie("token");

    setLoggedIn(false);
    setLoading(false);
    window.location.href = "/login";
  };

  const value = {
    user,
    isLoggedIn,
    loading,
    signIn,
    signOut,
    setUser,
    signBreeder,
    breeder,
    setIsSubscribed,
    isSubscribed,
    setLoading,
  };

  useEffect(() => {
    const token = getToken();
    if (!token || token === null) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useAuth = () => {
  return useContext(UserContext);
};

export default useAuth;
