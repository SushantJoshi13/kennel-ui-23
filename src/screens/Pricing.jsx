import { useEffect, useState } from "react";
import CostService from "../service/cost.service";
import { getApi } from "../service/axios.service";
import axios from "axios";

export const Pricing = () => {
  const [costs, setCosts] = useState([]);
  const [conversions, setConversions] = useState();
  const [ipDetails, setDetails] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getCosts();
    getIpDetails();
    getConversions();
  }, []);

  const getConversions = async () => {
    const data = await axios.get(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json",
      true
    );
    if (data.status === 200) {
      setConversions(data.data["inr"]);
    }

    setLoading(false);
  };
  const getIpDetails = async () => {
    const data = await getApi(
      "http://ip-api.com/json?fields=status,country,currency",
      true
    );
    if (data.status === 200) {
      setDetails(data.data);
    } else {
      setDetails({
        status: "success",
        country: "India",
        currency: "INR",
      });
    }
  };
  const getCosts = async () => {
    const service = new CostService();
    const data = await service.getCosts();
    setCosts(data.data.data);
  };

  return (
    <div className="min-h-[90vh]">
      <div className="mt-10 p-5 md:p-10">
        <h3 className="text-center text-3xl font-bold">Our Pricing</h3>
        {loading ? (
          <div className="flex h-[90vh] w-full items-center justify-center">
            <span className="loader self-center"></span>
          </div>
        ) : (
          <div className="container mx-auto px-4 sm:px-8">
            <div className="py-2">
              <div className="-mx-4 hidden overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8 md:block">
                <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="bg-gray-100 border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                          Form
                        </th>
                        <th className="bg-gray-100 border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                          Price
                        </th>
                        <th className="bg-gray-100 border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                          Tax
                        </th>
                        <th className="bg-gray-100 border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                          Delivery Fee
                        </th>
                        <th className="bg-gray-100 border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {costs.map((c, i) => {
                        return (
                          <tr key={i}>
                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <div className="flex">
                                <div className="ml-3">
                                  <p className="whitespace-no-wrap text-gray-900">
                                    {c.name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <p className="whitespace-no-wrap text-gray-900">
                                {Math.floor(
                                  c.amount *
                                    conversions?.[
                                      ipDetails?.currency?.toLowerCase()
                                    ]
                                ) ?? c.amount}
                              </p>
                              <p className="whitespace-no-wrap text-gray-600">
                                {ipDetails?.currency}
                              </p>
                            </td>
                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <p className="whitespace-no-wrap text-gray-600">
                                {c.tax} %
                              </p>
                            </td>
                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <p className="whitespace-no-wrap text-gray-600">
                                ₹ {c.delivery_fee}
                              </p>
                            </td>
                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <p className="whitespace-no-wrap text-gray-600">
                                {c.description}
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="block md:hidden">
                {costs.map((c) => {
                  return (
                    <div
                      key={c.name}
                      className="my-3 rounded-md p-3  shadow-lg"
                    >
                      <p className="text-sm font-semibold">{c.name}</p>
                      <p className="my-2 text-xs">{c.description}</p>
                      <div className="my-2 grid grid-cols-2 items-center text-sm">
                        <p className="col-span-1">Amount</p>
                        <p className="col-span-1 font-semibold">₹ {c.amount}</p>
                      </div>
                      <div className="my-2 grid grid-cols-2 items-center text-sm">
                        <p className="col-span-1">Tax</p>
                        <p className="col-span-1 font-semibold">{c.tax} %</p>
                      </div>
                      <div className="my-2 grid grid-cols-2 items-center text-sm">
                        <p className="col-span-1">Delivery Fee</p>
                        <p className="col-span-1 font-semibold">
                          ₹ {c.delivery_fee}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
