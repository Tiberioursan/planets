'use client'

import React, { useState, useEffect } from 'react'
import { fetchPlanets, fetchPlanet } from '../../lib/apiClient'
import { Planet } from '../../lib/interfaces'
import PlanetItem from './PlanetItem'
import { getDiscoveredPlanets } from '../../lib/sessionStorage'

const PlanetList: React.FC = () => {
  const [planets, setPlanets] = useState<Planet[]>([])
  const [visiblePlanets, setVisiblePlanets] = useState<Planet[]>([])
  const [first, setFirst] = useState<number>(10)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [showDiscovered, setShowDiscovered] = useState<boolean>(false)
  const [discoveredPlanets, setDiscoveredPlanets] = useState<Planet[]>([])
  
  const loadInitialPlanets = async (): Promise<void> => {
    setLoading(true)
    const newPlanets: Planet[] = await fetchPlanets(first, 10)
    
    if (newPlanets.length === 0) {
      setHasMore(false)
    } else {
      setPlanets((newPlanets))
      setFirst((prevFirst) => prevFirst + 10)
    }

    setLoading(false)
  }

  const loadMorePlanets = async (): Promise<void> => {
    if (loading) return
    setLoading(true)
    const newPlanets: Planet[] = await fetchPlanets(first, 10)
    
    if (newPlanets.length === 0) {
      setHasMore(false)
    } else {
      setPlanets((prevPlanets) => [...prevPlanets, ...newPlanets])
      setFirst((prevFirst) => prevFirst + 10)
    }

    setLoading(false)
  }

  const createDisvoveredPlanets = async (): Promise<void> => {
    const newDiscoveredPlanets: Planet[] = []
    const discoveredIds: string[] = getDiscoveredPlanets()
    
    await Promise.all(discoveredIds.map(async (planetId) => {
      const planet = await fetchPlanet(planetId)
      newDiscoveredPlanets.push(planet)
    }))

    setDiscoveredPlanets(newDiscoveredPlanets)
    setLoading(false)
  }

  const handleScroll = (event: React.UIEvent<HTMLDivElement>): void => {
    const tolerance = 10
    const target = event.currentTarget
    const bottom = target.scrollHeight - target.scrollTop <= target.clientHeight + tolerance
    if (bottom && hasMore && !showDiscovered) {
      loadMorePlanets()
    }
  }

  const handleOnUndiscoverPlanet = () => {
    setLoading(true)
    setDiscoveredPlanets([])
    createDisvoveredPlanets()
  }

  useEffect(() => {
    !showDiscovered && loadInitialPlanets()
  }, [])

  useEffect(() => {
    if (showDiscovered) {
      setVisiblePlanets(discoveredPlanets)
    } else {
      setVisiblePlanets(planets)
    }
  }, [showDiscovered, planets, discoveredPlanets])

  useEffect(() => {
    setLoading(true)
    createDisvoveredPlanets()
  }, [showDiscovered])

  

  return (
    <div className="overflow-hidden max-h-[90vh] w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1>Planets List</h1>
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <label htmlFor="discovered-planets" className="text-white">Discovered Planets</label>
          <input
            type="checkbox"
            id="discovered-planets"
            className="toggle-switch"
            checked={showDiscovered}
            onChange={() => setShowDiscovered((prev: boolean) => !prev)}
          />
        </div>
      </div>
        <div onScroll={handleScroll} className="overflow-y-auto max-h-[80vh] relative">
          <ul className='pb-10'>
            {
              visiblePlanets.map(planet => (
                <PlanetItem
                  key={planet.id}
                  planetData={planet}
                  onUndiscoverPlanet={handleOnUndiscoverPlanet}
                />
              ))
            }
          </ul>
          {
            loading && <p className="animate-pulse text-white pb-10">Loading...</p>
          }
          {
            !hasMore && <p>No more planets to load</p>
          }
          {
            discoveredPlanets.length === 0 && showDiscovered && !loading &&
            <p className='text-white'>No planets discovered yet!</p>
          }
      </div>
    </div>
  )
}

export default PlanetList