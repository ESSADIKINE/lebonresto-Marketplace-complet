'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useGetRestaurantsQuery, useGetCitiesQuery, useGetCategoriesQuery } from '../../store/api';
import RestaurantCard from '../restaurant/RestaurantCard';
import RestaurantFilters from '../filters/RestaurantFilters';
import SortDropdown from './sort-dropdown';
import { BsGrid3X3Gap, BsListUl, BsMap } from 'react-icons/bs';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
    loading: () => <div className="h-100 w-100 d-flex align-items-center justify-content-center bg-light text-muted rounded-4">Chargement de la carte...</div>,
    ssr: false
});

const DEFAULT_FILTERS = {};

export default function RestaurantListingClient({ initialFilters = DEFAULT_FILTERS, title }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [viewMode, setViewMode] = useState('list'); // Default per request

    const [userLocation, setUserLocation] = useState(null); // { lat, lng }

    // Geolocation Logic
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    console.warn("Geolocation permission denied or error:", error);
                }
            );
        }
    }, []);

    // Initialize state from URL or initialFilters
    const [filters, setFilters] = useState({
        cityId: searchParams.get('cityId') || initialFilters.cityId || '',
        categoryId: searchParams.get('categoryId') || initialFilters.categoryId || '',
        status: searchParams.get('status') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        minRating: searchParams.get('minRating') || '',
        promoOnly: searchParams.get('promoOnly') === 'true',
        q: searchParams.get('q') || searchParams.get('query') || '',
        sort: searchParams.get('sort') || 'recommended',
        page: Number(searchParams.get('page')) || 1,
        distance: searchParams.get('distance') || '', // New: Distance Filter
    });

    const updateUrl = (newParams) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(newParams).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '') {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    // Filter Sync Logic
    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            cityId: searchParams.get('cityId') || initialFilters.cityId || '',
            categoryId: searchParams.get('categoryId') || initialFilters.categoryId || '',
            status: searchParams.get('status') || '',
            minPrice: searchParams.get('minPrice') || '',
            maxPrice: searchParams.get('maxPrice') || '',
            minRating: searchParams.get('minRating') || '',
            promoOnly: searchParams.get('promoOnly') === 'true',
            q: searchParams.get('q') || searchParams.get('query') || '',
            sort: searchParams.get('sort') || 'recommended',
            page: Number(searchParams.get('page')) || 1,
            distance: searchParams.get('distance') || '',
        }));

        // Restore view mode from URL
        const v = searchParams.get('view');
        if (v === 'list' || v === 'grid' || v === 'map') {
            setViewMode(v);
        }

    }, [searchParams, initialFilters]);

    // Data Fetching
    const { data: cities = [] } = useGetCitiesQuery();
    const { data: categories = [] } = useGetCategoriesQuery();

    const apiParams = {
        ...filters,
        cityId: filters.cityId || undefined,
        categoryId: filters.categoryId || undefined,
        status: filters.status || undefined,
        minPrice: filters.minPrice !== '' && filters.minPrice !== undefined ? Number(filters.minPrice) : 0,
        maxPrice: filters.maxPrice !== '' && filters.maxPrice !== undefined ? Number(filters.maxPrice) : 1000,
        minRating: filters.minRating ? Number(filters.minRating) : undefined,
        promoOnly: filters.promoOnly ? true : undefined,
        q: filters.q || undefined,
        // Add geospatial params if user location and distance filter are present
        latitude: userLocation?.lat,
        longitude: userLocation?.lng,
        radius: filters.distance ? Number(filters.distance) : undefined,
    };

    const { data, isLoading, isError } = useGetRestaurantsQuery(apiParams);

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
        updateUrl({ view: mode });
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value, page: 1 };
        setFilters(newFilters);
        updateUrl({ [key]: value, page: 1 });
    };

    const handleApply = (newValues) => {
        const newFilters = { ...filters, ...newValues, page: 1 };
        setFilters(newFilters);
        updateUrl({ ...newValues, page: 1 });
    };

    const handleReset = () => {
        const resetFilters = {
            cityId: '',
            categoryId: '',
            status: '',
            minPrice: '',
            maxPrice: '',
            minRating: '',
            promoOnly: false,
            q: '',
            sort: 'recommended',
            page: 1,
            distance: ''
        };
        setFilters(resetFilters);
        router.replace(pathname, { scroll: false });
    };

    const restaurants = data?.items || data || [];
    const totalCount = data?.total || restaurants.length;

    const isMapView = viewMode === 'map';
    // Dynamic column classes: Map View 40% (col-lg-5). Standard: 27% (custom) for filter sidebar.
    // We use custom classes w-lg-27 and w-lg-73 defined below for exact 27/73 split on desktop.
    const leftColClass = isMapView ? 'col-lg-5 col-md-4' : 'col-md-4 w-lg-27';
    const rightColClass = isMapView ? 'col-lg-7 col-md-8' : 'col-md-8 w-lg-73';

    return (
        <div className="container-fluid py-4 min-vh-100 bg-light">
            <style jsx global>{`
                @media (min-width: 992px) {
                    .w-lg-27 {
                        flex: 0 0 29%;
                        max-width: 29%;
                    }
                    .w-lg-73 {
                        flex: 0 0 71%;
                        max-width: 71%;
                    }
                }
            `}</style>
            <div className="row g-4">

                {/* LEFT COLUMN: Filters OR Map */}
                <div className={`${leftColClass} order-2 order-md-1`}>
                    <div className="sticky-top" style={{ top: '0px', zIndex: 1020 }}>
                        {isMapView ? (
                            <div className="overflow-hidden border shadow-sm bg-white" style={{ height: '100vh', borderRadius: '0' }}>
                                <LeafletMap restaurants={restaurants} userLocation={userLocation} />
                            </div>
                        ) : (
                            <div className="overflow-y-auto bg-white border-end h-100" style={{ height: '100vh' }}>
                                <div className="p-3">
                                    <RestaurantFilters
                                        initialFilters={filters}
                                        onApply={handleApply}
                                        onReset={handleReset}
                                        categories={categories}
                                        cities={cities}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN: Header + Results */}
                <div className={`${rightColClass} order-1 order-md-2 d-flex flex-column`}>

                    {/* Header Block */}
                    <div className="bg-white p-3 p-md-4 mb-4 rounded-4 shadow-sm border">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                            <div>
                                <h1 className="h4 fw-bold mb-1 text-dark">
                                    {title || 'Tous les restaurants'}
                                </h1>
                                <span className="text-muted small fw-bold">
                                    {isLoading ? '...' : `${totalCount} résultats trouvés`}{userLocation && filters.distance ? ` (dans ${filters.distance} km)` : ''}
                                </span>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                                {/* View Switcher */}
                                <div className="btn-group" role="group">
                                    <button
                                        type="button"
                                        className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-light border text-muted'}`}
                                        onClick={() => handleViewModeChange('grid')}
                                        title="Vue Grille"
                                    >
                                        <BsGrid3X3Gap />
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-light border text-muted'}`}
                                        onClick={() => handleViewModeChange('list')}
                                        title="Vue Liste"
                                    >
                                        <BsListUl />
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn btn-sm ${viewMode === 'map' ? 'btn-primary' : 'btn-light border text-muted'}`}
                                        onClick={() => handleViewModeChange('map')}
                                        title="Vue Carte"
                                    >
                                        <BsMap />
                                    </button>
                                </div>

                                {/* Sort Dropdown */}
                                <SortDropdown
                                    currentSort={filters.sort}
                                    onSortChange={(val) => handleFilterChange('sort', val)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Results Block */}
                    {isLoading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status"></div>
                        </div>
                    ) : restaurants.length === 0 ? (
                        <div className="text-center py-5 bg-white rounded-4 shadow-sm border">
                            <h4 className="fw-bold">Aucun résultat</h4>
                            <p className="text-muted">Modifiez vos filtres pour voir plus de résultats.</p>
                            <button className="btn btn-outline-primary rounded-pill" onClick={handleReset}>
                                Réinitialiser
                            </button>
                        </div>
                    ) : (
                        <div className={`row g-4 ${viewMode === 'list' ? 'row-cols-1' : 'row-cols-1 row-cols-md-2 row-cols-xl-3'}`}>
                            {restaurants.map(restaurant => (
                                <div className="col" key={restaurant.id}>
                                    <RestaurantCard
                                        restaurant={restaurant}
                                        layout={viewMode === 'list' ? 'list' : 'grid'} // Force 'grid' style if map mode, 'list' if list mode.
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
