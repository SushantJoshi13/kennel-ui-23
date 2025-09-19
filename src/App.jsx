import { RouterProvider } from "react-router-dom";
import "./App.css";

import { TreeContextProvider } from "./context/TreeContext";

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { animalAtom } from "./recoil/atom/animalAtom";
import { getApi, getToken } from "./service/axios.service";

import { ToastContainer } from "react-toastify";
import { PaymentContextProvider } from "./context/PaymentContext";
import useAuth from "./context/userContext";
import { useFetchUser } from "./hooks/useFetchUser";
import { appRouter } from "./routes/routes";

function App() {
  const setAnimals = useSetRecoilState(animalAtom);

  const { setLoading } = useAuth();
  const user_id = window.localStorage.getItem("user_id");
  const fetchUser = useFetchUser();
  const getAllAnimalTypes = async () => {
    const response = await getApi("animalMaster");
    if (response?.status === 200) {
      setAnimals(response?.data?.data);
    }
  };

  const token = getToken();
  useEffect(() => {
    if (token) {
      getAllAnimalTypes();
      fetchUser(user_id);
      return;
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <TreeContextProvider>
      <PaymentContextProvider>
        <RouterProvider router={appRouter} />
      </PaymentContextProvider>
      <ToastContainer />
    </TreeContextProvider>
  );
}

export default App;
