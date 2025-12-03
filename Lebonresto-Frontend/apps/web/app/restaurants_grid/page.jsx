import React from 'react';
import NavbarLight from '../../components/navbar/navbar-light';
import Link from 'next/link';
import Image from 'next/image';
import { BsGeoAlt, BsPatchCheckFill, BsStar, BsSuitHeart, BsTelephone, BsStarFill } from 'react-icons/bs';
import FilterOne from '../../components/filter-one';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import FooterTop from '../../components/footer-top';
import Footer from '../../components/footer';
import BackToTop from '../../components/back-to-top';

export const metadata = {
    title: 'Restaurants Grid - LeBonResto',
    description: 'Find the best restaurants in Morocco',
};

async function getRestaurants(page = 1, limit = 9) {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
    try {
        const res = await fetch(`${baseURL}/restaurants?page=${page}&limit=${limit}`, { next: { revalidate: 60 } });
        if (!res.ok) {
            return { data: [], total: 0, page, limit, totalPages: 0 };
        }
        return await res.json();
    } catch (error) {
        console.error("Failed to fetch restaurants:", error);
        return { data: [], total: 0, page, limit, totalPages: 0 };
    }
}

export default async function RestaurantsGrid({ searchParams }) {
    const page = parseInt(searchParams?.page || '1', 10);
    const limit = 9;
    const { data: restaurants, total, totalPages } = await getRestaurants(page, limit);

    return (
        <>
            <NavbarLight />

            <div className="bg-white py-3 sticky-lg-top z-3">
                <FilterOne />
            </div>

            <section className="bg-light">
                <div className="container">
                    <div className="row align-items-center justify-content-between mb-4">
                        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-6 col-6">
                            <div className="totalListingshow">
                                <h6 className="fw-medium mb-0">{total} Listings Found</h6>
                            </div>
                        </div>

                        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-6 col-6">
                            <div className="text-end">
                                <div className="dropdown d-inline-flex p-0">
                                    <a href="#" className="py-2 px-3 dropdown-toggle toogleDrops" id="shortfilter" data-bs-toggle="dropdown" aria-expanded="false">
                                        Short Listings
                                    </a>
                                    <div className="dropdown-menu border shadow-sm">
                                        <ul className="card rounded-0 p-0">
                                            <li><Link href="#" className="dropdown-item">Default Order</Link></li>
                                            <li><Link href="#" className="dropdown-item">Highest Rated</Link></li>
                                            <li><Link href="#" className="active dropdown-item">Most Reviewed</Link></li>
                                            <li><Link href="#" className="dropdown-item">Newest Listings</Link></li>
                                            <li><Link href="#" className="dropdown-item">Oldest Listings</Link></li>
                                            <li><Link href="#" className="dropdown-item">Featured Listings</Link></li>
                                            <li><Link href="#" className="dropdown-item">Most Viewed</Link></li>
                                            <li><Link href="#" className="dropdown-item">Short By A To Z</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-center justify-content-center g-xl-4 g-3">
                        {restaurants.map((item, index) => {
                            const placeholderImage = '/assets/img/restaurant-placeholder.jpg';
                            const restaurantImage = item.restaurant_image || placeholderImage;
                            const ownerImage = item.logo_url || '/assets/img/team-1.jpg';
                            const ratingAvg = item.rating_avg || 0;
                            const ratingCount = item.rating_count || 0;
                            const isOpen = item.resturant_status === 'Ouvert' || item.status === 'APPROVED';

                            return (
                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12" key={item.id || index}>
                                    <div className="listingitem-container">
                                        <div className="singlelisting-item">
                                            <div className="listing-top-item">
                                                <Link href={`/restaurants/${item.id}`} className="topLink">
                                                    <div className="position-absolute start-0 top-0 ms-3 mt-3 z-2">
                                                        <div className="d-flex align-items-center justify-content-start gap-2">
                                                            {isOpen ? (<span className="badge badge-xs text-uppercase listOpen">Open</span>) : (<span className="badge badge-xs text-uppercase listClose">Closed</span>)}

                                                            <span className="badge badge-xs badge-transparent">$$$</span>

                                                            {item.is_featured &&
                                                                <span className="badge badge-xs badge-transparent align-self-center"><BsStar className="mb-0 me-1 align-self-center" />Featured</span>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div style={{ position: 'relative', height: '250px', width: '100%' }}>
                                                        <Image
                                                            src={restaurantImage}
                                                            alt={item.name}
                                                            fill
                                                            className="img-fluid"
                                                            style={{ objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                </Link>
                                                <div className="position-absolute end-0 bottom-0 me-3 mb-3 z-2">
                                                    <Link href="#" className="bookmarkList" data-bs-toggle="tooltip" data-bs-title="Save Listing" aria-label="Save to favorites"><BsSuitHeart className="m-0" /></Link>
                                                </div>
                                            </div>
                                            <div className="listing-middle-item">
                                                <div className="listing-avatar">
                                                    <Link href="#" className="avatarImg">
                                                        <Image
                                                            src={ownerImage}
                                                            className="img-fluid circle"
                                                            alt="Avatar"
                                                            width={40}
                                                            height={40}
                                                            style={{ objectFit: 'cover' }}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="listing-details">
                                                    <h4 className="listingTitle">
                                                        <Link href={`/restaurants/${item.id}`} className="titleLink">
                                                            {item.name}
                                                            <span className="verified"><BsPatchCheckFill className="bi bi-patch-check-fill m-0" /></span>
                                                        </Link>
                                                    </h4>
                                                    <p>{item.description ? (item.description.length > 60 ? item.description.substring(0, 60) + '...' : item.description) : 'No description available.'}</p>
                                                </div>
                                                <div className="listing-info-details">
                                                    <div className="d-flex align-items-center justify-content-start gap-4">
                                                        <div className="list-calls"><BsTelephone className="mb-0 me-2" />{item.phone || '+212 00 00 00 00'}</div>
                                                        <div className="list-distance"><BsGeoAlt className="mb-0 me-2" />{item.city?.name || 'Morocco'}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="listing-footer-item">
                                                <div className="d-flex align-items-center justify-content-between gap-2">
                                                    <div className="catdWraps">
                                                        <div className="flex-start">
                                                            {item.category && (
                                                                <Link href="#" className="d-flex align-items-center justify-content-start gap-2">
                                                                    <span className="catIcon bg-light text-dark"><BsUiRadiosGrid /></span>
                                                                    <span className="catTitle">{item.category.name}</span>
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="listing-rates">
                                                        <div className="d-flex align-items-center justify-content-start gap-1">
                                                            <span className={`ratingAvarage ${ratingAvg >= 4 ? 'bg-success' : 'bg-warning'}`}>{ratingAvg}</span>
                                                            <span className="overallrates">({ratingCount} Reviews)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                    <div className="row align-items-center justify-content-center mt-5">
                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center">
                                    <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
                                        <Link href={`/restaurants_grid?page=${page - 1}`} className="page-link" aria-label="Previous">
                                            <FaArrowLeft className="" />
                                        </Link>
                                    </li>

                                    {[...Array(totalPages || 0)].map((_, i) => {
                                        const p = i + 1;
                                        // Show limited pages logic could be added here, for now show all if not too many
                                        if (totalPages > 10 && Math.abs(p - page) > 2 && p !== 1 && p !== totalPages) return null;

                                        return (
                                            <li className={`page-item ${p === page ? 'active' : ''}`} key={p}>
                                                <Link href={`/restaurants_grid?page=${p}`} className="page-link">{p}</Link>
                                            </li>
                                        );
                                    })}

                                    <li className={`page-item ${page >= totalPages ? 'disabled' : ''}`}>
                                        <Link href={`/restaurants_grid?page=${page + 1}`} className="page-link" aria-label="Next">
                                            <FaArrowRight className="" />
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                </div>
            </section>
            <FooterTop />
            <Footer />
            <BackToTop />
        </>
    );
}
