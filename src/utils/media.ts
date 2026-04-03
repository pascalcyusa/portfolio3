const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");
const isAbsoluteUrl = (value: string) => /^(https?:)?\/\//i.test(value);

export const getMediaBaseUrl = () => {
  const value = process.env.NEXT_PUBLIC_MEDIA_BASE_URL || "https://storage.googleapis.com/portfolio3-images-bucket";
  return trimTrailingSlash(value);
};

export const toMediaUrl = (path: string) => {
  if (!path || isAbsoluteUrl(path)) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const base = getMediaBaseUrl();
  return `${base}${normalizedPath}`;
};
