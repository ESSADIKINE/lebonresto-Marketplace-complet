'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BsShop, BsGeoAltFill, BsBuilding, BsArrowCounterclockwise, BsCheckLg } from 'react-icons/bs'; // Added BsCheckLg for Apply
import { normalizeRestaurantData } from '../../lib/restaurantUtils';
// Removed renderToStaticMarkup for performance
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// --- Custom Icons ---

const createUserIcon = () => {
    // BsGeoAltFill SVG string equivalent (simplified for performance)
    const iconHtml = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path></svg>`;
    return L.divIcon({
        className: 'lb-map-marker-user',
        html: `<div class="lb-map-marker-inner user-location"><span class="lb-map-marker-icon">${iconHtml}</span></div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20]
    });
};

const createRestaurantIcon = (isHovered, isSelected) => {
    // BsShop SVG
    const iconHtml = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 5.75 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 5.75a2.37 2.37 0 0 1-1.875 1.333A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h-7a.5.5 0 0 1-1 0H1.5a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 .5-.5z"></path></svg>`;

    // Dynamic classes for highlighted state
    const markerClass = `lb-map-marker ${isHovered ? 'hovered' : ''} ${isSelected ? 'selected' : ''}`;

    // Scale up if highlighted
    const size = isHovered || isSelected ? 48 : 36;
    const anchor = size / 2;

    return L.divIcon({
        className: markerClass,
        html: `<div class="lb-map-marker-inner"><span class="lb-map-marker-icon">${iconHtml}</span></div>`,
        iconSize: [size, size],
        iconAnchor: [anchor, anchor],
        popupAnchor: [0, -20]
    });
};

const createCityIcon = (count, isHovered, iconUrl) => {
    // Dynamic classes
    const markerClass = `lb-map-marker-city ${isHovered ? 'hovered' : ''}`;
    const size = isHovered ? 40 : 30; // Scale up (Smaller base)
    const anchor = size / 2;

    let innerHtmlContent;

    // Always show count, default to 0 if undefined/null
    const displayCount = count !== undefined && count !== null ? count : 0;

    if (iconUrl) {
        // Use custom image if available
        innerHtmlContent = `<div class="lb-map-marker-inner city-marker custom-icon" style="background-image: url('${iconUrl}'); background-size: contain; background-repeat: no-repeat; background-position: center;"><span class="city-count">${displayCount}</span></div>`;
    } else {
        // Fallback to Icon - BsBuilding SVG
        const iconHtml = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.697 1 10.36V15h4.25V8.697zm7.333-7.532-.121.061-6 3a.5.5 0 0 0-.251.447v4.613l-1.071.536-3.86 1.929V5.748L13.333 1.165zM8 5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1zM5 5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 5 5h1z"></path></svg>`;
        innerHtmlContent = `<div class="lb-map-marker-inner city-marker"><span class="lb-map-marker-icon">${iconHtml}</span><span class="city-count">${displayCount}</span></div>`;
    }

    return L.divIcon({
        className: markerClass,
        html: innerHtmlContent,
        iconSize: [size, size],
        iconAnchor: [anchor, anchor],
        popupAnchor: [0, -20]
    });
};

// --- Sub-components for Map Logic ---

// Handles zoom events and reports back to parent if needed (internal state for rendering decision)
const MapEvents = ({ onZoomChange, onMapClick }) => {
    const map = useMapEvents({
        zoomend: () => {
            onZoomChange(map.getZoom());
        },
        click: () => {
            if (onMapClick) onMapClick();
        }
    });
    return null;
};

// Controls view center programmatically
const MapController = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            // Use flyTo for smooth transition
            map.flyTo(center, zoom || map.getZoom(), { duration: 1.5 });
        }
    }, [center, zoom, map]);
    return null;
};

// Fallback coordinates for known cities
const MOROCCAN_CITIES_COORDS = {
    'casablanca': { lat: 33.5731, lng: -7.5898 },
    'rabat': { lat: 34.0209, lng: -6.8416 },
    'marrakech': { lat: 31.6295, lng: -7.9811 },
    'marrakesh': { lat: 31.6295, lng: -7.9811 },
    'fes': { lat: 34.0181, lng: -5.0078 },
    'fès': { lat: 34.0181, lng: -5.0078 },
    'tanger': { lat: 35.7595, lng: -5.8340 },
    'tangier': { lat: 35.7595, lng: -5.8340 },
    'agadir': { lat: 30.4278, lng: -9.5981 },
    'essaouira': { lat: 31.5085, lng: -9.7595 },
    'meknes': { lat: 33.8938, lng: -5.5516 },
    'meknès': { lat: 33.8938, lng: -5.5516 },
    'chefchaouen': { lat: 35.1716, lng: -5.2697 },
    'tetouan': { lat: 35.5785, lng: -5.3684 },
    'oujda': { lat: 34.6814, lng: -1.9076 },
    'el jadida': { lat: 33.2316, lng: -8.5007 },
    'kenitra': { lat: 34.2541, lng: -6.5890 }
};

// Inner component to handle City rendering and interactions
const CityLayer = ({ cities = [], validRestaurants, onCityClick, hoveredId }) => {
    const map = useMap(); // Access map instance

    // Identify which city contains the hovered restaurant
    const hoveredCityId = useMemo(() => {
        if (!hoveredId || !validRestaurants) return null;
        const restaurant = validRestaurants.find(r => r.id === hoveredId);
        return restaurant ? restaurant.city_id : null;
    }, [hoveredId, validRestaurants]);

    // Calculate City Markers
    const cityMarkers = useMemo(() => {
        if (!cities) return [];
        return cities.map(city => {
            // Use the backend provided count if available, otherwise calculate
            const count = city.count_restaurants !== undefined
                ? city.count_restaurants
                : validRestaurants.filter(r => r.city_id === city.id).length;

            let latitude = city.latitude || city.lat || 0;
            let longitude = city.longitude || city.lng || 0;

            if (latitude === 0 || longitude === 0) {
                const normalizedName = city.name?.toLowerCase().trim();
                if (MOROCCAN_CITIES_COORDS[normalizedName]) {
                    latitude = MOROCCAN_CITIES_COORDS[normalizedName].lat;
                    longitude = MOROCCAN_CITIES_COORDS[normalizedName].lng;
                }
            }

            if (latitude === 0 || longitude === 0) {
                const r = validRestaurants.find(r => r.city_id === city.id);
                if (r) {
                    latitude = r.latitude;
                    longitude = r.longitude;
                }
            }

            if (latitude === 0 || longitude === 0) return null;

            return {
                ...city,
                count,
                latitude,
                longitude
            };
        }).filter(Boolean);
    }, [cities, validRestaurants]);

    return (
        <>
            {cityMarkers.map(city => {
                const isHovered = city.id === hoveredCityId;
                return (
                    <Marker
                        key={`city-${city.id}`}
                        position={[city.latitude, city.longitude]}
                        icon={createCityIcon(city.count, isHovered, city.icon_url)}
                        zIndexOffset={isHovered ? 1000 : 0}
                        eventHandlers={{
                            click: (e) => {
                                e.originalEvent.stopPropagation();
                                // 1. Zoom/Fly to City
                                map.flyTo([city.latitude, city.longitude], 13, { duration: 1.5 });

                                // 2. Filter Results (Parent)
                                if (onCityClick) onCityClick(city.id, [city.latitude, city.longitude]);
                            }
                        }}
                    >
                        <Popup closeButton={false} offset={[0, -10]}>
                            <div className="text-center fw-bold">{city.name}</div>
                            <div className="text-center small text-muted">{city.count} restaurants</div>
                        </Popup>
                    </Marker>
                );
            })}
        </>
    );
};

export default function LeafletMap({
    restaurants,
    cities = [], // Pass valid cities to show clusters
    hoveredId,
    selectedId,
    filters = {},
    onFilterChange,
    onFilterApply,
    onResetFilters,
    onMarkerClick,
    onCityClick,
    onMapClick
}) {
    // Zoom state
    const [zoomLevel, setZoomLevel] = useState(6); // Default wide view
    const ZOOM_THRESHOLD = 10; // Zoom level to switch from City to Restaurant view

    // Filter valid restaurants
    const validRestaurants = useMemo(() => {
        if (!restaurants || !Array.isArray(restaurants)) return [];
        return restaurants
            .map(r => normalizeRestaurantData(r))
            .filter(r => r && r.latitude !== 0 && r.longitude !== 0);
    }, [restaurants]);

    // --- City Autocomplete State ---
    const [citySearch, setCitySearch] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    // --- Local Price Filter State (Manual Apply) ---
    const [localPriceRange, setLocalPriceRange] = useState([0, 1000]);

    // Sync local range with actual filters when they change (e.g. URL update or Reset)
    useEffect(() => {
        const min = filters.minPrice !== '' && filters.minPrice !== undefined ? Number(filters.minPrice) : 0;
        const max = filters.maxPrice !== '' && filters.maxPrice !== undefined ? Number(filters.maxPrice) : 1000;
        setLocalPriceRange([min, max]);
    }, [filters.minPrice, filters.maxPrice]);

    const handleApplyPrice = () => {
        if (onFilterApply) {
            onFilterApply({
                minPrice: localPriceRange[0],
                maxPrice: localPriceRange[1]
            });
        } else if (onFilterChange) {
            // Fallback
            onFilterChange('minPrice', localPriceRange[0]);
            setTimeout(() => onFilterChange('maxPrice', localPriceRange[1]), 50);
        }
    };

    // Sync search input with selected filter
    useEffect(() => {
        if (!cities) return;
        const selectedCity = cities.find(c => c.id === filters?.cityId);
        if (selectedCity) {
            setCitySearch(selectedCity.name);
        } else if (!filters?.cityId) {
            setCitySearch('');
        }
    }, [filters?.cityId, cities]);

    // Filter suggestions
    const filteredCities = useMemo(() => {
        if (!citySearch) return cities;
        return cities.filter(c =>
            c.name.toLowerCase().startsWith(citySearch.toLowerCase())
        );
    }, [cities, citySearch]);

    const handleCitySelect = (city) => {
        setCitySearch(city.name);
        setShowSuggestions(false);
        if (onFilterChange) onFilterChange('cityId', city.id);
    };

    const handleSearchChange = (e) => {
        setCitySearch(e.target.value);
        setShowSuggestions(true);
        // If cleared, reset filter
        if (e.target.value === '') {
            if (onFilterChange) onFilterChange('cityId', '');
        }
    };

    // Derived view mode
    const showCities = zoomLevel < ZOOM_THRESHOLD;

    // Recalculate cities length for badge (duplicate logic but needed if we keep badge in parent render)
    // Simplified count for badge
    const visibleCityCount = useMemo(() => {
        if (!cities) return 0;
        return cities.filter(c => {
            // 1. Explicit DB Coordinates?
            if (c.latitude || c.lat) return true;

            // 2. Known Fallback Coordinates?
            const normalizedName = c.name?.toLowerCase().trim();
            if (MOROCCAN_CITIES_COORDS[normalizedName]) return true;

            // 3. Has Restaurants (which provide coords)?
            // Only check this if we don't have coords yet
            return !!validRestaurants.find(r => r.city_id === c.id);
        }).length;
    }, [cities, validRestaurants]);

    // Handle initial center logic
    const defaultCenter = [31.7917, -7.0926]; // Morocco
    const center = useMemo(() => {
        // If a restaurant is selected, center on it
        if (selectedId) {
            const r = validRestaurants.find(r => r.id === selectedId);
            if (r) return [r.latitude, r.longitude];
        }

        // If we have a list of restaurants, average them? No, keep it steady or let MapController handle updates only when needed.
        return null;
    }, [selectedId, validRestaurants]);

    // Styles injection
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            .lb-map-marker-inner {
                background-color: white;
                border: 2px solid var(--bs-primary); /* Primary Color */
                border-radius: 50%;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                transition: all 0.2s ease-out;
            }
            .lb-map-marker-inner .lb-map-marker-icon {
                color: var(--bs-primary);
                font-size: 1.2rem;
            }
            
            /* Hovered State */
            .lb-map-marker.hovered .lb-map-marker-inner {
                background-color: var(--bs-primary);
                border-color: white;
                transform: scale(1.1);
                box-shadow: 0 4px 12px rgba(0,0,0,0.4);
                z-index: 1000 !important;
            }
            .lb-map-marker.hovered .lb-map-marker-inner .lb-map-marker-icon {
                color: white;
            }

            /* Selected State */
             .lb-map-marker.selected {
                z-index: 2000 !important; /* Highest priority */
            }
            .lb-map-marker.selected .lb-map-marker-inner {
                background-color: var(--bs-dark);
                border-color: white;
                transform: scale(1.2);
                box-shadow: 0 0 0 4px rgba(0,0,0,0.2);
            }
            .lb-map-marker.selected .lb-map-marker-inner .lb-map-marker-icon {
                color: white;
            }

            /* City Marker */
            .lb-map-marker-inner.city-marker {
                background-color: #ffca2c; /* Warning yellow */
                border-color: #fff;
                position: relative;
            }
            .lb-map-marker-inner.city-marker .lb-map-marker-icon {
                color: #000;
            }
            
            /* Custom City Icon (No BG) */
            .lb-map-marker-inner.city-marker.custom-icon {
                background-color: transparent !important;
                border: none !important;
                box-shadow: none !important;
                border-radius: 0; 
            }

            .lb-map-marker-city.hovered .lb-map-marker-inner {
                transform: scale(1.1);
                /* Add a subtle glow/drop shadow even if transparent */
                z-index: 1000 !important;
            }
            .lb-map-marker-city.hovered .lb-map-marker-inner.custom-icon {
                 filter: drop-shadow(0 0 5px rgba(0,0,0,0.5));
            }
            
            .city-count {
                position: absolute;
                top: -5px;
                right: -5px;
                background: var(--bs-primary);
                color: white;
                font-size: 10px;
                font-weight: bold;
                padding: 2px 5px;
                border-radius: 10px;
                border: 1px solid white;
            }

            /* --- Filter Bar Awesome CSS --- */
            .filter-bar {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(0,0,0,0.05);
                transition: all 0.3s ease;
            }
            .filter-bar:hover {
                background: rgba(255, 255, 255, 1);
                box-shadow: 0 8px 20px rgba(0,0,0,0.12) !important;
                transform: translateY(1px);
            }

            /* Custom Range Slider */
            .custom-range-wrapper {
                position: relative;
                width: 140px;
                height: 20px;
                display: flex;
                align-items: center;
            }
            .range-track-base {
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                height: 4px;
                background: #e9ecef;
                border-radius: 2px;
                transform: translateY(-50%);
            }
            .range-track-active {
                position: absolute;
                top: 50%;
                left: 0;
                height: 4px;
                background: var(--bs-primary);
                border-radius: 2px;
                transform: translateY(-50%);
                z-index: 1;
            }
            .custom-range-input {
                position: absolute;
                top: 50%;
                left: 0;
                width: 100%;
                -webkit-appearance: none;
                background: transparent;
                transform: translateY(-50%);
                z-index: 2;
                margin: 0;
            }
            .custom-range-input:focus {
                outline: none;
            }
            .custom-range-input::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 16px;
                width: 16px;
                border-radius: 50%;
                background: white;
                border: 2px solid var(--bs-primary);
                box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                cursor: pointer;
                transition: transform 0.1s;
                margin-top: -6px; /* center thumb */
            }
            .custom-range-input::-webkit-slider-runnable-track {
                width: 100%;
                height: 4px;
                cursor: pointer;
                background: transparent; /* managed by divs */
                border-radius: 2px;
            }
            .custom-range-input:active::-webkit-slider-thumb {
                transform: scale(1.2);
                background: var(--bs-primary);
            }
            /* Firefox Support */
            .custom-range-input::-moz-range-thumb {
                height: 16px;
                width: 16px;
                border: 2px solid var(--bs-primary);
                border-radius: 50%;
                background: white;
                cursor: pointer;
                box-shadow: 0 1px 3px rgba(0,0,0,0.2);
            }
            .custom-range-input::-moz-range-track {
                width: 100%;
                height: 4px;
                cursor: pointer;
                background: transparent;
            }

            /* Autocomplete Suggestions */
            .suggestions-list {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                margin-top: 8px;
                max-height: 200px;
                overflow-y: auto;
                z-index: 1050;
                padding: 4px;
            }
            .suggestion-item {
                padding: 8px 12px;
                cursor: pointer;
                border-radius: 8px;
                font-size: 0.85rem;
                transition: background 0.2s;
            }
            .suggestion-item:hover {
                background: #f8f9fa;
                color: var(--bs-primary);
                font-weight: 600;
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);


    return (
        <div style={{ height: '100%', width: '100%', position: 'relative' }}>
            <MapContainer
                center={defaultCenter}
                zoom={6}
                scrollWheelZoom={true}
                className="h-100 w-100"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapEvents
                    onZoomChange={setZoomLevel}
                    onMapClick={onMapClick}
                />

                {/* Dynamically update center if selectedId changes */}
                {center && <MapController center={center} zoom={15} />}

                {/* --- RENDER LOGIC --- */}

                {showCities && (
                    <CityLayer
                        cities={filteredCities}
                        validRestaurants={validRestaurants}
                        onCityClick={onCityClick}
                        hoveredId={hoveredId}
                    />
                )}

                {/* 1. User Location Marker (if geolocation active) */}
                {filters.latitude && filters.longitude && (
                    <Marker
                        position={[filters.latitude, filters.longitude]}
                        icon={createUserIcon()}
                        zIndexOffset={2000} // Topmost
                    >
                        <Popup closeButton={false} offset={[0, -10]}>
                            <div className="text-center fw-bold text-primary">Vous êtes ici</div>
                        </Popup>
                    </Marker>
                )}

                {/* 2. Restaurant Markers (Zoomed In) */}
                {!showCities && validRestaurants.map((restaurant) => {
                    const isHovered = restaurant.id === hoveredId;
                    const isSelected = restaurant.id === selectedId;

                    return (
                        <Marker
                            key={restaurant.id}
                            position={[restaurant.latitude, restaurant.longitude]}
                            icon={createRestaurantIcon(isHovered, isSelected)}
                            zIndexOffset={isSelected ? 1000 : (isHovered ? 500 : 0)}
                            eventHandlers={{
                                click: (e) => {
                                    e.originalEvent.stopPropagation(); // Prevent map click
                                    if (onMarkerClick) onMarkerClick(restaurant.id);
                                }
                            }}
                        >
                            {/* NOTE: We removed the popup Card inside the map as requested ("Remove/disable restaurant popup cards").
                                Instead, clicking centers the map and updates the right panel. */}
                        </Marker>
                    );
                })}

            </MapContainer>

            {/* Filter Overlay (Top Right) */}
            <div className="filter-bar position-absolute top-0 end-0 z-3 p-2 shadow-sm d-flex align-items-center gap-3">
                {/* City Filter (Autocomplete) */}
                <div className="position-relative">
                    <input
                        type="text"
                        className="form-control form-control-sm border-0 bg-light rounded-pill fw-bold text-dark"
                        style={{ maxWidth: '170px', fontSize: '0.85rem', paddingLeft: '1rem' }}
                        placeholder="Chercher une ville..."
                        value={citySearch}
                        onChange={handleSearchChange}
                        onFocus={() => setShowSuggestions(true)}
                        // Delay blur to allow click on suggestion
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    />
                    {showSuggestions && (citySearch || filteredCities.length > 0) && (
                        <div className="suggestions-list">
                            {filteredCities.length > 0 ? (
                                filteredCities.map(city => (
                                    <div
                                        key={city.id}
                                        className="suggestion-item"
                                        onClick={() => handleCitySelect(city)}
                                    >
                                        {city.name}
                                    </div>
                                ))
                            ) : (
                                <div className="p-2 text-muted small text-center">Aucune ville trouvée</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Price Filter Custom */}
                <div className="d-flex align-items-center gap-2 px-2 border-start border-end">
                    <span className="small fw-bold text-nowrap text-muted" style={{ fontSize: '0.8rem' }}>
                        <span className="text-primary">{localPriceRange[0]} - {localPriceRange[1]}dh</span>
                    </span>

                    <div style={{ width: 140, padding: '0 10px' }}>
                        <Slider
                            range
                            min={0}
                            max={1000}
                            step={50}
                            value={localPriceRange}
                            onChange={(value) => setLocalPriceRange(value)}
                            trackStyle={[{ backgroundColor: 'var(--bs-primary)', height: 4 }]}
                            handleStyle={[
                                { borderColor: 'var(--bs-primary)', height: 16, width: 16, marginTop: -6, backgroundColor: 'white', opacity: 1 },
                                { borderColor: 'var(--bs-primary)', height: 16, width: 16, marginTop: -6, backgroundColor: 'white', opacity: 1 }
                            ]}
                            railStyle={{ backgroundColor: '#e9ecef', height: 4 }}
                        />
                    </div>
                </div>

                {/* Apply Filter Button */}
                <button
                    onClick={handleApplyPrice}
                    className="btn btn-sm btn-light text-success border-0 rounded-circle p-0 d-flex align-items-center justify-content-center"
                    title="Appliquer le filtre de prix"
                    style={{ width: '32px', height: '32px', transition: 'all 0.2s', backgroundColor: '#f0fff4' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dcfce7'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f0fff4'}
                >
                    <BsCheckLg size={16} />
                </button>

                {/* Reset */}
                <button
                    onClick={onResetFilters}
                    className="btn btn-sm btn-light text-danger border-0 rounded-circle p-0 d-flex align-items-center justify-content-center"
                    title="Réinitialiser"
                    style={{ width: '32px', height: '32px', transition: 'all 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ffe5e5'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                >
                    <BsArrowCounterclockwise size={16} />
                </button>
            </div>


        </div>
    );
}
