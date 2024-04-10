
const API_URL = 'https://swapi.dev/api';

export const getCharacters = async (page: number = 1) => {
  const response = await fetch(`${API_URL}/people?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  return response.json();
};
