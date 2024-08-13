import axios from "axios";

// Correctly format the base URL with the protocol
const baseURL = "http://localhost:8000/api/v1";
const api = axios.create({
  baseURL,
});

const apiHelper = async (
  endpoint,
  params = {},
  method = "GET",
  data = null,
  headers = {}
) => {
  try {
    const response = await api({
      method,
      url: endpoint,
      params,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Api handler Error", error);
    throw error;
  }
};

export default apiHelper;
