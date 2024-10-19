export interface Planet {
    id: string
    name: string
    population: string
    diameter: string
    gravity: string
    climates: string
    terrains: string
    surfaceWater: string
}

export interface PlanetsResponse {
    allPlanets: {
        planets: Planet[]
    }
}

export interface PlanetResponse {
    planet: Planet
}