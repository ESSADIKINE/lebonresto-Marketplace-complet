export const cities = [
    { id: 1, name: 'Casablanca', slug: 'casablanca', count: 150, image: '/images/cities/casablanca.jpg' },
    { id: 2, name: 'Rabat', slug: 'rabat', count: 80, image: '/images/cities/rabat.jpg' },
    { id: 3, name: 'Marrakech', slug: 'marrakech', count: 200, image: '/images/cities/marrakech.jpg' },
    { id: 4, name: 'Tanger', slug: 'tanger', count: 60, image: '/images/cities/tanger.jpg' },
    { id: 5, name: 'Agadir', slug: 'agadir', count: 45, image: '/images/cities/agadir.jpg' },
];

export const categories = [
    { id: 1, name: 'Marocain', slug: 'marocain', icon: 'tajine', count: 120 },
    { id: 2, name: 'Italien', slug: 'italien', icon: 'pizza', count: 85 },
    { id: 3, name: 'Asiatique', slug: 'asiatique', icon: 'sushi', count: 60 },
    { id: 4, name: 'Français', slug: 'francais', icon: 'croissant', count: 50 },
    { id: 5, name: 'Fast Food', slug: 'fast-food', icon: 'burger', count: 90 },
    { id: 6, name: 'Café & Brunch', slug: 'cafe-brunch', icon: 'coffee', count: 70 },
];

export const tags = [
    { id: 1, name: 'Terrasse', slug: 'terrasse' },
    { id: 2, name: 'Vue mer', slug: 'vue-mer' },
    { id: 3, name: 'Wi-Fi gratuit', slug: 'wifi' },
    { id: 4, name: 'Parking', slug: 'parking' },
    { id: 5, name: 'Livraison', slug: 'livraison' },
    { id: 6, name: 'Familial', slug: 'familial' },
    { id: 7, name: 'Romantique', slug: 'romantique' },
    { id: 8, name: 'Halal', slug: 'halal' },
];

export const restaurants = [
    {
        id: 1,
        name: 'Le Jardin de Jade',
        slug: 'le-jardin-de-jade',
        city: 'Casablanca',
        category: 'Marocain',
        rating: 4.8,
        reviewCount: 124,
        priceRange: '€€',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Terrasse', 'Familial', 'Halal'],
        address: '12 Rue des Oliviers, Maarif',
        phone: '+212 522 12 34 56',
        email: 'contact@jardindejade.ma',
        description: 'Un restaurant marocain authentique offrant une expérience culinaire raffinée dans un cadre verdoyant et apaisant au cœur de Casablanca.',
        isOpen: true,
        openingHours: '12:00 - 23:00',
        coordinates: { lat: 33.5731, lng: -7.5898 }
    },
    {
        id: 2,
        name: 'Luigi Ristorante',
        slug: 'luigi-ristorante',
        city: 'Rabat',
        category: 'Italien',
        rating: 4.5,
        reviewCount: 89,
        priceRange: '€€€',
        image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Romantique', 'Vin', 'Parking'],
        address: '45 Avenue Mohammed V, Agdal',
        phone: '+212 537 77 88 99',
        email: 'info@luigi.ma',
        description: 'Les meilleures pâtes fraîches et pizzas au feu de bois de Rabat, préparées par notre chef italien.',
        isOpen: true,
        openingHours: '12:00 - 23:30',
        coordinates: { lat: 34.0209, lng: -6.8416 }
    },
    {
        id: 3,
        name: 'Sushi Zen',
        slug: 'sushi-zen',
        city: 'Marrakech',
        category: 'Asiatique',
        rating: 4.2,
        reviewCount: 56,
        priceRange: '€€',
        image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Livraison', 'Wi-Fi gratuit'],
        address: 'Boulevard Mohamed VI, Guéliz',
        phone: '+212 524 44 55 66',
        email: 'order@sushizen.ma',
        description: 'Une fusion de saveurs japonaises traditionnelles et modernes.',
        isOpen: false,
        openingHours: '18:00 - 00:00',
        coordinates: { lat: 31.6295, lng: -7.9811 }
    },
    {
        id: 4,
        name: 'La Brasserie Française',
        slug: 'la-brasserie-francaise',
        city: 'Casablanca',
        category: 'Français',
        rating: 4.6,
        reviewCount: 210,
        priceRange: '€€€',
        image: 'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1514362545857-3bc16549766b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Vue mer', 'Romantique', 'Valet'],
        address: 'Corniche de Casablanca',
        phone: '+212 522 99 88 77',
        email: 'reservation@brasserie.ma',
        description: 'Gastronomie française classique avec une vue imprenable sur l\'océan Atlantique.',
        isOpen: true,
        openingHours: '12:00 - 01:00',
        coordinates: { lat: 33.6031, lng: -7.6635 }
    },
    {
        id: 5,
        name: 'Burger House',
        slug: 'burger-house',
        city: 'Tanger',
        category: 'Fast Food',
        rating: 4.0,
        reviewCount: 150,
        priceRange: '€',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Livraison', 'Familial'],
        address: 'Place de France',
        phone: '+212 539 33 22 11',
        email: 'hello@burgerhouse.ma',
        description: 'Burgers gourmets faits maison avec des ingrédients locaux frais.',
        isOpen: true,
        openingHours: '11:00 - 23:00',
        coordinates: { lat: 35.7731, lng: -5.8025 }
    }
];

export const reviews = [
    { id: 1, user: 'Ahmed B.', rating: 5, date: '2023-11-15', comment: 'Excellent service et plats délicieux ! Je recommande vivement.' },
    { id: 2, user: 'Sara K.', rating: 4, date: '2023-11-10', comment: 'Très bonne ambiance, mais un peu bruyant le samedi soir.' },
    { id: 3, user: 'Karim L.', rating: 5, date: '2023-11-05', comment: 'Le meilleur tajine que j\'ai mangé à Casablanca.' },
];

export const menus = [
    { id: 1, title: 'Carte Déjeuner', description: 'Formules midi et plats du jour', pdfUrl: '#' },
    { id: 2, title: 'Carte Dîner', description: 'Entrées, plats et desserts', pdfUrl: '#' },
    { id: 3, title: 'Carte des Boissons', description: 'Vins, cocktails et softs', pdfUrl: '#' },
];
