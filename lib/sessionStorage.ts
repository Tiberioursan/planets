export const getDiscoveredPlanets = (): string[] => {
    try {
        const discovered = sessionStorage.getItem('discoveredPlanets')
        return discovered ? JSON.parse(discovered) : []
    } catch (error) {
        console.error('Error getting discovered planets:', error)
        return []
    }
}

export const addDiscoveredPlanet = (planetId: string): void => {
    try {
        const discovered = getDiscoveredPlanets()
        if (!discovered.includes(planetId)) {
            discovered.push(planetId)
            sessionStorage.setItem('discoveredPlanets', JSON.stringify(discovered))
        }
    } catch (error) {
        console.error('Error adding discovered planet:', error)
    }
}

export const removeDiscoveredPlanet = (planetId: string): void => {
    try {
        const discovered = getDiscoveredPlanets()
        const updated = discovered.filter((id) => id !== planetId)
        sessionStorage.setItem('discoveredPlanets', JSON.stringify(updated))
    } catch (error) {
        console.error('Error removing discovered planet:', error)
    }
}

export const isPlanetDiscovered = (planetId: string): boolean => {
    try {
        const discovered = getDiscoveredPlanets()
        return discovered.includes(planetId)
    } catch (error) {
        console.error('Error checking if planet is discovered:', error)
        return false
    }
}