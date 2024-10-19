import { gql } from '@apollo/client';

export const ALL_PLANETS_QUERY = gql`
  query AllPlanets($first: Int, $offset: Int) {
    allPlanets(first: $first, last: $offset) {
      planets {
        id,
        name,
        population,
        diameter,
        gravity,
        climates,
        terrains,
        surfaceWater
      }
    }
  }
`;

export const PLANET_QUERY = gql`
  query Planet($id: ID) {
    planet(id: $id) {
      id,
      name,
      population,
      diameter,
      gravity,
      climates,
      terrains,
      surfaceWater
    }
  }
`;