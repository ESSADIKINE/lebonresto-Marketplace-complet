import React from 'react'
const img1 = '/assets/img/prc-1.jpg'
const img2 = '/assets/img/prc-2.jpg'
const img3 = '/assets/img/prc-3.jpg'
const img4 = '/assets/img/prc-4.jpg'
const img5 = '/assets/img/prc-5.jpg'
const img6 = '/assets/img/prc-6.jpg'
import Link from 'next/link'



export default function Pricings() {

    const data = [
        {
            image:img1,
            title:'Potato Slice',
            tag:'Spicy',
            price:'$20'
        },
        {
            image:img2,
            title:'Tasty Tandoori',
            tag:'Dyno',
            price:'$45'
        },
        {
            image:img3,
            title:'Indian Thali',
            tag:'Tasty',
            price:'$120'
        },
        {
            image:img4,
            title:'Cheese Burger',
            tag:'Cold',
            price:'$50'
        },
        {
            image:img5,
            title:'Indian Thali',
            tag:'Tasty',
            price:'$120'
        },
        {
            image:img6,
            title:'Cold Coffee',
            tag:'Taste',
            price:'$35'
        },
    ]
  return (
        <div className="listingSingleblock mb-4" id="pricingss">
            <div className="SingleblockHeader">
                <Link data-bs-toggle="collapse" data-parent="#pricing" data-bs-target="#pricing" aria-controls="pricing" href="#" aria-expanded="false" className="collapsed"><h4 className="listingcollapseTitle">Menu Pricing</h4></Link>
            </div>
            
            <div id="pricing" className="panel-collapse collapse show">
                <div className="card-body p-4 pt-2">
                    <ul className="deatil_features row align-items-start g-3 p-0">
                        {data.map((item,index)=>{
                            return(
                                <li className="col-xl-4 col-lg-6 col-md-6" key={index}>
                                    <div className="pricingMenu d-block">
                                        <div className="d-flex align-items-center justify-content-between gap-2 border br-dashed rounded-pill p-2">
                                            <div className="pricingMain d-flex align-items-center justify-content-start gap-2">
                                                <div className="pricingMenuthumb"><figure className="m-0"><img src={item.image} className="img-fluid avatar-lg circle" alt=""/></figure></div>
                                                
                                                <div className="prcCaptions">
                                                    <h6 className="fw-medium mb-0">{item.title}</h6>
                                                    <p className="text-md m-0">{item.tag}</p>
                                                </div>
                                            </div>
                                            <div className="pricingCharges">
                                                <h6 className="text-primary m-0">{item.price}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                        
                    </ul>
                </div>
            </div>
        </div>
  )
}
