const isDevelopment = process.env.NODE_ENV === "development";

const API_BASE_URL = isDevelopment
  ? "http://localhost:8000" // Development base URL
  : "https://api.layoffhub.ai"; // Production base URL

export { API_BASE_URL };
