import client from './apolloClient'
import { ALL_PLANETS_QUERY, PLANET_QUERY } from '../app/graphql/queries'
import { PlanetsResponse, PlanetResponse, Planet } from './interfaces'

export const fetchPlanets = async (first: number, offset: number): Promise<Planet[]> => {
    try {
        const { data } = await client.query<PlanetsResponse>({
            query: ALL_PLANETS_QUERY,
            variables: { first, offset },
        })
        return data.allPlanets.planets
    } catch (error) {
        console.error('Error fetching the planets:', error)
        throw new Error('Unable to fetch the planets.')
    }
}

export const fetchPlanet = async (id: string): Promise<Planet> => {
    try {
        const { data } = await client.query<PlanetResponse>({
            query: PLANET_QUERY,
            variables: { id },
        })
        return data.planet
    } catch (error) {
        console.error('Error fetching the planet:', error)
        throw new Error('Unable to fetch the planet.')
    }
}