import { createPortal } from 'react-dom';
import React, { useState, useEffect } from 'react';
import { BsPerson, BsTelephone, BsEnvelope } from 'react-icons/bs';
import { FiX } from 'react-icons/fi';
import styles from './ProfileEditModal.module.css';
import { useAuth } from '../../components/auth/AuthProvider';
import { useUpdateCustomerProfileMutation } from '../../store/api';

export default function ProfileEditModal({ isOpen, onClose }) {
    const { user, refreshUser } = useAuth();
    const [updateCustomer, { isLoading }] = useUpdateCustomerProfileMutation();

    // Form state
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState(''); // Read-only
    const [headerBg, setHeaderBg] = useState(''); // For visual flair

    const [mounted, setMounted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setMounted(true);
        // Random gradient on mount or constant one
        const gradients = [
            'linear-gradient(135deg, #016B61 0%, #018f81 100%)',
        ];
        setHeaderBg(gradients[0]);
        return () => setMounted(false);
    }, []);

    // Load user data when modal opens
    useEffect(() => {
        if (isOpen && user) {
            setName(user.name || '');
            setPhone(user.phone || '');
            setEmail(user.email || '');
            setError('');
        }
    }, [isOpen, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await updateCustomer({
                id: user.id || user.userId,
                data: {
                    name,
                    phone,
                }
            }).unwrap();

            // Refresh context
            if (refreshUser) await refreshUser();

            onClose();
            // Optional: You could trigger a toast notification locally or in parent
        } catch (err) {
            console.error("Update failed", err);
            setError(err?.data?.message || "Une erreur est survenue lors de la mise à jour.");
        }
    };

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>

                {/* Close Button */}
                <div className={styles.closeButtonContainer}>
                    <button className={styles.closeButton} onClick={onClose} aria-label="Fermer">
                        <FiX />
                    </button>
                </div>

                {/* Body */}
                <div className={styles.body}>

                    {/* Title */}
                    <div className="text-center mb-4">
                        <h4 className="fw-bold mb-1" style={{ color: '#1e293b' }}>
                            Modifier le profil
                        </h4>
                        <p className="text-muted small mb-0">
                            Mettez à jour vos informations personnelles.
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="alert alert-danger p-2 small text-center mb-3 w-75 rounded-3">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className={styles.formCentered}>

                        {/* Name Input */}
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Nom complet"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <BsPerson className={styles.inputIcon} />
                        </div>

                        {/* Phone Input */}
                        <div className={styles.inputGroup}>
                            <input
                                type="tel"
                                className={styles.input}
                                placeholder="Téléphone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <BsTelephone className={styles.inputIcon} />
                        </div>

                        {/* Email Input (Disabled) */}
                        <div className={styles.inputGroup}>
                            <input
                                type="email"
                                className={styles.input}
                                placeholder="Adresse e-mail"
                                value={email}
                                disabled
                                style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed', color: '#94a3b8' }}
                            />
                            <BsEnvelope className={styles.inputIcon} />
                        </div>

                        <button type="submit" className={styles.button} disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Enregistrement...
                                </>
                            ) : (
                                'Enregistrer les modifications'
                            )}
                        </button>

                        <div className={styles.footer}>
                            <a href="#" className={styles.link} onClick={(e) => { e.preventDefault(); onClose(); }}>
                                Annuler
                            </a>
                        </div>
                    </form>

                </div>
            </div>
        </div>,
        document.body
    );
}
