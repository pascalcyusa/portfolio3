export const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
};

export const fetchProjects = async () => {
  try {
    const res = await fetch(`${getApiUrl()}/projects`, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const fetchResearch = async () => {
  try {
    const res = await fetch(`${getApiUrl()}/research`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch research: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching research:', error);
    return [];
  }
};
