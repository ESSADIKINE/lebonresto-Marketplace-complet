import dynamic from 'next/dynamic';
import RestaurantCard from './RestaurantCard';

// Dynamic import for LeafletMap to avoid SSR issues
const LeafletMap = dynamic(() => import('../listing/LeafletMap'), {
    loading: () => <div className="h-100 w-100 d-flex align-items-center justify-content-center bg-light text-muted">Chargement de la carte...</div>,
    ssr: false
});

/**
 * Half Map Layout Component
 * Splits screen: Left = Map (Sticky), Right = List (Scrollable).
 * Note: Filters are removed as per user request.
 */
export default function HalfMapLayout({
    restaurants,
    loading
}) {
    return (
        <div className="d-flex flex-column flex-lg-row flex-grow-1 w-100" style={{ minHeight: 'calc(100vh - 130px)' }}>

            {/* LEFT COLUMN: MAP (Sticky on Desktop) */}
            <div className="col-12 col-lg-5 p-0 position-relative border-end order-1 order-lg-1"
                style={{ height: '50vh', lgHeight: 'calc(100vh - 130px)', position: 'sticky', top: '0' }}>
                <div className="d-none d-lg-block h-100 w-100 sticky-top" style={{ top: '0', height: 'calc(100vh - 130px)' }}>
                    <LeafletMap restaurants={restaurants} />
                </div>
                {/* Mobile Map (non-sticky, fixed height) */}
                <div className="d-block d-lg-none w-100" style={{ height: '300px' }}>
                    <LeafletMap restaurants={restaurants} />
                </div>
            </div>

            {/* RIGHT COLUMN: LIST ONLY (Scrollable) */}
            <div className="col-12 col-lg-7 d-flex flex-column bg-light order-2 order-lg-2">
                <div className="px-3 px-md-4 py-4 flex-grow-1">
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status"></div>
                        </div>
                    ) : restaurants.length === 0 ? (
                        <div className="text-center py-5">
                            <h5 className="text-muted fw-bold">Aucun résultat trouvé</h5>
                            <p className="text-muted small">Essayez d'élargir votre recherche.</p>
                        </div>
                    ) : (
                        <div className="row g-3">
                            {restaurants.map((restaurant) => (
                                <div className="col-12" key={restaurant.id}>
                                    <RestaurantCard restaurant={restaurant} layout="list" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
