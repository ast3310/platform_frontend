export const axios_defaults_baseURL =
  process.env.NODE_ENV === "production"
    ? "http://167.172.162.231"
    : "http://localhost:8000";
export const axios_defaults_baseFrontURL =
  process.env.NODE_ENV === "production"
    ? "http://167.172.162.231"
    : "http://localhost:8080";

export const websocket_url = 
  process.env.NODE_ENV === "production"
    ? "ws://167.172.162.231"
    : "ws://localhost:8080";