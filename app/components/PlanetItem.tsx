import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Planet } from '../../lib/interfaces'
import { addDiscoveredPlanet, removeDiscoveredPlanet, isPlanetDiscovered } from '../../lib/sessionStorage'

interface PlanetProps {
    planetData: Planet
    onUndiscoverPlanet: () => void
}

const PlanetItem: React.FC<PlanetProps> = React.memo(({ planetData, onUndiscoverPlanet }) => {
    const [isDiscovered, setIsDiscovered] = useState<boolean>(false)
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const router = useRouter()

    const { id, name, population, diameter, gravity, climates, terrains, surfaceWater } = planetData

    useEffect(() => {
        setIsDiscovered(isPlanetDiscovered(id))
    }, [id])
    
    const handleDiscoverClick = () => {
        if (isDiscovered) {
            setIsDiscovered(false)
            removeDiscoveredPlanet(id)
            onUndiscoverPlanet()
        } else {
            setIsDiscovered(true)
            addDiscoveredPlanet(id)
        }
    }

    const handleTitleClick = () => {
        router.push(`/${id}`)
    }

    return (
        <div className="w-full border-2 border-white p-4 mb-4 transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-center">
                <h2
                    className="text-2xl text-white cursor-pointer transition-all duration-300 ease-in-out hover:font-bold hover:text-yellow-200"
                    onClick={handleTitleClick}
                >
                    {name}
                </h2>
                <button
                    className={`border border-white text-white px-4 py-2 transition-all duration-300 ease-in-out ${isDiscovered ? 'bg-green-500' : 'bg-red-500'} hover:bg-opacity-75`}
                    onClick={handleDiscoverClick}
                >
                    {isDiscovered ? 'Discovered' : 'Undiscovered'}
                </button>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-white border border-gray-400 p-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 break-words">
                    Population: {population}
                </div>
                <div className="text-white border border-gray-400 p-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 break-words">
                    Diameter: {diameter}
                </div>
                <div className="text-white border border-gray-400 p-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 break-words">
                    Gravity: {gravity}
                </div>
            </div>
            <div className={`overflow-hidden transition-max-height duration-700 ease-in-out ${isExpanded ? 'max-h-[200px]' : 'max-h-[10px]'}`}>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-white border border-gray-400 p-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 break-words">
                        Climates: {climates}
                    </div>
                    <div className="text-white border border-gray-400 p-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 break-words">
                        Terrains: {terrains}
                    </div>
                    <div className="text-white border border-gray-400 p-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 break-words">
                        Surface Water: {surfaceWater}
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button
                    className="bg-transparent border-none text-white"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? '▲' : '▼'}
                </button>
            </div>
        </div>
    )
})

export default PlanetItem