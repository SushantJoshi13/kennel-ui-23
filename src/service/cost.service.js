import { getApi } from "./axios.service";

class CostService {
  getCostById = async (id) => {
    const res = await getApi(`master/getCost/${id}`);
    return res;
  };

  getCosts = async () => {
    const res = await getApi(`master/getAllCosts`);
    return res;
  };
}

export default CostService;
