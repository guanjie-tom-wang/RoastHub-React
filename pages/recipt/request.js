import axios from "axios";
import qs from "querystring";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8080",
  timeout: 5000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

instance.interceptors.request.use(
  (config) => {
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          console.log("Unauthorized: You are not authenticated.");
          break;
        case 402:
          console.log("Payment Required: Payment is needed for access.");
          break;
        case 403:
          console.log("Forbidden: Access is forbidden.");
          break;
        case 404:
          console.log("Not Found: The requested resource was not found.");
          break;
        case 500:
          console.log("Internal Server Error: Server encountered an error.");
          break;
        case 501:
          console.log(
            "Not Implemented: The server does not support the functionality."
          );
          break;
        case 502:
          console.log("Bad Gateway: The server received an invalid response.");
          break;
        case 503:
          console.log(
            "Service Unavailable: The service is temporarily unavailable."
          );
          break;
        // Add more cases for other status codes as needed
        default:
          console.log("Unhandled error. Status code: " + status);
          break;
      }
    } else {
      console.error("Network error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
