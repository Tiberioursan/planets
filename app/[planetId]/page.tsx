'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { fetchPlanet } from '../../lib/apiClient'
import { Planet } from '../../lib/interfaces'
import { addDiscoveredPlanet } from '@/lib/sessionStorage'

const PlanetPage = () => {
    const { planetId } = useParams<{ planetId: string }>()
    const [planet, setPlanet] = useState<Planet | null>(null)

    const casedAndSpacedWord = (word: string) => {
        return word
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
    }

    useEffect(() => {
        const loadPlanet = async () => {
            if (planetId && typeof planetId === 'string') {
                const data: Planet = await fetchPlanet(planetId)
                setPlanet(data)
                addDiscoveredPlanet(planetId)
            }
        }
        loadPlanet()
    }, [planetId])

    return (
        <div className="flex justify-center items-center h-screen">
            {
                planet && planet.name ? (
                    <div className="w-4/5">
                        <div className="flex items-center mb-4">
                            <button 
                                onClick={() => window.history.back()} 
                                className="text-white mr-4 text-4xl font-bold flex items-center hover:text-yellow-300"
                            >
                                &lt;
                            </button>
                            <h1 className="text-4xl font-bold text-white flex items-center m-0">{planet.name}</h1>
                        </div>
                        <div className="space-y-4 mt-10">
                                {
                                    Object.entries(planet).map(([key, value]) => {
                                        if (key === '__typename' || key === 'id') return null
                                        return (
                                            <div
                                                key={key}
                                                className="p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300 flex justify-between items-center"
                                            >
                                                <h2 className="text-xl font-semibold text-white">{casedAndSpacedWord(key)}</h2>
                                                {
                                                    Array.isArray(value) ? (
                                                        <ul className="list-disc list-inside text-white">
                                                            {value.map((item, index) => (
                                                                <li key={index}>{casedAndSpacedWord(item)}</li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p className="text-white">{value}</p>
                                                    )
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    </div>
                ) : (
                    <p className="animate-pulse text-white pb-10">Loading...</p>
                )
            }
        </div>
    )
}

export default PlanetPage