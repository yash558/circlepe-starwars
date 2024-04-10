// types.ts
export interface Character {
    name: string;
    height: string;
    mass: string;
    birth_year: string;
    homeworld: string;
    films: string[];
    species: string[];
    created: string;
  }
  
  export interface Homeworld {
    name: string;
    terrain: string;
    climate: string;
    residents: string[];
  }
  