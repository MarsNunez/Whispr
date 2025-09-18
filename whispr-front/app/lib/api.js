import axios from "axios";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://whispr-739339ng3-marsnunezs-projects.vercel.app";

const BYPASS_HEADER = "x-vercel-protection-bypass";
const BYPASS_HEADER_ALT = "vercel-automation-bypass-secret";
const BYPASS_HEADER_ALT_UPPER = "VERCEL-AUTOMATION-BYPASS-SECRET";
const BYPASS_QUERY_KEY = "vercel-automation-bypass-secret";

const bypassSecret = process.env.NEXT_PUBLIC_VERCEL_AUTOMATION_BYPASS_SECRET;

export const apiUrl = (path) => {
  const base = API_BASE;
  const p = path ? (String(path).startsWith("/") ? path : `/${path}`) : "";
  const url = new URL(`${base}${p}`);

  if (bypassSecret && !url.searchParams.has(BYPASS_QUERY_KEY)) {
    url.searchParams.set(BYPASS_QUERY_KEY, bypassSecret);
  }

  return url.toString();
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

    const params = { ...(nextConfig.params || {}) };
    if (params[BYPASS_QUERY_KEY] === undefined) {
      params[BYPASS_QUERY_KEY] = bypassSecret;
    }
    nextConfig.params = params;
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
