
const API_URL = 'https://swapi.dev/api';

export const getCharacters = async (page: number = 1) => {
  const response = await fetch(`${API_URL}/people?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  const data = await response.json();

  const charactersWithSpecies = await Promise.all(
    data.results.map(async (character: any) => {
      let speciesName = 'Unknown';
      if (character.species.length > 0) {
        const speciesResponse = await fetch(character.species[0]);
        const speciesData = await speciesResponse.json();
        speciesName = speciesData.name;
      }
      return {
        ...character,
        species: speciesName
      };
    })
  );
  return {
    ...data,
    results: charactersWithSpecies
  };
};
