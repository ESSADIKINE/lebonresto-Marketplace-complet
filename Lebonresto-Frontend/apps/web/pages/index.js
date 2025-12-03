import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const bg1 = '/assets/img/banner-4.jpg'
const bg2 = '/assets/img/banner-5.jpg'
const bg3 = '/assets/img/banner-6.jpg'
const bg4 = '/assets/img/banner-7.jpg'

import { FaBagShopping, FaBowlRice, FaMartiniGlass, FaMugSaucer, FaSpa } from 'react-icons/fa6'
import { BsSearch } from 'react-icons/bs'

const hero1 = '/assets/img/side-img.png'
const bg = '/assets/img/banner-1.jpg'

import NavbarLight from 'components/navbar/navbar-light'
import FormOne from 'components/form-one'
import CategoryTwo from 'components/category-two'
import PopularListingTwo from 'components/popular-listing-two'
import ExploreCity from 'components/explore-city'
import ClientOne from 'components/client-one'
import BlogOne from 'components/blog-one'
import EventOne from 'components/event-one'
import FooterTop from 'components/footer-top'
import Footer from 'components/footer'
import BackToTop from 'components/back-to-top'

export default function IndexEleven() {

	const images = [
		bg1, bg2, bg3, bg4
	];

	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) =>
				(prevIndex + 1) % images.length
			);
		}, 3000);

		return () => clearInterval(interval);
	}, [images.length]);
	return (
		<>
			<NavbarLight />
			<div className="image-cover hero-header bg-slicefull-height position-relative" style={{ backgroundImage: `url(${bg})`, backgroundColor: '#fff3f3' }}>
				<div className="container">
					<div className="row justify-content-between align-items-center">
						<div className="col-xl-7 col-lg-5 col-md-12 col-sm-12">
							<div className="position-relative d-block py-5 pt-lg-0 pt-5">
								<div className="position-relative">
									<h1 className="fw-medium">Explore Your Nearest Places <span className="text-primary">To Stay</span></h1>
									<p className="fs-5 fw-light text-muted-2">Take a little break from the work strss of everyday. Discover plan trip and explore beautiful destinations.</p>
								</div>
							</div>
							<div className="heroSearch rounded-search style-01">
								<div className="row gx-lg-2 gx-md-2 gx-3 gy-sm-2 gy-2">
									<div className="col-xl-10 col-lg-9 col-md-12">
										<div className="row gx-lg-2 gx-md-2 gx-3 gy-sm-2 gy-2">
											<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
												<div className="form-group">
													<div className="mobSearch d-flex align-items-center justify-content-start">
														<div className="flexStart ps-2"><span className="fw-semibold text-dark">Find</span></div>
														<input type="text" className="form-control fs-6 fw-medium border-0" placeholder="What are you looking for?" />
													</div>
												</div>
											</div>
											<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 single-border">
												<div className="form-group">
													<div className="mobSearch d-flex align-items-center justify-content-start">
														<div className="flexStart ps-2"><span className="fw-semibold text-dark">Where</span></div>
														<input type="text" className="form-control fs-6 fw-medium border-0" placeholder="Location" />
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-2 col-lg-3 col-md-12 col-sm-12">
										<div className="form-group">
											<button type="button" className="btn btn-primary rounded-pill full-width fw-medium"><BsSearch className="me-2" />Search</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
				<div className="imgSidefull d-none d-lg-block">
					<img src={hero1} className="img-fluid" alt="Image Side" />
				</div>
			</div>

			<section className="pb-0">
				<div className="container">
					<div className="row align-items-center justify-content-center">
						<div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
							<div className="secHeading-wrap text-center">
								<h3 className="sectionHeading">Hot & Trending <span className="text-primary">Categories</span></h3>
								<p>Explore all types of popular category for submit your listings</p>
							</div>
						</div>
					</div>
					<CategoryTwo />
				</div>
			</section>

			<section>
				<div className="container">
					<div className="row align-items-center justify-content-center">
						<div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
							<div className="secHeading-wrap text-center">
								<h3 className="sectionHeading">Popular Listings In <span className="text-primary">Chicago</span></h3>
								<p>Explore Hot & Popular Business Listings</p>
							</div>
						</div>
					</div>
					<PopularListingTwo />
				</div>
			</section>

			<section className="bg-light">
				<div className="container">
					<div className="row align-items-center justify-content-center">
						<div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
							<div className="secHeading-wrap text-center">
								<h3 className="sectionHeading">Explore Listings By <span className="text-primary">Cities</span></h3>
								<p>Our cliens love our services and give great & positive reviews</p>
							</div>
						</div>
					</div>
					<ExploreCity />
				</div>
			</section>

			<section>
				<div className="container">
					<div className="row align-items-center justify-content-center">
						<div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
							<div className="secHeading-wrap text-center">
								<h3 className="sectionHeading">Our Great <span className="text-primary">Reviews</span></h3>
								<p>Our cliens love our services and give great & positive reviews</p>
							</div>
						</div>
					</div>
					<ClientOne />
				</div>
			</section>

			<section className="light-top-gredient">
				<div className="container">
					<div className="row align-items-center justify-content-center">
						<div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
							<div className="secHeading-wrap text-center">
								<h3 className="sectionHeading">Latest Updates <span className="text-primary">News</span></h3>
								<p>Join ListingHub and get latest & trending updates about listing</p>
							</div>
						</div>
					</div>
					<BlogOne />
				</div>
			</section>

			<section className="pt-0">
				<div className="container">
					<div className="row align-items-center justify-content-center">
						<div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
							<div className="secHeading-wrap text-center">
								<h3 className="sectionHeading">Explore Upcoming <span className="text-primary">Events</span></h3>
								<p>Browse our upcoming events and join soon.</p>
							</div>
						</div>
					</div>
					<EventOne />
				</div>
			</section>

			<FooterTop />
			<Footer />
			<BackToTop />
		</>
	)
}
