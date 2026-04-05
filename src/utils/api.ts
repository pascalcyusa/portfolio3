export const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
};

export const fetchProjects = async (options: { noCache?: boolean } = {}) => {
  try {
    const fetchOptions: RequestInit = options.noCache
      ? { cache: 'no-store' }
      : { next: { revalidate: 300 } };

    const res = await fetch(`${getApiUrl()}/projects`, fetchOptions);
    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const fetchResearch = async (options: { noCache?: boolean } = {}) => {
  try {
    const fetchOptions: RequestInit = options.noCache
      ? { cache: 'no-store' }
      : { next: { revalidate: 300 } };

    const res = await fetch(`${getApiUrl()}/research`, fetchOptions);
    if (!res.ok) {
      throw new Error(`Failed to fetch research: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching research:', error);
    return [];
  }
};
