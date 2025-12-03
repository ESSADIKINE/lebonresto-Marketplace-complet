import React, { useState } from 'react'
import Link from 'next/link'

const img1 = '/assets/img/gal-1.jpg'
const img2 = '/assets/img/gal-2.jpg'
const img3 = '/assets/img/gal-3.jpg'
const img4 = '/assets/img/gal-4.jpg'
const img5 = '/assets/img/gal-5.jpg'
const img6 = '/assets/img/gal-6.jpg'

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const images = [img1,img2,img3,img4,img5,img6]

export default function Galleries() {
    let [isOpen, setisOpen] = useState(false);
    let [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    let handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setisOpen(true);
    };
    const slides = images.map((image) => ({ src: image }));
    
  return (
        <div className="listingSingleblock mb-4" id="Galleries">
            <div className="SingleblockHeader">
                <Link data-bs-toggle="collapse" data-parent="#gallery" data-bs-target="#gallery" aria-controls="gallery" href="#" aria-expanded="false" className="collapsed"><h4 className="listingcollapseTitle">Gallery</h4></Link>
            </div>
            
            <div id="gallery" className="panel-collapse collapse show">
                <div className="card-body p-4 pt-2">
                    <ul className="row align-items-center justify-content-center g-3 p-0">
                        {images.map((item,index)=>{
                            return(
                                <li className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6" key={index}>
                                    <Link href="#" className="mfp-gallery d-block" onClick={() => handleImageClick(index)}><img src={item} className="img-fluid rounded" alt="Gallery Img"/></Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>

                <Lightbox
                    open={isOpen}
                    close={() => setisOpen(false)}
                    slides={slides}
                    index={currentImageIndex} 
                />
        </div>
  )
}
