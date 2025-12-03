import React, { useState } from "react";
import { BsStarFill } from 'react-icons/bs'

import MultiRangeSlider from "multi-range-slider-react";
import RangeSlider from "./range-slider";

export default function ListSidebarOne() {
    const [minValue, set_minValue] = useState(25);
    const [maxValue, set_maxValue] = useState(75);

    const handleInput = (e) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };
  return (
    <>
        <div className="searchingSidebar pe-xl-5">
        
            <div className="offcanvas offcanvas-start largeshow" data-bs-scroll="true" tabIndex="-1" id="filterSlider" aria-labelledby="filterSliderLabel">
                <div className="offcanvas-header border-bottom py-3">
                    <h3 className="h5">Filters</h3>
                    <button type="button" className="btn-close text-sm d-lg-none" data-bs-dismiss="offcanvas" data-bs-target="#filterSidebar" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body overflow-x-hidden p-4 p-lg-0" id="filterSliderLabel">
                
                    <div className="searchInner">
                        
                        <div className="search-inner">
                            
                            <div className="filter-search-box mb-4">
                                <div className="form-group form-border mb-0">
                                    <input type="text" className="form-control" placeholder="Search listing.."/>
                                </div>
                            </div>
                            
                            <div className="prtsTypes mb-4">
                                <div className="filterButton">
                                        
                                    <div className="filterFlex">
                                        <input type="radio" className="btn-check" name="ratingsfilter" id="all" defaultChecked/>
                                        <label className="btn" for="all"><BsStarFill className="me-1"/>All</label>
                                    </div>
                                    
                                    <div className="filterFlex">
                                        <input type="radio" className="btn-check" name="ratingsfilter" id="threeplus"/>
                                        <label className="btn" for="threeplus"><BsStarFill className="me-1"/>3.0+</label>
                                    </div>
                                    
                                    <div className="filterFlex">
                                        <input type="radio" className="btn-check" name="ratingsfilter" id="fourplus"/>
                                        <label className="btn" for="fourplus"><BsStarFill className="me-1"/>4.0+</label>
                                    </div>
                                    
                                    <div className="filterFlex">
                                        <input type="radio" className="btn-check" name="ratingsfilter" id="fiveplus"/>
                                        <label className="btn" for="fiveplus"><BsStarFill className="me-1"/>5.0</label>	
                                    </div>
                                    
                                </div>
                            </div>
                            
                            <div className="filter-search-box mb-4">
                                <div className="filtersearch-title"><h6 className="mb-2 lh-base text-sm text-uppercase fw-medium">Categories</h6></div>
                                <div className="row align-items-center justify-content-between gy-2">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="d-flex align-items-center justify-content-center flex-wrap gap-2 mb-3">
                        
                                            <div className="form-checks flex-fill">
                                                <input type="checkbox" className="btn-check" id="eatdrink1"/>
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium full-width" for="eatdrink1">Eat & Drink</label>
                                            </div>
                                            
                                            <div className="form-checks flex-fill">
                                                <input type="checkbox" className="btn-check" id="Apartments"/>
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium full-width" for="Apartments">Apartments</label>
                                            </div>
                                            
                                            <div className="form-checks flex-fill">
                                                <input type="checkbox" className="btn-check" id="classifieds1"/>
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium full-width" for="classifieds1">Classified</label>
                                            </div>
                                            
                                            <div className="form-checks flex-fill">
                                                <input type="checkbox" className="btn-check" id="services1" checked/>
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium full-width" for="services1">Services</label>
                                            </div>
                                            
                                            <div className="form-checks flex-fill">
                                                <input type="checkbox" className="btn-check" id="gymfitness1"/>
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium full-width" for="gymfitness1">Gym & Fitness</label>
                                            </div>
                                            
                                            <div className="form-checks flex-fill">
                                                <input type="checkbox" className="btn-check" id="nightlife1"/>
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium full-width" for="nightlife1">Night Life</label>
                                            </div>
                                            
                                            <div className="form-checks flex-fill">
                                                <input type="checkbox" className="btn-check" id="coachings1"/>
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium full-width" for="coachings1">Coaching</label>
                                            </div>
                                            
                                            <div className="form-checks flex-fill">
                                                <input type="checkbox" className="btn-check" id="shoppings1"/>
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium full-width" for="shoppings1">Shopping</label>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="filter-search-box mb-4">
                                <div className="filtersearch-title"><h6 className="mb-2 lh-base text-sm text-uppercase fw-medium">Price Range in USD</h6></div>
                                <div className="row align-items-center justify-content-between">
                                    <div className="col-12">
                                        <div className="searchBar-single-wrap mt-2">
                                           <RangeSlider/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="filter-search-box mb-4">
                                <div className="filtersearch-title"><h6 className="mb-2 lh-base text-sm text-uppercase fw-medium">Distance Filter in Km</h6></div>
                                <div className="row align-items-center justify-content-between">
                                    <div className="col-12">
                                        <div className="searchBar-single-wrap mt-2">
                                            <RangeSlider/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="filter-search-box mb-4">
                            <div className="filtersearch-title"><h6 className="mb-2 lh-base text-sm text-uppercase fw-medium">Amenities</h6></div>
                                <div className="row align-items-center justify-content-between gy-2">
                                    <div className="col-6">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="airconditions"/>
                                            <label className="form-check-label" for="airconditions">Air Condition</label>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="gardens"/>
                                            <label className="form-check-label" for="gardens">Garden</label>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="parkings"/>
                                            <label className="form-check-label" for="parkings">Parking</label>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="petallow"/>
                                            <label className="form-check-label" for="petallow">Pet Allow</label>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="freewifi"/>
                                            <label className="form-check-label" for="freewifi">Free WiFi</label>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="breakfast"/>
                                            <label className="form-check-label" for="breakfast">Breakfast</label>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="dinner"/>
                                            <label className="form-check-label" for="dinner">Dinner</label>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="smoking"/>
                                            <label className="form-check-label" for="smoking">Smoking</label>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="swimming"/>
                                            <label className="form-check-label" for="swimming">Swimming</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="form-group filter_button mb-0">
                                <button type="submit" className="btn btn-primary fw-medium full-width">Save & Update</button>
                            </div>
                        </div>							
                    </div>
                </div>
                
            </div>
        </div>
        <a href="#filterSlider" data-bs-toggle="offcanvas" data-bs-target="#filterSlider" aria-controls="filterSlider" className="fixed-bottom z-sticky d-lg-none filterButtons"><i className="bi bi-funnel"></i>Filter Options</a>
    </>
    
  )
}
