import axios from "axios";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://whispr-739339ng3-marsnunezs-projects.vercel.app";

const BYPASS_HEADER = "x-vercel-protection-bypass";
const bypassSecret = process.env.NEXT_PUBLIC_VERCEL_AUTOMATION_BYPASS_SECRET;

export const apiUrl = (path) => {
  if (!path) return API_BASE;
  const p = String(path).startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${p}`;
};

export const apiClient = axios.create();

if (bypassSecret) {
  apiClient.defaults.headers.common[BYPASS_HEADER] = bypassSecret;
}

export const withBypassHeaders = (headers = {}) => {
  if (!bypassSecret) {
    return { ...headers };
  }

  return {
    ...headers,
    [BYPASS_HEADER]: bypassSecret,
  };
};
