import axios from "axios";
import { appConstants } from "../constants";

export const baseUrl = process.env.REACT_APP_BASE_URL;

export const getToken = () => localStorage.getItem(appConstants.appToken);
export const setToken = (token) =>
  localStorage.setItem(appConstants.appToken, token);
export const removeToken = () => localStorage.removeItem(appConstants.appToken);

const setHeaders = (isAuthorized, incomingHeaders = {}) => {
  const token = getToken();
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...incomingHeaders,
  };
  if (isAuthorized) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const logout = () => {
  removeToken();
};

export const postApi = async (
  url,
  data,
  isAuthorized = true,
  customHeaders = {}
) => {
  const apiEndPoint = `${baseUrl}/${url}`;
  const headers = setHeaders(isAuthorized, customHeaders);

  try {
    const response = await axios.post(apiEndPoint, data, { headers });
    return await Promise.resolve({
      status: response.status,
      data: response.data,
    });
  } catch (error) {
    // if (error?.response?.status === 401) {
    //   logout();
    //   return null;
    // }
    return Promise.resolve({
      status: error?.response?.status,
      data: error?.response?.data,
    });
  }
};

export const getApi = async (
  url,
  useIncomingUrl = false,
  incomingHeaders = {},
  isAuthorized = true
) => {
  let apiEndPoint = "";
  if (!useIncomingUrl) {
    apiEndPoint = `${baseUrl}/${url}`;
  } else {
    apiEndPoint = url;
  }
  const headers = setHeaders(true, incomingHeaders);

  try {
    const response = await axios.get(apiEndPoint, { headers });
    return await Promise.resolve({
      status: response.status,
      data: response.data,
    });
  } catch (error) {
    // if (error?.response?.status === 401) {
    //   logout();
    //   return null;
    // }
    console.log("error", error);
    return Promise.resolve({
      status: error?.response?.status,
      data: error?.response?.data,
    });
  }
};

export const putApi = async (
  url,
  data,
  isAuthorized = true,
  customHeaders = {}
) => {
  const apiEndPoint = `${baseUrl}/${url}`;
  const headers = setHeaders(isAuthorized, customHeaders);

  try {
    const response = await axios.put(apiEndPoint, data, { headers });
    return await Promise.resolve({
      status: response.status,
      data: response.data,
    });
  } catch (error) {
    // if (error?.response?.status === 401) {
    //   logout();
    //   return null;
    // }
    return Promise.resolve({
      status: error?.response?.status,
      data: error?.response?.data,
    });
  }
};
