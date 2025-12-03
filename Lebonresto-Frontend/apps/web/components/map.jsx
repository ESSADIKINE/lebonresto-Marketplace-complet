'use client'

import React, { useState } from 'react'
import Map, { Marker, NavigationControl } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function MapComponent() {
    const [viewState, setViewState] = useState({
        longitude: -73.99726866,
        latitude: 40.72956781,
        zoom: 13
    })

    const markerPositions = [
        { lat: 40.72956781, lng: -73.99726866 },
        { lat: 40.76221766, lng: -73.96511769 },
        { lat: 40.88496706, lng: -73.88191222 },
        { lat: 40.72228267, lng: -73.99246214 },
        { lat: 40.94982541, lng: -73.84357452 },
        { lat: 40.90261483, lng: -74.08252716 },
    ]

    return (
        <div className="home-map-container fw-map">
            <div id="map-main" style={{ height: '100vh', width: '100%' }}>
                <Map
                    {...viewState}
                    onMove={evt => setViewState(evt.viewState)}
                    style={{ width: '100%', height: '100%' }}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'}
                >
                    {markerPositions.map((position, index) => (
                        <Marker
                            key={index}
                            longitude={position.lng}
                            latitude={position.lat}
                            anchor="bottom"
                        >
                            <div style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: '#3b82f6',
                                border: '3px solid white',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                cursor: 'pointer'
                            }} />
                        </Marker>
                    ))}
                    <NavigationControl position="top-right" />
                </Map>
            </div>
        </div>
    )
}
