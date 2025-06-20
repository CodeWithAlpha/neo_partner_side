import axios from "axios";
import { END_POINTS } from "./EndPoints";
import { showToast } from "../utils/Toast";

// Create axios instance
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach default headers
const attachAuthHeaders = () => {
  const token =
    localStorage.getItem("temp_token") ||
    localStorage.getItem("neo_partner_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    if (response.config.method == "post") {
      showToast.success(response.data.message);
    }
    return response;
  },
  async (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          showToast.error(error.response.data.message);
          break;
        case 401:
          localStorage.removeItem("neo_partner_token");
          // window.location.reload();
          showToast.error(error.response.data.message);
          break;
        case 404:
          showToast.error(error.response.data.message);
          break;
        case 415:
          showToast.error(error.response.data.detail);
          break;
        case 422:
          showToast.error(error.response.data.detail);
          break;
        case 429:
          showToast.error(error.response.data.message);
          break;
        case 500:
          console.error("Internal server error");
          break;
        default:
          console.error("Unknown error");
      }
    } else if (error.request) {
      console.error("No response received from the server");
    } else {
      console.error("Request error:", error.message);
    }

    return Promise.reject(error.response);
  }
);

// Fetcher object
const fetcher = {
  async request(
    method: string,
    endpoint: string,
    data: any = null,
    params: any = null,
    isFile = false
  ) {
    const headers: any = attachAuthHeaders();
    if (isFile) headers["Content-Type"] = "multipart/form-data";

    try {
      const response = await apiClient.request({
        method,
        url: endpoint,
        data,
        params,
        headers,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  get(endpoint: string, params = null) {
    return this.request("get", endpoint, null, params);
  },

  post(endpoint: string, data: any) {
    return this.request("post", endpoint, data);
  },

  patch(endpoint: string, data: any = null) {
    return this.request("patch", endpoint, data);
  },

  delete(endpoint: string) {
    return this.request("delete", endpoint);
  },

  put(endpoint: string, data: any) {
    return this.request("put", endpoint, data);
  },

  postFile(endpoint: string, formData: FormData) {
    return this.request("post", endpoint, formData, null, true);
  },

  putFile(endpoint: string, formData: FormData) {
    return this.request("put", endpoint, formData, null, true);
  },
};

export default fetcher;
