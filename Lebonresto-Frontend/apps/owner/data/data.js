import { BsBackpack, BsBarChart, BsBasket2, BsCameraReels, BsCodeSlash, BsCoin, BsCreditCard2Back, BsCupHot, BsCupStraw, BsEnvelopeAt, BsFacebook, BsFileEarmarkTextFill, BsGraphUpArrow, BsHouseCheck, BsInstagram, BsLamp, BsLayers, BsLinkedin, BsLungs, BsPatchCheck, BsPatchQuestion, BsPeopleFill, BsPersonCheck, BsPinMap, BsPinMapFill, BsPinterest, BsShop, BsSuitHeart, BsTwitter, BsYelp } from "react-icons/bs";
import { FaDumbbell, FaStar, FaStarHalf, FaStarHalfStroke } from "react-icons/fa6";

const list1 = '/assets/img/list-1.jpg'
const list2 = '/assets/img/list-2.jpg'
const list3 = '/assets/img/list-3.jpg'
const list4 = '/assets/img/list-4.jpg'
const list5 = '/assets/img/list-5.jpg'
const list6 = '/assets/img/list-6.jpg'
const list7 = '/assets/img/list-7.jpg'
const list8 = '/assets/img/list-8.jpg'
const list9 = '/assets/img/list-9.jpg'

const team1 = '/assets/img/team-1.jpg'
const team2 = '/assets/img/team-2.jpg'
const team3 = '/assets/img/team-3.jpg'
const team4 = '/assets/img/team-4.jpg'
const team5 = '/assets/img/team-5.jpg'
const team6 = '/assets/img/team-6.jpg'
const team7 = '/assets/img/team-7.jpg'
const team8 = '/assets/img/team-8.jpg'
const team9 = '/assets/img/team-9.jpg'

const blog1 = '/assets/img/blog-2.jpg'
const blog2 = '/assets/img/blog-3.jpg'
const blog3 = '/assets/img/blog-4.jpg'
const blog4 = '/assets/img/blog-5.jpg'
const blog5 = '/assets/img/blog-6.jpg'
const blog6 = '/assets/img/blog-1.jpg'

const cats1 = '/assets/img/cats/catt-1.jpg'
const cats2 = '/assets/img/cats/catt-2.jpg'
const cats3 = '/assets/img/cats/catt-3.jpg'
const cats4 = '/assets/img/cats/catt-4.jpg'
const cats5 = '/assets/img/cats/catt-5.jpg'
const cats6 = '/assets/img/cats/catt-6.jpg'
const cats7 = '/assets/img/cats/catt-7.jpg'
const cats8 = '/assets/img/cats/catt-8.jpg'
const cats9 = '/assets/img/cats/catt-9.jpg'
const cats10 = '/assets/img/cats/catt-10.jpg'

const loction1 = '/assets/img/city/location-1.jpg'
const loction2 = '/assets/img/city/location-2.jpg'
const loction3 = '/assets/img/city/location-3.jpg'
const loction4 = '/assets/img/city/location-4.jpg'
const loction5 = '/assets/img/city/location-5.jpg'
const loction6 = '/assets/img/city/location-6.jpg'

const event1 = '/assets/img/eve-1.jpg'
const event2 = '/assets/img/eve-2.jpg'
const event3 = '/assets/img/eve-3.jpg'

const review1 = '/assets/img/google.png'
const review2 = '/assets/img/trustpilot.png'
const review3 = '/assets/img/capterra.png'

export const categoryData = [
    {
        image:cats1,
        icon:BsBackpack,
        title:'Showroom',
        list:'103 Lists'
    },
    {
        image:cats2,
        icon:BsBasket2,
        title:'Fashion & Beauty',
        list:'110 Lists'
    },
    {
        image:cats3,
        icon:BsHouseCheck,
        title:'Real Estate',
        list:'35 Lists'
    },
    {
        image:cats4,
        icon:FaDumbbell,
        title:'Health & Fitness',
        list:'120 Lists'
    },
    {
        image:cats5,
        icon:BsShop,
        title:'Business Shop',
        list:'69 Lists'
    },
    {
        image:cats6,
        icon:BsCupHot,
        title:'Coffe Shop',
        list:'78 Lists'
    },
    {
        image:cats7,
        icon:BsCupStraw,
        title:'Restaurants',
        list:'69 Lists'
    },
    {
        image:cats8,
        icon:BsLungs,
        title:'Hospital & Med',
        list:'75 Lists'
    },
    {
        image:cats9,
        icon:BsLamp,
        title:'Wedding & Events',
        list:'16 Lists'
    },
    {
        image:cats10,
        icon:BsCupHot,
        title:'Coffe Shop',
        list:'32 Lists'
    },
    {
        image:cats9,
        icon:BsLayers,
        title:'Account Finance',
        list:'16 Lists'
    },
    {
        image:cats10,
        icon:BsCodeSlash,
        title:'Web Development',
        list:'32 Lists'
    },
]

export const listData = [
    {
        id:1,
        image:list1,
        user:team1,
        status:'open',
        featured:true,
        title:'The Big Bumbble Gym',
        desc:'Cicero famously orated against his political.',
        call:'+42 515 635 4758',
        loction:'Tokyo Japan',
        tag:'Fitness',
        tagIcon:FaDumbbell,
        tagIconStyle:'catIcon me-2 cats-1',
        review:'46 Reviews',
        rating:'good',
        ratingRate:'4.5',
        instantBooking:false
    },
    {
        id:2,
        image:list2,
        user:team2,
        status:'open',
        featured:false,
        title:'Greenvally Real Estate',
        desc:'Cicero famously orated against his political.',
        call:'+42 515 635 6150',
        loction:'Paris France',
        tag:'Real Estate',
        tagIcon:BsHouseCheck,
        tagIconStyle:'catIcon me-2 cats-2',
        review:'35 Reviews',
        rating:'midium',
        ratingRate:'4.3',
        instantBooking:true
    },
    {
        id:3,
        image:list3,
        user:team3,
        status:'closed',
        featured:true,
        title:'Shree Wedding Planner',
        desc:'Cicero famously orated against his political.',
        call:'+42 515 635 4785',
        loction:'Toronto Canada',
        tag:'Weddings',
        tagIcon:BsLamp,
        tagIconStyle:'catIcon me-2 cats-3',
        review:'12 Reviews',
        rating:'excellent',
        ratingRate:'4.8',
        instantBooking:false
    },
    {
        id:4,
        image:list4,
        user:team4,
        status:'open',
        featured:false,
        title:'The Blue Ley Light',
        desc:'Cicero famously orated against his political.',
        call:'+42 515 635 6358',
        loction:'Sydney Australia',
        tag:'Restaurant',
        tagIcon:BsCupStraw,
        tagIconStyle:'catIcon me-2 cats-4',
        review:'72 Reviews',
        rating:'good',
        ratingRate:'4.6',
        instantBooking:true
    },
    {
        id:5,
        image:list5,
        user:team5,
        status:'close',
        featured:true,
        title:'Shreya Study Center',
        desc:'Cicero famously orated against his political.',
        call:'+42 515 635 0210',
        loction:'Berlin Germany',
        tag:'Education',
        tagIcon:FaDumbbell,
        tagIconStyle:'catIcon me-2 cats-5',
        review:'112 Reviews',
        rating:'midium',
        ratingRate:'4.2',
        instantBooking:false
    },
    {
        id:6,
        image:list6,
        user:team6,
        status:'open',
        featured:false,
        title:'Mahroom Garage & Workshop',
        desc:'Cicero famously orated against his political.',
        call:'+42 515 635 3251',
        loction:'Moscow Russia',
        tag:'Showroom',
        tagIcon:BsBackpack,
        tagIconStyle:'catIcon me-2 cats-6',
        review:'52 Reviews',
        rating:'excellent',
        ratingRate:'4.8',
        instantBooking:true
    },
    {
        id:7,
        image:list7,
        user:team7,
        status:'open',
        featured:true,
        title:'Creative Wedding Planner',
        desc:'Cicero famously orated against his political.',
        call:'+42 515 635 4758',
        loction:'Rome Italy',
        tag:'Wedding',
        tagIcon:FaDumbbell,
        tagIconStyle:'catIcon me-2 cats-1',
        review:'46 Reviews',
        rating:'good',
        ratingRate:'4.5',
        instantBooking:false
    },
    {
        id:8,
        image:list8,
        user:team8,
        status:'close',
        featured:true,
        title:'The Great Dream Palace',
        desc:'Cicero famously orated against his political.',
        call:'+42 515 635 5426',
        loction:'Mumbai India',
        tag:'Spa',
        tagIcon:BsCupHot,
        tagIconStyle:'catIcon me-2 cats-1',
        review:'42 Reviews',
        rating:'excellent',
        ratingRate:'4.9',
        instantBooking:true
    },
    {
        id:9,
        image:list9,
        user:team9,
        status:'open',
        featured:true,
        title:'Agroo Spa & Massage Center',
        desc:'Cicero famously orated against his political.',
        call:'+42 515 635 2136',
        loction:'Athens Greece',
        tag:'Eat & Drink ',
        tagIcon:BsBasket2,
        tagIconStyle:'catIcon me-2 cats-8',
        review:'76 Reviews',
        rating:'good',
        ratingRate:'4.7',
        instantBooking:false
    },
]

export const reviewData = [
    {
        rate:[FaStar,FaStar,FaStar,FaStar,FaStar],
        title:'"One of the Superb Platform"',
        desc:`Absolutely love Advertize! whenever I'm in need of finding a job, Advertize is my #1 go to! wouldn't look anywhere else.`,
        image:team1,
        name:'Aman Diwakar',
        position:'General Manager'
    },
    {
        rate:[FaStar,FaStar,FaStar,FaStar,FaStar],
        title:'"One of the Superb Platform"',
        desc:`Overall, the Advertize application is a powerful tool for anyone in the job market. Its reliability, extensive job listings, and user-friendly..`,
        image:team2,
        name:'Ridhika K. Sweta',
        position:'CEO of Agreeo'
    },
    {
        rate:[FaStar,FaStar,FaStar,FaStar,FaStar],
        title:'"One of the Superb Platform"',
        desc:`I love this Advertize app. it's more legit than the other ones with advertisement. Once I uploaded my resume, then employers...`,
        image:team3,
        name:'Shushil Kumar Yadav',
        position:'Brand Manager'
    },
    {
        rate:[FaStar,FaStar,FaStar,FaStar,FaStar],
        title:'"One of the Superb Platform"',
        desc:`Advertize the best job finder app out there right now.. they also protect you from spammers so the only emails I get due to...`,
        image:team4,
        name:'Ritika K. Mishra',
        position:'HR Head at Google'
    },
    {
        rate:[FaStar,FaStar,FaStar,FaStar,FaStar],
        title:'"One of the Superb Platform"',
        desc:`Advertize the best job finder app out there right now.. they also protect you from spammers so the only emails I get due to...`,
        image:team5,
        name:'Shree K. Patel',
        position:'Chief Executive'
    },
    {
        rate:[FaStar,FaStar,FaStar,FaStar,FaStar],
        title:'"One of the Superb Platform"',
        desc:`Advertize the best job finder app out there right now.. they also protect you from spammers so the only emails I get due to...`,
        image:team6,
        name:'Sarwan Kumar Patel',
        position:'Chief Executive'
    },
]

export const blogData = [
    {
        id:1,
        image:blog1,
        title:'10 Must-Have Bootstrap Templates for Modern Web Design',
        desc:"Think of a news blog that's filled with content political against opponent Lucius Sergius Catilina. Hourly on the day of going live.",
        date:'13th Sept 2025',
        views:'12k Views'
    },
    {
        id:2,
        image:blog2,
        title:'Top 5 Bootstrap Themes for E-commerce Websites.',
        desc:"Think of a news blog that's filled with content political against opponent Lucius Sergius Catilina. Hourly on the day of going live.",
        date:'29th Nov 2025',
        views:'33k Views'
    },
    {
        id:3,
        image:blog3,
        title:'The Ultimate Guide to Customizing Bootstrap Templates',
        desc:"Think of a news blog that's filled with content political against opponent Lucius Sergius Catilina. Hourly on the day of going live.",
        date:'13th March 2025',
        views:'15k Views'
    },
    {
        id:4,
        image:blog4,
        title:'Top 10 Free Bootstrap Templates for Your Next Project',
        desc:"Think of a news blog that's filled with content political against opponent Lucius Sergius Catilina. Hourly on the day of going live.",
        date:'5th May 2025',
        views:'12k Views'
    },
    {
        id:5,
        image:blog5,
        title:'Creating Stunning Landing Pages with Bootstrap: Best Practices',
        desc:"Think of a news blog that's filled with content political against opponent Lucius Sergius Catilina. Hourly on the day of going live.",
        date:'19th June 2025',
        views:'33k Views'
    },
    {
        id:6,
        image:blog6,
        title:'The Benefits of Using Bootstrap for Your Web Development Projects',
        desc:"Think of a news blog that's filled with content political against opponent Lucius Sergius Catilina. Hourly on the day of going live.",
        date:'20th June 2025',
        views:'15k Views'
    },
]

export const footerLink1  = ['About ListingHub','Submit Listing','ListingHub Report','Careers']

export const footerLink2  = ['Trust & Safety','Investor Relations','Terms of Services','Paid Advertising','ListingHub Blog']

export const footerLink3  = ['Trust & Safety','Investor Relations','Terms of Services','Paid Advertising','ListingHub Blog']

export const cityData = [
    {
        image:loction1,
        gridClass:'col-xl-6 col-lg-6 col-md-4 col-sm-6',
        listing:'16 Listing',
        name:'Jersey City',
        tag:['San Diego','New York','Dallas','Denver']
    },
    {
        image:loction2,
        gridClass:'col-xl-3 col-lg-3 col-md-4 col-sm-6',
        listing:'24 Listing',
        name:'San Diego',
        tag:['San Diego','New York','Dallas','Denver']
    },
    {
        image:loction3,
        gridClass:'col-xl-3 col-lg-3 col-md-4 col-sm-6',
        listing:'30 Listing',
        name:'New Orleans',
        tag:['San Diego','New York','Dallas','Denver']
    },
    {
        image:loction4,
        gridClass:'col-xl-3 col-lg-3 col-md-4 col-sm-6',
        listing:'10 Listing',
        name:'San Antonio',
        tag:['San Diego','New York','Dallas','Denver']
    },
    {
        image:loction5,
        gridClass:'col-xl-3 col-lg-3 col-md-4 col-sm-6',
        listing:'22 Listing',
        name:'Los Angeles',
        tag:['San Diego','New York','Dallas','Denver']
    },
    {
        image:loction6,
        gridClass:'col-xl-6 col-lg-6 col-md-4 col-sm-6',
        listing:'12 Listing',
        name:'San Francisco',
        tag:['San Diego','New York','Dallas','Denver']
    },
]

export const eventData = [
    {
        image:event1,
        date:'13',
        month:'March',
        tag:'Cooking',
        tagIcon:BsCupHot,
        iconStyle:'badge badge-xs badge-danger',
        title:'Learn Cooc with Shree Patel',
        time:'10:30 AM To 14:40 PM'
    },
    {
        image:event2,
        date:'5',
        month:'May',
        tag:'Nightlife',
        tagIcon:BsCupHot,
        iconStyle:'badge badge-xs badge-success',
        title:'Enjoy with Adobe Ceremoney',
        time:'20:0 AM To 22:30 PM'
    },
    {
        image:event3,
        date:'19',
        month:'June',
        tag:'Workshop',
        tagIcon:BsCupHot,
        iconStyle:'badge badge-xs badge-warning',
        title:'Join AI Community Workshop',
        time:'8:30 AM To 12:20 PM'
    },
]

export const workData = [
    {
        icon:BsPinMap,
        title:'Find Your Dream Place',
        desc:'Cicero famously orated against his political opponent Lucius wow abutere Sergius Catilina. Occasionally the first Oration.'
    },
    {
        icon:BsEnvelopeAt,
        title:'Contact Listing Owners',
        desc:'Cicero famously orated against his political opponent Lucius wow abutere Sergius Catilina. Occasionally the first Oration.'
    },
    {
        icon:BsPatchCheck,
        title:'Make Your Reservation',
        desc:'Cicero famously orated against his political opponent Lucius wow abutere Sergius Catilina. Occasionally the first Oration.'
    },
]
export const reviewData2 = [
    {
        image:review1,
        rate:'4.8',
        star:[FaStar,FaStar,FaStar,FaStar,FaStarHalfStroke],
        reviews:'422k Reviews'
    },
    {
        image:review2,
        rate:'4.8',
        star:[FaStar,FaStar,FaStar,FaStar,FaStarHalfStroke],
        reviews:'422k Reviews'
    },
    {
        image:review3,
        rate:'4.8',
        star:[FaStar,FaStar,FaStar,FaStar,FaStarHalfStroke],
        reviews:'422k Reviews'
    },
]

export const adminCounter = [
    {
        icon:BsPinMapFill,
        iconStyle:'text-success',
        number:23,
        symbol:'',
        title:'Active Listings',
        bg:'bg-light-success'
    },
    {
        icon:BsGraphUpArrow,
        iconStyle:'text-danger',
        number:32,
        symbol:'K',
        title:'Total Views',
        bg:'bg-light-danger'
    },
    {
        icon:BsSuitHeart,
        iconStyle:'text-warning',
        number:4,
        symbol:'K',
        title:'Total Saved',
        bg:'bg-light-warning'
    },
    {
        icon:BsYelp,
        iconStyle:'text-info',
        number:88,
        symbol:'',
        title:'Total Reviews',
        bg:'bg-light-info'
    },
]

export const chatData = [
    {
        image:team8,
        name:'Warlinton Diggs',
        time:'08:20 AM',
        msg:'How are you stay dude?',
        pandding:false,
        message:0
    },
    {
        image:team7,
        name:'Chad M. Pusey',
        time:'06:40 AM',
        msg:'Hey man it is possible to pay mo..',
        pandding:true,
        message:5
    },
    {
        image:team6,
        name:'Mary D. Homer',
        time:'08:10 AM',
        msg:'Dear you have a spacial offers...',
        pandding:true,
        message:3
    },
    {
        image:team5,
        name:'Marc S. Solano',
        time:'10:10 AM',
        msg:'Sound good! We will meet you aft...',
        pandding:false,
        message:0
    },
    {
        image:team4,
        name:'Sandra W. Barge',
        time:'07:20 PM',
        msg:'I am also good and how are...',
        pandding:true,
        message:2
    },
]

export const invoiceData = [
    {
       name:'Basic Platinum Plan',
       id:'#PC01362' ,
       status:'Paid',
       date:'Sept 13,2025'
    },
    {
       name:'Standard Platinum Plan',
       id:'#PC01363' ,
       status:'Unpaid',
       date:'March 13,2025'
    },
    {
       name:'Extended Platinum Plan',
       id:'#PC01364' ,
       status:'On Hold',
       date:'June 19,2025'
    },
    {
       name:'Basic Platinum Plan',
       id:'#PC01365' ,
       status:'Paid',
       date:'June 20,2025'
    },
]

export const bookingData = [
    {
        image:team1,
        title:'Mubarak Barbar Shop',
        tag:'Salon',
        pending:true,
        unpaid:true,
        approved:false,
        cancelled:false,
        reject:true,
        approve:true,
        sendMsg:true,
        date:'13.03.2025 at 1:00 PM',
        info:'02 Adults, 01 Child',
        name:'Kallay Mortin',
        contact:'41 125 254 2563',
        price:'$25.50'
    },
    {
        image:team2,
        title:'Sunrise Apartment',
        tag:'Apartment',
        pending:false,
        unpaid:false,
        approved:true,
        cancelled:false,
        reject:false,
        approve:false,
        sendMsg:true,
        date:'14.06.2024 - 15.06.2025 at 11:30 AM',
        info:'02 Adults, 02 Child',
        name:'Kalla Adroise',
        contact:'41 125 254 6258',
        price:'$17,00'
    },
    {
        image:team3,
        title:'Blue Star Cafe',
        tag:'Restaurants',
        pending:false,
        unpaid:false,
        approved:false,
        cancelled:true,
        reject:false,
        approve:false,
        sendMsg:false,
        date:'12.05.2024 at 16:30 AM',
        info:'02 Adults, 01 Child',
        name:'Sorika Michel',
        contact:'441 125 254 625',
        price:'$245.00'
    },
    {
        image:team4,
        title:'now Valley Resort',
        tag:'Hotel',
        pending:false,
        unpaid:true,
        approved:true,
        cancelled:false,
        reject:false,
        approve:true,
        sendMsg:true,
        date:'14.10.2024 at 08:30 PM',
        info:'03 Adults, 01 Child',
        name:'Kallay Mortin',
        contact:'41 125 254 2563',
        price:'$25.50'
    },
]
export const adminListing = [
    {
        image:list1,
        title:'The Big Bumbble Gym',
        location:'410 Apex Avenue, California USA',
        review:'412 Reviews',
        expired:false
    },
    {
        image:list2,
        title:'Greenvally Real Estate',
        location:'410 Apex Avenue, California USA',
        review:'152 Reviews',
        expired:true
    },
    {
        image:list3,
        title:'The Blue Ley Light',
        location:'520 Adde Resort, Liverpool UK',
        review:'302 Reviews',
        expired:false
    },
    {
        image:list4,
        title:'Shreya Study Center',
        location:'102 Hozri Avenue, California USA',
        review:'180 Reviews',
        expired:false
    },
]

export const message = [
    {
        id:1,
        image:team1,
        name:'Karan Shivraj',
        time:'Today'
    },
    {
        id:2,
        image:team2,
        name:'Shree Preet',
        time:'just Now'
    },
    {
        id:3,
        image:team3,
        name:'Shikhar Musk',
        time:'30 min ago'
    },
    {
        id:4,
        image:team4,
        name:'Mortin Mukkar',
        time:'Yesterday'
    },
    {
        id:5,
        image:team5,
        name:'Melly Arjun',
        time:'Today'
    },
    {
        id:6,
        image:team6,
        name:'Mortin Mukkar',
        time:'Yesterday'
    },
]

export const adminReview =[
    {
        image:team1,
        name:'Karan Shivraj',
        date:'13th March 2025',
        desc:'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.'
    },
    {
        image:team2,
        name:'Shree Preet',
        date:'5th May 2025',
        desc:'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.'
    },
    {
        image:team3,
        name:'Shikhar Musk',
        date:'19th June 2025',
        desc:'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.'
    },
    {
        image:team4,
        name:'Mortin Mukkar',
        date:'20th June 2025',
        desc:'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.'
    },
]

export const earning = [
    {
        name:'Swarna Apartment',
        id:'#PC01362',
        date:'Dec 10,2025',
        value:'$200 USD',
        free:'$17.10 USD'
    },
    {
        name:'Blue Cafe',
        id:'#PC01363',
        date:'Jan 12,2025',
        value:'$150 USD',
        free:'$12.30 USD'
    },
    {
        name:'Kanoop Barbar Shop',
        id:'#PC01364',
        date:'Sep 22,2023',
        value:'$75.50 USD',
        free:'$10.20 USD'
    },
    {
        name:'Classic Casino',
        id:'#PC01365',
        date:'Dec 16,2024',
        value:'$652 USD',
        free:'$80.90 USD'
    },
]

export const counterData = [
    {
        number:145,
        symbol:'K',
        title:'Daily New Visitors'
    },
    {
        number:670,
        symbol:'',
        title:'Active Listings'
    },
    {
        number:22,
        symbol:'',
        title:'Won Awards'
    },
    {
        number:642,
        symbol:'K',
        title:'Happy Customers'
    },
]

export const teamData = [
    {
        image:team1,
        name:'Julia F. Mitchell',
        position:'Chief Executive'
    },
    {
        image:team2,
        name:'Maria P. Thomas',
        position:'Co-Founder'
    },
    {
        image:team3,
        name:'Willa R. Fontaine',
        position:'Field Manager'
    },
    {
        image:team4,
        name:'Rosa R. Anderson',
        position:'Business Executive'
    },
    {
        image:team5,
        name:'Jacqueline J. Miller',
        position:'Account Manager'
    },
    {
        image:team6,
        name:'Oralia R. Castillo',
        position:'Writing Manager'
    },
    {
        image:team7,
        name:'Lynda W. Ruble',
        position:'Team Manager'
    },
]
export const mostViewBlog = [
    {
        image:blog1,
        title:'Top 10 Free Bootstrap Templates for Your Next Project',
        date:'13th Sept 2025'
    },
    {
        image:blog2,
        title:'Top 10 Free Bootstrap Templates for Your Next Project',
        date:'29th Nov 2025'
    },
    {
        image:blog3,
        title:'Top 10 Free Bootstrap Templates for Your Next Project',
        date:'13th March 2025'
    },
    {
        image:blog4,
        title:'Top 10 Free Bootstrap Templates for Your Next Project',
        date:'5th May 2025'
    },
    {
        image:blog5,
        title:'Top 10 Free Bootstrap Templates for Your Next Project',
        date:'19th June 2025'
    },
]

export const blogTag = ['Job','Web Design','Development','Figma','Photoshop','HTML']

export const blogSocial = [
    BsFacebook,BsTwitter,BsInstagram,BsPinterest,BsLinkedin
]

export const helpData = [
    {
        icon:BsPeopleFill,
        title:'Community',
        desc:`Think of a news blog that's filled with content hourly on the day of going live.`,
        tag:['Share','Network','Discussion']
    },
   
    {
        icon:BsFileEarmarkTextFill,
        title:'Order',
        desc:`Think of a news blog that's filled with content hourly on the day of going live.`,
        tag:['Tracking','Delivery','Management']
    },
    {
        icon:BsCoin,
        title:'Refund Policy',
        desc:`Think of a news blog that's filled with content hourly on the day of going live.`,
        tag:['Methods','Process']
    },
    {
        icon:BsPersonCheck,
        title:'Account Issues',
        desc:`Think of a news blog that's filled with content hourly on the day of going live.`,
        tag:['Profile','Settings','Password']
    },
    {
        icon:BsBarChart,
        title:'Business Helps',
        desc:`Think of a news blog that's filled with content hourly on the day of going live.`,
        tag:['Dashboard','Report','Logistics']
    },
    {
        icon:BsCreditCard2Back,
        title:'Payment',
        desc:`Think of a news blog that's filled with content hourly on the day of going live.`,
        tag:['Methods','VAT','Security']
    },
    {
        icon:BsCameraReels,
        title:'Guides',
        desc:`Think of a news blog that's filled with content hourly on the day of going live.`,
        tag:['Tutorials','Blogs','Newsletters']
    },
    {
        icon:BsPatchQuestion,
        title:`FAQ's`,
        desc:`Think of a news blog that's filled with content hourly on the day of going live.`,
        tag:['Help','Articles']
    },
]

export const articles = [
    {
        title:'What are Favorites?',
        desc:`"Favorites" is a feature that allows you to save your treasured items on Envato Market. So if you see something you like, but you’re not ready to u...`
    },
    {
        title:'How Do I Add Or Change My Billing Details?',
        desc:`"Favorites" is a feature that allows you to save your treasured items on Envato Market. So if you see something you like, but you’re not ready to u...`
    },
    {
        title:'How do I change my username?',
        desc:`"Favorites" is a feature that allows you to save your treasured items on Envato Market. So if you see something you like, but you’re not ready to u...`
    },
    {
        title:'How do I change my email address?',
        desc:`"Favorites" is a feature that allows you to save your treasured items on Envato Market. So if you see something you like, but you’re not ready to u...`
    },
    {
        title:`I'm not receiving the verification email`,
        desc:`"Favorites" is a feature that allows you to save your treasured items on Envato Market. So if you see something you like, but you’re not ready to u...`
    },
    {
        title:'How do I change my password?',
        desc:`"Favorites" is a feature that allows you to save your treasured items on Envato Market. So if you see something you like, but you’re not ready to u...`
    },
]

export const faqData1 = [
    {
        id:'collapseOne',
        title:'How to Meet ListingHub Directory Agents?',
        desc:`In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements.`
    },
    {
        id:'collapseTwo',
        title:'Can I see Property Visualy?',
        desc:`In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements.`
    },
    {
        id:'collapseThree',
        title:'Can We Sell it?',
        desc:`In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements.`
    },
    {
        id:'collapseFour',
        title:'Can We Customized it According me?',
        desc:`In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements.`
    },
    {
        id:'collapseFive',
        title:'Can We Get Any Extra Services?',
        desc:`In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements.`
    },
]
export const faqData2 = [
    {
        id:'collapseOne2',
        title:'Can We Refund it Within 7 Days?',
        desc:`In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements.`
    },
    {
        id:'collapseTwo2',
        title:'Can We Pay Via PayPal Service?',
        desc:`In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements.`
    },
    {
        id:'collapseThree2',
        title:'Will You Accept American Express Card?',
        desc:`In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements.`
    },
    {
        id:'collapseFour2',
        title:'Will You Charge Monthly Wise?',
        desc:`In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements.`
    },
    {
        id:'collapseFive2',
        title:'Can We Get Any Extra Services?',
        desc:`In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements.`
    },
]
export const faqData3 = [
    {
        id:'collapseOne3',
        title:'Realcout Agent Can Chat Online?',
        desc:`In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements.`
    },
    {
        id:'collapseTwo3',
        title:'Can I Call Agent on Site?',
        desc:`In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements.`
    },
    {
        id:'collapseThree3',
        title:'Is This Collaborate with Oyo?',
        desc:`In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements.`
    },
]