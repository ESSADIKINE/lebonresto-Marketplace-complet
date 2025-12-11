'use client';

import React, { useState } from 'react';
import {
    useGetCitiesQuery,
    useGetCategoriesQuery,
    useCreateRestaurantLeadMutation
} from '../../store/api/lebonrestoApi';
import { BsCheckCircle, BsExclamationTriangle } from 'react-icons/bs';

export default function ForRestaurantsLeadForm() {
    // API Hooks
    const { data: cities = [] } = useGetCitiesQuery();
    const { data: categories = [] } = useGetCategoriesQuery();
    const [createLead, { isLoading, isSuccess, isError }] = useCreateRestaurantLeadMutation();

    // Form State
    const [formData, setFormData] = useState({
        restaurant_name: '',
        city_id: '',
        city_name: '',
        category_id: '',
        category_name: '',
        seats_count: '',
        has_terrace: false,
        has_delivery: false,
        has_takeaway: false,
        contact_name: '',
        contact_role: '',
        contact_email: '',
        contact_phone: '',
        average_price_level: '',
        current_tools: '',
        message: ''
    });

    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCityChange = (e) => {
        const selectedId = e.target.value;
        const selectedCity = cities.find(c => c.id === selectedId);
        setFormData(prev => ({
            ...prev,
            city_id: selectedId,
            city_name: selectedCity ? selectedCity.name : ''
        }));
    };

    const handleCategoryChange = (e) => {
        const selectedId = e.target.value;
        const selectedCat = categories.find(c => c.id === selectedId);
        setFormData(prev => ({
            ...prev,
            category_id: selectedId,
            category_name: selectedCat ? selectedCat.name : ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        try {
            // Prepare payload
            const payload = {
                ...formData,
                seats_count: formData.seats_count ? parseInt(formData.seats_count) : undefined,
            };

            /*
            bash
            curl -X POST "http://localhost:3000/restaurant-leads" \
              -H "Content-Type: application/json" \
              -d '{ "restaurant_name": "Bistro Atlas", "city_name": "Marrakech", "contact_name": "Sara", "contact_email": "sara@example.com" }'
            */
            await createLead(payload).unwrap();

            // Clear form on success
            setFormData({
                restaurant_name: '',
                city_id: '',
                city_name: '',
                category_id: '',
                category_name: '',
                seats_count: '',
                has_terrace: false,
                has_delivery: false,
                has_takeaway: false,
                contact_name: '',
                contact_role: '',
                contact_email: '',
                contact_phone: '',
                average_price_level: '',
                current_tools: '',
                message: ''
            });

        } catch (err) {
            console.error('Failed to submit lead:', err);
            setErrorMsg('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    };

    if (isSuccess) {
        return (
            <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white h-100 d-flex align-items-center justify-content-center">
                <div>
                    <div className="mb-4 text-success">
                        <BsCheckCircle size={60} />
                    </div>
                    <h3 className="fw-bold mb-3">Merci !</h3>
                    <p className="lead text-muted mb-4">
                        Votre demande a bien été reçue.<br />
                        Un expert LeBonResto vous contactera très prochainement pour activer votre compte.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="btn btn-outline-primary rounded-pill px-4"
                    >
                        Envoyer une autre demande
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h3 className="fw-bold mb-4">Inscrivez votre restaurant</h3>

            {isError && (
                <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                    <BsExclamationTriangle className="me-2" />
                    <div>{errorMsg || "Une erreur s'est produite."}</div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* 1. Infos Restaurant */}
                <h5 className="fw-bold text-primary mb-3 text-uppercase fs-6 ls-1">Information Restaurant</h5>
                <div className="row g-3 mb-4">
                    <div className="col-12">
                        <label className="form-label fw-medium small text-muted">Nom du restaurant *</label>
                        <input
                            type="text"
                            name="restaurant_name"
                            className="form-control bg-light border-0"
                            placeholder="ex: Le Petit Bistro"
                            required
                            value={formData.restaurant_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-medium small text-muted">Ville</label>
                        <select
                            className="form-select bg-light border-0"
                            name="city_id"
                            value={formData.city_id}
                            onChange={handleCityChange}
                        >
                            <option value="">Choisir une ville...</option>
                            {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-medium small text-muted">Type de cuisine</label>
                        <select
                            className="form-select bg-light border-0"
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleCategoryChange}
                        >
                            <option value="">Choisir...</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-medium small text-muted">Nombre de couverts (approx.)</label>
                        <input
                            type="number"
                            name="seats_count"
                            className="form-control bg-light border-0"
                            placeholder="ex: 50"
                            value={formData.seats_count}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-medium small text-muted">Gamme de prix</label>
                        <select
                            className="form-select bg-light border-0"
                            name="average_price_level"
                            value={formData.average_price_level}
                            onChange={handleChange}
                        >
                            <option value="">Choisir...</option>
                            <option value="€">€ (Economique)</option>
                            <option value="€€">€€ (Moyen)</option>
                            <option value="€€€">€€€ (Gastronomique)</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <div className="d-flex gap-4 flex-wrap mt-2">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="has_terrace" id="has_terrace" checked={formData.has_terrace} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="has_terrace">Terrasse</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="has_delivery" id="has_delivery" checked={formData.has_delivery} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="has_delivery">Livraison</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="has_takeaway" id="has_takeaway" checked={formData.has_takeaway} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="has_takeaway">A emporter</label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Infos Contact */}
                <h5 className="fw-bold text-primary mb-3 text-uppercase fs-6 ls-1 border-top pt-4">Vos Coordonnées</h5>
                <div className="row g-3 mb-4">
                    <div className="col-md-6">
                        <label className="form-label fw-medium small text-muted">Nom complet *</label>
                        <input
                            type="text"
                            name="contact_name"
                            className="form-control bg-light border-0"
                            required
                            value={formData.contact_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-medium small text-muted">Rôle (ex: Gérant)</label>
                        <input
                            type="text"
                            name="contact_role"
                            className="form-control bg-light border-0"
                            value={formData.contact_role}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-medium small text-muted">Email professionnel *</label>
                        <input
                            type="email"
                            name="contact_email"
                            className="form-control bg-light border-0"
                            required
                            value={formData.contact_email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-medium small text-muted">Téléphone</label>
                        <input
                            type="text"
                            name="contact_phone"
                            className="form-control bg-light border-0"
                            value={formData.contact_phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* 3. Message */}
                <div className="mb-4">
                    <label className="form-label fw-medium small text-muted">Avez-vous des besoins spécifiques ?</label>
                    <textarea
                        name="message"
                        className="form-control bg-light border-0"
                        rows="3"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Parlez-nous de vos objectifs..."
                    ></textarea>
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg rounded-pill fw-bold" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Envoi en cours...
                            </>
                        ) : (
                            'Commencer maintenant'
                        )}
                    </button>
                    <small className="text-center text-muted mt-3" style={{ fontSize: '0.75rem' }}>
                        En cliquant sur "Commencer maintenant", vous acceptez d'être contacté par l'équipe commerciale de LeBonResto.
                    </small>
                </div>
            </form>
        </div>
    );
}
