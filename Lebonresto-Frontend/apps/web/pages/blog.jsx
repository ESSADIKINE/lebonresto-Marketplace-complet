import React from 'react'
import NavbarLight from 'components/navbar/navbar-light'
import Footer from 'components/footer'
import BackToTop from 'components/back-to-top'
import Link from 'next/link'

const bg = '/assets/img/title-banner.jpg'

const blogPosts = [
    {
        id: 1,
        title: "Les meilleurs restaurants avec terrasse à Casablanca",
        category: "Tendances",
        date: "15 Nov 2023",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Découvrez notre sélection des plus belles terrasses pour profiter du soleil casablancais tout en dégustant des plats exquis."
    },
    {
        id: 2,
        title: "Cuisine marocaine : 5 plats incontournables à goûter absolument",
        category: "Gastronomie",
        date: "10 Nov 2023",
        image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Au-delà du couscous et du tajine, la cuisine marocaine regorge de trésors culinaires. Voici notre top 5 des plats à ne pas manquer."
    },
    {
        id: 3,
        title: "Interview avec le Chef Karim Benjelloun",
        category: "Rencontre",
        date: "05 Nov 2023",
        image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Rencontre exclusive avec l'un des chefs les plus prometteurs de sa génération, qui revisite la cuisine traditionnelle avec modernité."
    }
]

export default function Blog() {
    return (
        <>
            <NavbarLight />

            <section className="bg-cover position-relative" style={{ backgroundImage: `url(${bg})` }} data-overlay="6">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-xl-7 col-lg-9 col-md-12 col-sm-12">
                            <div className="position-relative text-center mb-5 pt-5 pt-lg-0">
                                <h1 className="text-light display-4 fw-bold">Le Blog LeBonResto</h1>
                                <p className="text-white fs-5 opacity-75">Actualités, tendances et découvertes culinaires</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-5 pb-5">
                <div className="container">
                    <div className="row g-4">
                        {blogPosts.map(post => (
                            <div className="col-lg-4 col-md-6" key={post.id}>
                                <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
                                    <div className="position-relative">
                                        <img src={post.image} className="img-fluid w-100" style={{ height: '240px', objectFit: 'cover' }} alt={post.title} />
                                        <span className="position-absolute top-0 start-0 m-3 badge bg-primary">{post.category}</span>
                                    </div>
                                    <div className="card-body p-4">
                                        <div className="text-muted small mb-2">{post.date}</div>
                                        <h4 className="fw-bold mb-3">
                                            <Link href="#" className="text-dark text-decoration-none hover-primary">{post.title}</Link>
                                        </h4>
                                        <p className="text-muted mb-4">{post.excerpt}</p>
                                        <Link href="#" className="fw-bold text-primary text-decoration-none">Lire la suite &rarr;</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
            <BackToTop />
        </>
    )
}
