export const axios_defaults_baseURL =
  process.env.NODE_ENV === "production"
    ? "http://murrengan.ru"
    : "http://127.0.0.1:8000";
export const axios_defaults_baseFrontURL =
  process.env.NODE_ENV === "production"
    ? "http://murrengan.ru"
    : "http://127.0.0.1:8080";
