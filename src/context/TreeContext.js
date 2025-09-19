import { createContext, useContext, useState } from "react";

const TreeContext = createContext({ tree: {}, register_certificate: "No" });

export const TreeContextProvider = ({ children }) => {
  const [tree, setTree] = useState({});
  const [register_certificate, setRegisterCertificate] = useState(true);

  let value = { tree, setTree, register_certificate, setRegisterCertificate };
  return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>;
};

export const useTreeContext = () => {
  return useContext(TreeContext);
};
