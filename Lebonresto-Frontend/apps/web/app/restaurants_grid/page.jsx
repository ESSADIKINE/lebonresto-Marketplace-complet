import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavbarLight from '../../components/navbar/navbar-light';
import FilterOne from '../../components/filter-one';
import { BsCoin, BsLightningChargeFill, BsPatchCheckFill, BsSearch, BsTelephone } from 'react-icons/bs';
import { FaArrowLeft, FaArrowRight, FaHeart, FaLocationDot, FaStar } from 'react-icons/fa6';
import FooterTop from '../../components/footer-top';


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
        const result = await res.json();
        if (!result?.data && !Array.isArray(result)) {
            console.warn("API returned 200 but missing 'data' property:", result);
        }
        return result;
    } catch (error) {
        console.error("Failed to fetch restaurants:", error);
        return { data: [], total: 0, page, limit, totalPages: 0 };
    }
}

export default async function RestaurantsGrid({ searchParams }) {
    const page = parseInt(searchParams?.page || '1', 10);
    const limit = 9;
    const result = await getRestaurants(page, limit);
    let restaurants = Array.isArray(result) ? result : (result?.data || []);
    const total = Array.isArray(result) ? result.length : (result?.total || 0);
    const totalPages = Array.isArray(result) ? 1 : (result?.totalPages || 0);

    return (
        <>
            <NavbarLight />

            <div className="bg-white py-3 z-3" style={{ position: 'sticky', top: '80px', marginTop: '80px' }}>
                <FilterOne list={false} />
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
                                    <a href="#" className="py-2 px-3 bg-white dropdown-toggle toogleDrops" id="shortfilter" data-bs-toggle="dropdown" aria-expanded="false">
                                        Short Listings
                                    </a>
                                    <div className="dropdown-menu border shadow-sm">
                                        <ul className="card rounded-0 p-0">
                                            <li><a className="dropdown-item" href="#">Default Order</a></li>
                                            <li><a className="dropdown-item" href="#">Highest Rated</a></li>
                                            <li><a className="active dropdown-item" href="#">Most Reviewed</a></li>
                                            <li><a className="dropdown-item" href="#">Newest Listings</a></li>
                                            <li><a className="dropdown-item" href="#">Oldest Listings</a></li>
                                            <li><a className="dropdown-item" href="#">Featured Listings</a></li>
                                            <li><a className="dropdown-item" href="#">Most Viewed</a></li>
                                            <li><a className="dropdown-item" href="#">Short By A To Z</a></li>
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
                            const isOpen = item.resturant_status === 'Ouvert' || item.status === 'APPROVED';
                            const ratingRate = item.rating_avg || 0;

                            return (
                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" key={item.id || index}>
                                    <div className="listingCard gridLayout card rounded-3 border-0">
                                        <div className="listThumb overflow-hidden position-relative" style={{ height: '250px' }}>
                                            {isOpen ? (
                                                <div className="position-absolute start-0 top-0 ms-3 mt-3 z-2"><span className="badge badge-xs text-uppercase listOpen rounded-pill">Open</span></div>
                                            ) : (
                                                <div className="position-absolute start-0 top-0 ms-3 mt-3 z-2"><span className="badge badge-xs text-uppercase listClose rounded-pill">Close</span></div>
                                            )
                                            }

                                            {item.is_featured &&
                                                <div className="position-absolute end-0 bottom-0 me-3 mb-3 z-2"><span className="badge badge-xs featuredList rounded-pill d-flex align-items-center"><FaStar className="me-1" />Featured</span></div>
                                            }
                                            <Link href={`/restaurants/${item.id}`} className="d-block w-100 h-100 position-relative">
                                                <Image
                                                    src={restaurantImage}
                                                    className="img-fluid list-thumb object-fit"
                                                    alt={item.name}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </Link>
                                        </div>

                                        <div className="listCaption px-3 py-4">
                                            <div className="listTitle d-block mb-3">
                                                <h5 className="listItemtitle mb-2"><Link href={`/restaurants/${item.id}`}>{item.name}<span className="verified"><BsPatchCheckFill className="m-0" /></span></Link></h5>
                                                <div className="d-flex align-items-center justify-content-start flex-wrap gap-2">
                                                    <div className="list-location text-muted"><span><FaLocationDot className="me-2" />{item.city?.name || 'Morocco'}</span></div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between gap-2 border-top pt-3 mt-3">
                                                <div className="d-flex align-items-center justify-content-start gap-2">
                                                    <div className="bg-light border rounded-pill py-1 px-2">
                                                        <div className="d-inline-flex align-items-center justify-content-start gap-2">
                                                            <span className="square--25 circle bg-price text-light text-sm"><BsCoin className="lh-1 h-auto" /></span>
                                                            <span className="text-sm fw-medium">$30-$50</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-start">
                                                    <FaStar className="fa-solid fa-star text-warning"></FaStar><span className="mx-1 text-dark fw-bold">{ratingRate}</span><span className="text-muted text-md">({item.rating_count || 0})</span>
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

        </>
    );
}