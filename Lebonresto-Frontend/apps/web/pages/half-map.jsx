import React, { useState } from 'react'
import NavbarLight from 'components/navbar/navbar-light'
import RestaurantCard from 'components/restaurant/RestaurantCard'
import RestaurantFilters from 'components/restaurant/RestaurantFilters'
import { restaurants, cities, categories, tags } from '../data/mockData'

export default function HalfMap() {
    const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

    const handleFilterChange = (type, value, checked) => {
        // Implement filtering logic here later
        console.log('Filter changed:', type, value, checked);
    };

    return (
        <div className="d-flex flex-column vh-100">
            <NavbarLight />

            <div className="flex-grow-1 d-flex overflow-hidden">
                {/* Left Side: List */}
                <div className="w-50 d-flex flex-column border-end bg-light overflow-hidden">
                    <div className="p-3 border-bottom bg-white">
                        <RestaurantFilters
                            cities={cities}
                            categories={categories}
                            tags={tags}
                            onFilterChange={handleFilterChange}
                        />
                    </div>

                    <div className="p-3 overflow-auto flex-grow-1">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="m-0 fw-bold">{filteredRestaurants.length} Résultats</h5>
                        </div>

                        <div className="row g-3">
                            {filteredRestaurants.map((restaurant) => (
                                <div className="col-12" key={restaurant.id}>
                                    <RestaurantCard restaurant={restaurant} layout="list" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Map Stub */}
                <div className="w-50 bg-secondary position-relative">
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-white">
                        <div className="text-center">
                            <h3 className="text-white">Carte Interactive</h3>
                            <p>Intégration Google Maps / Leaflet ici</p>
                            <div className="d-flex gap-2 justify-content-center mt-3">
                                {filteredRestaurants.map(r => (
                                    <div key={r.id} className="badge bg-primary p-2 rounded-circle" title={r.name}>
                                        {r.id}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
