import axios from "axios";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://whispr-omega.vercel.app";

const BYPASS_HEADER = "x-vercel-protection-bypass";
const BYPASS_HEADER_ALT = "vercel-automation-bypass-secret";
const BYPASS_HEADER_ALT_UPPER = "VERCEL-AUTOMATION-BYPASS-SECRET";

const bypassSecret = process.env.NEXT_PUBLIC_VERCEL_AUTOMATION_BYPASS_SECRET;

export const apiUrl = (path) => {
  const base = API_BASE;
  const p = path ? (String(path).startsWith("/") ? path : `/${path}`) : "";
  return `${base}${p}`;
};

export const apiClient = axios.create();

if (bypassSecret) {
  apiClient.interceptors.request.use((config) => {
    const nextConfig = { ...config };
    nextConfig.headers = {
      ...nextConfig.headers,
      [BYPASS_HEADER]: bypassSecret,
      [BYPASS_HEADER_ALT]: bypassSecret,
      [BYPASS_HEADER_ALT_UPPER]: bypassSecret,
    };

    return nextConfig;
  });
}

export const withBypassHeaders = (headers = {}) => {
  if (!bypassSecret) {
    return { ...headers };
  }

  return {
    ...headers,
    [BYPASS_HEADER]: bypassSecret,
    [BYPASS_HEADER_ALT]: bypassSecret,
    [BYPASS_HEADER_ALT_UPPER]: bypassSecret,
  };
};
