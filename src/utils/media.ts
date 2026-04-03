const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const getMediaBaseUrl = () => {
  const value = process.env.NEXT_PUBLIC_MEDIA_BASE_URL || "https://storage.googleapis.com/portfolio3-images-bucket";
  return trimTrailingSlash(value);
};

export const toMediaUrl = (path: string) => {
  const base = getMediaBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (!base) return normalizedPath;
  return `${base}${normalizedPath}`;
};
