'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useGetRestaurantsQuery, useGetCitiesQuery, useGetCategoriesQuery } from '../../store/api';
import RestaurantCard from '../restaurant/RestaurantCard';
import RestaurantFilters from '../filters/RestaurantFilters';
import FilterPopup from '../filters/FilterPopup'; // Import Popup
import SortDropdown from './sort-dropdown';
import Pagination from '../ui/Pagination';
import { BsGrid3X3Gap, BsListUl, BsMap, BsArrowLeft, BsSliders, BsTagFill, BsArrowCounterclockwise } from 'react-icons/bs';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
    loading: () => <div className="h-100 w-100 d-flex align-items-center justify-content-center bg-light text-muted rounded-4">Chargement de la carte...</div>,
    ssr: false
});

const DEFAULT_FILTERS = {};

export default function RestaurantListingClient({ initialFilters = DEFAULT_FILTERS, title }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [viewMode, setViewMode] = useState('map'); // Default to Half Map
    const [hoveredId, setHoveredId] = useState(null); // Track hovered card
    const [focusedCardId, setFocusedCardId] = useState(null); // Track clicked card (for map centering only)

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
        distance: searchParams.get('distance') || '',
        restaurantId: searchParams.get('restaurantId') || '',
        latitude: searchParams.get('latitude') || '',
        longitude: searchParams.get('longitude') || '', // New param for single selection
    });

    // Popup State
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

    // Count Active Filters


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
            restaurantId: searchParams.get('restaurantId') || '',
            latitude: searchParams.get('latitude') || '',
            longitude: searchParams.get('longitude') || '',
        }));

    }, [searchParams, initialFilters]);

    // View Mode Persistence Logic
    useEffect(() => {
        const urlView = searchParams.get('view');
        if (urlView && ['list', 'grid', 'map'].includes(urlView)) {
            setViewMode(urlView);
            localStorage.setItem('restaurantViewMode', urlView);
        } else {
            // No URL param, check LocalStorage
            const savedView = localStorage.getItem('restaurantViewMode');
            if (savedView && ['list', 'grid', 'map'].includes(savedView)) {
                setViewMode(savedView);
            }
            // else remain default ('map')
        }
    }, [searchParams]);

    // Data Fetching
    const { data: cities = [] } = useGetCitiesQuery();
    const { data: categories = [] } = useGetCategoriesQuery();

    // Count Active Filters (Moved here to access cities/categories)
    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (filters.categoryId) count += filters.categoryId.split(',').length;
        if (filters.minPrice && filters.minPrice !== '0' && filters.minPrice !== '50') count++;
        if (filters.maxPrice && filters.maxPrice !== '1000' && filters.maxPrice !== '500') count++;
        if (filters.minRating) count++;
        if (filters.distance && filters.distance !== '10') count++;
        if (filters.cityId && filters.cityId.split(',').length !== cities.length) count++;
        return count;
    }, [filters, cities.length]);

    // Find selected city for Geolocation (if only one is selected)
    const selectedCity = useMemo(() => {
        if (!filters.cityId || !cities) return null;
        const cityIds = String(filters.cityId).split(',');
        if (cityIds.length === 1) {
            return cities.find(c => String(c.id) === String(cityIds[0]));
        }
        return null;
    }, [filters.cityId, cities]);

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
        radius: filters.distance ? Number(filters.distance) : undefined,
        // USER LOCATION TAKES PRECEDENCE
        latitude: filters.latitude ? Number(filters.latitude) : (selectedCity ? (selectedCity.latitude || selectedCity.lat) : undefined),
        longitude: filters.longitude ? Number(filters.longitude) : (selectedCity ? (selectedCity.longitude || selectedCity.lng) : undefined),
    };

    const { data, isLoading, isError } = useGetRestaurantsQuery(apiParams);

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
        updateUrl({ view: mode });
        localStorage.setItem('restaurantViewMode', mode);
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value, page: 1 };
        // If changing city, clear restaurant selection and focus
        if (key === 'cityId') {
            newFilters.restaurantId = '';
            setFocusedCardId(null);
        }

        setFilters(newFilters);
        updateUrl({ [key]: value, page: 1, restaurantId: key === 'cityId' ? '' : filters.restaurantId });
    };

    const handlePageChange = (page) => {
        const newFilters = { ...filters, page };
        setFilters(newFilters);
        updateUrl({ page });
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
            distance: '',
            restaurantId: ''
        };
        setFilters(resetFilters);
        router.replace(pathname, { scroll: false });
    };

    const restaurants = data?.items || data || [];
    const totalCount = data?.total || restaurants.length;

    // --- Interaction Handlers ---

    // 1. City Click (Map -> List)
    const handleCityClick = (cityId) => {
        handleFilterChange('cityId', cityId);
        // Map will handle zoom internally or via prop updates if needed (MapController)
    };

    // 2. Marker Click (Map -> List)
    const handleMarkerClick = (restaurantId) => {
        // Map click -> Single Result Mode
        const newFilters = { ...filters, restaurantId };
        setFilters(newFilters);
        updateUrl({ restaurantId });
        setFocusedCardId(null); // Clear focus since we are now selecting
    };

    // 3. Card Click (List -> Map)
    const handleCardClick = (restaurantId) => {
        // Card click -> Focus Map (Center + Highlight) but KEEP list
        setFocusedCardId(restaurantId);
        // Do NOT update URL restaurantId
    };

    // 4. Clear Selection (Back to Results)
    const handleClearSelection = () => {
        const newFilters = { ...filters, restaurantId: '' };
        setFilters(newFilters);
        updateUrl({ restaurantId: '' });
        setFocusedCardId(null);
    };

    // Single Result Mode Logic
    const selectedRestaurantId = filters.restaurantId;
    const selectedRestaurant = useMemo(() => {
        if (!selectedRestaurantId) return null;
        return restaurants.find(r => r.id === selectedRestaurantId);
    }, [selectedRestaurantId, restaurants]);

    const displayedRestaurants = selectedRestaurant ? [selectedRestaurant] : restaurants;


    const isMapView = viewMode === 'map';
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
                                <LeafletMap
                                    restaurants={restaurants}
                                    cities={cities}
                                    hoveredId={hoveredId}
                                    selectedId={selectedRestaurantId || focusedCardId}
                                    filters={filters}
                                    onFilterChange={handleFilterChange}
                                    onResetFilters={handleReset}
                                    onCityClick={handleCityClick}
                                    onMarkerClick={handleMarkerClick}
                                    onMapClick={handleClearSelection} // Optional: clicking map background clears selection
                                    onFilterApply={handleApply}
                                />
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
                    {/* Header Controls (No Background) */}
                    {/* Header Controls (No Background) */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

                        {/* LEFT: TheFork-Style Filter Bar */}
                        <div className="d-flex align-items-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {/* Main Filter Button */}
                            <button
                                onClick={() => setIsFilterPopupOpen(true)}
                                className={`btn btn-sm rounded-pill d-flex align-items-center gap-2 px-3 py-2 fw-bold shadow-sm transition-all ${activeFilterCount > 0 ? 'bg-white border-primary text-primary' : 'btn-white border bg-white text-dark'}`}
                                style={{ whiteSpace: 'nowrap' }}
                            >
                                <BsSliders size={16} />
                                <span>Tous les filtres</span>
                                {activeFilterCount > 0 && (
                                    <span className="badge bg-primary text-white rounded-circle ms-1" style={{ fontSize: '0.7rem' }}>{activeFilterCount}</span>
                                )}
                            </button>

                            {/* Promo Toggle Chip */}
                            <button
                                onClick={() => handleFilterChange('promoOnly', !filters.promoOnly)}
                                className={`btn btn-sm rounded-pill d-flex align-items-center gap-2 px-3 py-2 fw-bold shadow-sm transition-all ${filters.promoOnly ? 'bg-white border-success text-success' : 'btn-white border bg-white text-dark'}`}
                                style={{ whiteSpace: 'nowrap' }}
                            >
                                <BsTagFill size={16} className={filters.promoOnly ? 'text-success' : 'text-success'} />
                                <span>Promotions</span>
                            </button>

                            {/* Reset Button (Visible only when filters active) */}
                            {activeFilterCount > 0 && (
                                <button
                                    onClick={handleReset}
                                    className="btn btn-sm btn-light border rounded-pill d-flex align-items-center gap-2 px-3 py-2 fw-bold shadow-sm text-danger hover-bg-danger-light transition-all"
                                    style={{ whiteSpace: 'nowrap' }}
                                    title="Réinitialiser tous les filtres"
                                >
                                    <BsArrowCounterclockwise size={16} />
                                    <span>Réinitialiser</span>
                                </button>
                            )}

                            {/* Examples of other quick chips if needed later */}
                            {/* <button className="btn btn-sm btn-white border rounded-pill px-3 py-2 text-nowrap fw-medium shadow-sm">Nouveautés</button> */}
                        </div>

                        {/* RIGHT: View & Sort */}
                        <div className="d-flex align-items-center gap-2 ms-auto">
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
                            <SortDropdown
                                currentSort={filters.sort}
                                onSortChange={(val) => handleFilterChange('sort', val)}
                            />
                        </div>
                    </div>

                    {/* Single Result Header (Back Button) */}
                    {selectedRestaurant && (
                        <div className="mb-3">
                            <button onClick={handleClearSelection} className="btn btn-outline-primary btn-sm rounded-pill d-flex align-items-center gap-2 px-3 fw-bold">
                                <BsArrowLeft /> Retour aux résultats
                            </button>
                        </div>
                    )}

                    {/* Results Block */}
                    {isLoading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status"></div>
                        </div>
                    ) : displayedRestaurants.length === 0 ? (
                        <div className="text-center py-5 bg-white rounded-4 shadow-sm border">
                            <h4 className="fw-bold">Aucun résultat</h4>
                            <p className="text-muted">Modifiez vos filtres pour voir plus de résultats.</p>
                            <button className="btn btn-outline-primary rounded-pill" onClick={handleReset}>
                                Réinitialiser
                            </button>
                        </div>
                    ) : (
                        <div className={`row g-4 ${viewMode === 'list' && !selectedRestaurant ? 'row-cols-1' : 'row-cols-1 row-cols-md-2 row-cols-xl-3'}`}>
                            {displayedRestaurants.map(restaurant => (
                                <div
                                    className="col"
                                    key={restaurant.id}
                                    onMouseEnter={() => setHoveredId(restaurant.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    onClick={() => handleCardClick(restaurant.id)} // Click card centers map
                                    style={{ cursor: 'pointer' }}
                                >
                                    <RestaurantCard
                                        restaurant={restaurant}
                                        layout={viewMode === 'list' && !selectedRestaurant ? 'list' : 'grid'} // Use grid for single result
                                        className={focusedCardId === restaurant.id ? 'border-primary ring-2' : ''} // Optional visual feedback on card
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination - Hide in Single Result Mode */}
                    {!isLoading && !selectedRestaurant && restaurants.length > 0 && (
                        <Pagination
                            currentPage={filters.page}
                            totalPages={Math.ceil(totalCount / 10)} // Using 10 explicitly as per slice
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
            {/* Filter Popup Component */}
            <FilterPopup
                isOpen={isFilterPopupOpen}
                onClose={() => setIsFilterPopupOpen(false)}
                initialFilters={filters}
                categories={categories}
                cities={cities}
                onApply={(newFilters) => {
                    handleApply(newFilters);
                    setIsFilterPopupOpen(false);
                }}
                resultCount={totalCount}
            />
        </div>
    );
}
