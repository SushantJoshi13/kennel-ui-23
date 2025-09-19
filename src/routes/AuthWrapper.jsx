import React, { useEffect, useState } from "react";
import useAuth from "../context/userContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { userRoles } from "../constants/app.constants";

function RoleCheckWrapper(props) {
  const { user, isLoggedIn } = useAuth();
  const nav = useNavigate();
  const [authorized, setAuthorized] = useState(true);
  useEffect(() => {
    if (isLoggedIn && user) {
      if (props.allowedRole.some((u) => u === user?.user_role_id?.role_name)) {
        setAuthorized(true);
      } else {
        // if (props.path !== "/") toast.error("Access denied!");
        if (user?.user_role_id?.role_name === userRoles[3]) {
          nav("/admin-layout/dashboard");
        } else {
          nav("/");
        }
      }
    }
  }, [props.allowedRole, user, isLoggedIn]);

  return <React.Fragment>{authorized ? props.children : null}</React.Fragment>;
}
export default RoleCheckWrapper;
