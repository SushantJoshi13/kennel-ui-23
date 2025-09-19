import { useState } from "react";
import { baseUrl } from "../service/axios.service";
import axios from "axios";
import { appConstants } from "../constants";

export const getToken = () => localStorage.getItem(appConstants.appToken);

export const useSubmitForm = () => {
  const [loading, setLoading] = useState(false);

  const setHeaders = (incomingHeaders = {}) => {
    const token = getToken();
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...incomingHeaders,
    };
    headers["Authorization"] = `Bearer ${token}`;
    return headers;
  };

  const submit = async (method, endpoint, data, customHeaders) => {
    setLoading(true);
    const headers = setHeaders(customHeaders);
    try {
      const response = await axios.request({
        method,
        url: `${baseUrl}/${endpoint}`,
        data,
        headers,
      });
      setLoading(false);
      return await Promise.resolve({
        status: response.status,
        data: response.data,
        isSuccess: true,
      });
    } catch (err) {
      setLoading(false);
      return Promise.resolve({
        status: err?.response?.status,
        data: err?.response?.data,
        isSuccess: false,
      });
    }
  };

  return {
    loading,
    submit,
  };
};
