import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../service/axios.service";
import useAuth from "../context/userContext";

function RequireAuth({ children }) {
  let token = getToken();
  let location = useLocation();

  // useEffect(() => {

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // }, [user, isLoggedIn, token]);

  return <>{children}</>;
}
export default RequireAuth;
