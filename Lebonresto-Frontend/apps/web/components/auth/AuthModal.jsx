import { createPortal } from 'react-dom';
import React, { useState, useEffect } from 'react';
import { BsEnvelope, BsLock, BsPerson, BsTelephone, BsShieldLock } from 'react-icons/bs';
import { FiX } from 'react-icons/fi';
import styles from './AuthModal.module.css';
import { useAuth } from './AuthProvider';

export default function AuthModal({ isOpen, onClose }) {
    const { login, register, requestOtp, verifyOtp, resetPassword } = useAuth();
    const [view, setView] = useState('login'); // 'login', 'register', 'otp', 'forgot', 'reset'
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(new Array(6).fill("")); // Array for 6 boxes
    const [newPassword, setNewPassword] = useState('');
    const [mounted, setMounted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Reset view when closed
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setView('login');
                setError('');
                setEmail('');
                setPassword('');
                setOtp(new Array(6).fill(""));
            }, 300);
        }
    }, [isOpen]);

    const handleError = (e) => {
        console.error(e);
        if (e.response && e.response.data && e.response.data.message) {
            setError(e.response.data.message);
        } else {
            setError(e.message || "Une erreur est survenue");
        }
        setIsLoading(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const res = await login(email, password);
            setIsLoading(false);
            if (res.needsVerification) {
                setView('otp');
            } else {
                onClose();
            }
        } catch (err) {
            handleError(err);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await register({ email, password, name, phone });
            // Switch to OTP view for verification
            setView('otp');
        } catch (err) {
            handleError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        const otpCode = otp.join("");
        try {
            // If we are in 'reset' flow, this verifies AND resets? 
            // Actually, for reset, we usually need OTP + New Password.
            // Let's use 'otp' view only for Account Verification.
            // For Password Reset, we use 'reset' view.

            await verifyOtp(email, otpCode, 'verify');
            setIsLoading(false);
            alert("Email vérifié avec succès !");
            onClose(); // Automatically logs in after verify usually, or we assume user is already logged in? 
            // verifyingOtp usually doesn't return token unless we auto-login. Content of verifyOtp: just updates DB.
            // If user was registering, they are NOT logged in yet? 
            // Actually my AuthProvider `register` doesn't auto-login? Checks `CustomerAuthService.register`. 
            // It returns { success: true }. It does NOT return tokens.
            // So user must login after Verify?
            // Let's auto-login or ask to login. Existing flow: Redirect to Verify -> Login. 
            // I'll switch to 'login' view after success.
            setView('login');
        } catch (err) {
            handleError(err);
        }
    };

    const handleForgot = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await requestOtp(email, 'reset');
            setIsLoading(false);
            setView('reset'); // Switch to Reset View (OTP + New Pass)
        } catch (err) {
            handleError(err);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        const otpCode = otp.join("");
        try {
            await resetPassword(email, otpCode, newPassword);
            setIsLoading(false);
            alert("Mot de passe réinitialisé !");
            setView('login');
        } catch (err) {
            handleError(err);
        }
    }

    const handleResendOtp = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        setError('');
        try {
            await requestOtp(email, 'verify');
            alert("Nouveau code envoyé !");
        } catch (err) {
            handleError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return false;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Focus next input
        if (element.nextSibling && element.value !== "") {
            element.nextSibling.focus();
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
                            {view === 'login' && 'Bon retour'}
                            {view === 'register' && 'Créer un compte'}
                            {view === 'otp' && 'Vérification Email'}
                            {view === 'forgot' && 'Récupération'}
                            {view === 'reset' && 'Nouveau mot de passe'}
                        </h4>
                        <p className="text-muted small mb-0">
                            {view === 'login' && 'Connectez-vous à votre compte.'}
                            {view === 'register' && 'Remplissez le formulaire ci-dessous.'}
                            {view === 'otp' && 'Entrez le code envoyé à votre email.'}
                            {view === 'forgot' && 'Entrez votre email pour recevoir un code.'}
                            {view === 'reset' && 'Entrez le code et votre nouveau mot de passe.'}
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="alert alert-danger p-2 small text-center mb-3">
                            {error}
                        </div>
                    )}

                    {/* LOGIN VIEW */}
                    {view === 'login' && (
                        <form onSubmit={handleLogin} className={styles.formCentered}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="email"
                                    className={styles.input}
                                    placeholder="Adresse e-mail"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <BsEnvelope className={styles.inputIcon} />
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type="password"
                                    className={styles.input}
                                    placeholder="Mot de passe"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <BsLock className={styles.inputIcon} />
                            </div>

                            <div className={styles.footer} style={{ marginTop: 0, marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label className="d-flex align-items-center gap-2 cursor-pointer text-muted small mb-0">
                                    <input type="checkbox" className="form-check-input mt-0" />
                                    <span>Se souvenir de moi</span>
                                </label>
                                <a href="#" className={styles.link} onClick={(e) => { e.preventDefault(); setView('forgot'); }} style={{ fontSize: '13px' }}>
                                    Mot de passe oublié ?
                                </a>
                            </div>

                            <button type="submit" className={styles.button} disabled={isLoading}>
                                {isLoading ? 'Connexion...' : 'Se connecter'}
                            </button>

                            <div className={styles.footer}>
                                <PasEncoreCompte setView={setView} />
                            </div>
                        </form>
                    )}

                    {/* FORGOT PASSWORD VIEW */}
                    {view === 'forgot' && (
                        <form onSubmit={handleForgot} className={styles.formCentered}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="email"
                                    className={styles.input}
                                    placeholder="Entrez votre adresse e-mail"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <BsEnvelope className={styles.inputIcon} />
                            </div>

                            <button type="submit" className={styles.button} disabled={isLoading}>
                                {isLoading ? 'Envoi...' : 'Envoyer le code'}
                            </button>

                            <div className={styles.footer}>
                                <a href="#" className={styles.link} onClick={(e) => { e.preventDefault(); setView('login'); }}>
                                    &larr; Retour à la connexion
                                </a>
                            </div>
                        </form>
                    )}

                    {/* REGISTER VIEW */}
                    {view === 'register' && (
                        <form onSubmit={handleRegister} className={styles.formCentered}>
                            <div className={styles.inputGroup}>
                                <input type="text" className={styles.input} placeholder="Nom complet" required
                                    value={name} onChange={(e) => setName(e.target.value)}
                                />
                                <BsPerson className={styles.inputIcon} />
                            </div>

                            <div className={styles.inputGroup}>
                                <input type="tel" className={styles.input} placeholder="Téléphone"
                                    value={phone} onChange={(e) => setPhone(e.target.value)}
                                />
                                <BsTelephone className={styles.inputIcon} />
                            </div>

                            <div className={styles.inputGroup}>
                                <input
                                    type="email"
                                    className={styles.input}
                                    placeholder="Adresse e-mail"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <BsEnvelope className={styles.inputIcon} />
                            </div>
                            <div className={styles.inputGroup}>
                                <input type="password" className={styles.input} placeholder="Créer un mot de passe" required
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                                <BsLock className={styles.inputIcon} />
                            </div>

                            <button type="submit" className={styles.button} disabled={isLoading}>
                                {isLoading ? 'Création...' : 'Créer un compte'}
                            </button>

                            <div className={styles.footer}>
                                Déjà un compte ? <a href="#" className={styles.link} onClick={(e) => { e.preventDefault(); setView('login'); }}>Se connecter</a>
                            </div>
                        </form>
                    )}

                    {/* OTP VIEW (Verification) */}
                    {view === 'otp' && (
                        <div className="text-center w-100 d-flex flex-column align-items-center">
                            <div className="mb-4 text-primary bg-light-primary rounded-circle d-inline-flex p-4">
                                <BsShieldLock size={28} />
                            </div>
                            <p className="small text-muted mb-4">Un code a été envoyé à <strong>{email}</strong></p>

                            <form onSubmit={handleVerifyOtp} className={styles.formCentered}>
                                <div className="d-flex justify-content-center gap-2 mb-4 w-100">
                                    {otp.map((data, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            maxLength="1"
                                            className="form-control text-center fs-4 fw-bold rounded-3 bg-light border-0"
                                            style={{ width: '40px', height: '50px', boxShadow: 'none' }}
                                            value={data}
                                            onChange={(e) => handleOtpChange(e.target, index)}
                                            onFocus={(e) => e.target.select()}
                                        />
                                    ))}
                                </div>

                                <button type="submit" className={styles.button} disabled={isLoading}>
                                    {isLoading ? 'Vérification...' : 'Vérifier'}
                                </button>
                            </form>

                            <div className={styles.footer}>
                                <a href="#" className="text-muted text-decoration-none small mt-2 d-inline-block" onClick={(e) => { e.preventDefault(); setView('login'); }}>
                                    &larr; Annuler
                                </a>
                            </div>
                        </div>
                    )}

                    {/* RESET PASSWORD VIEW */}
                    {view === 'reset' && (
                        <div className="text-center w-100 d-flex flex-column align-items-center">
                            <form onSubmit={handleResetPassword} className={styles.formCentered}>
                                <div className="mb-3 text-start w-100">
                                    <label className="small text-muted mb-1">Code OTP</label>
                                    <div className="d-flex justify-content-center gap-2 mb-3 w-100">
                                        {otp.map((data, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                maxLength="1"
                                                className="form-control text-center fs-4 fw-bold rounded-3 bg-light border-0"
                                                style={{ width: '40px', height: '50px', boxShadow: 'none' }}
                                                value={data}
                                                onChange={(e) => handleOtpChange(e.target, index)}
                                                onFocus={(e) => e.target.select()}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.inputGroup}>
                                    <input type="password" className={styles.input} placeholder="Nouveau mot de passe" required
                                        value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <BsLock className={styles.inputIcon} />
                                </div>

                                <button type="submit" className={styles.button} disabled={isLoading}>
                                    {isLoading ? 'Réinitialisation...' : 'Changer le mot de passe'}
                                </button>
                            </form>

                            <div className={styles.footer}>
                                <a href="#" className={styles.link} onClick={(e) => { e.preventDefault(); setView('login'); }}>
                                    &larr; Annuler
                                </a>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>,
        document.body
    );
}

function PasEncoreCompte({ setView }) {
    return (
        <div>
            Pas encore de compte ? <a href="#" className={styles.link} onClick={(e) => { e.preventDefault(); setView('register'); }}>S'inscrire</a>
        </div>
    );
}
