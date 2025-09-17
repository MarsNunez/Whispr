export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://whispr-739339ng3-marsnunezs-projects.vercel.app";

export const apiUrl = (path) => {
  if (!path) return API_BASE;
  const p = String(path).startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${p}`;
};

