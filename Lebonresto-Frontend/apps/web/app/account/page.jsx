'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentCustomer } from '../../store/slices/authSlice';
import { useUpdateCustomerMutation } from '../../store/api';
import { toast } from 'react-toastify'; // Assuming toast is available, or alert

export default function AccountProfilePage() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [updateCustomer, { isLoading: isUpdating }] = useUpdateCustomerMutation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '', // Email usually read-only
                phone: user.phone || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // curl -X PATCH "http://localhost:3000/customers/{id}"
            await updateCustomer({
                id: user.id,
                data: {
                    name: formData.name,
                    phone: formData.phone,
                }
            }).unwrap();

            // Refresh local user data
            dispatch(fetchCurrentCustomer());
            alert("Profil mis à jour avec succès !");
        } catch (error) {
            console.error("Update failed", error);
            alert("Erreur lors de la mise à jour du profil.");
        }
    };

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h4 className="fw-bold m-0">Mon Profil</h4>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Nom complet</label>
                        <input
                            type="text"
                            className="form-control rounded-pill bg-light border-0 px-3"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control rounded-pill bg-light border-0 px-3 text-muted"
                            name="email"
                            value={formData.email}
                            disabled
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Téléphone</label>
                        <input
                            type="tel"
                            className="form-control rounded-pill bg-light border-0 px-3"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-12 mt-4">
                        <button
                            type="submit"
                            className="btn btn-primary rounded-pill px-4"
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Mise à jour...' : 'Sauvegarder les modifications'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
