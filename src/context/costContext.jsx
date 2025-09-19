// Cost context

import React, { useContext, createContext, useState } from "react";
import CostService from "../service/cost.service";

export const CostContext = createContext({ costs: [] });

export const CostContextProvider = async ({ children }) => {
  const [costs, setCosts] = useState(null);
  const costService = new CostService();

  const allCosts = await costService.getCosts();
  setCosts(allCosts?.data.data);

  const value = {
    costs,
    setCosts,
  };

  return <CostContext.Provider value={value}>{children}</CostContext.Provider>;
};

export const useCost = () => {
  return useContext(CostContext);
};
