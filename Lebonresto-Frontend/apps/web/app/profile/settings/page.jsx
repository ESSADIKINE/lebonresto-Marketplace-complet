'use client';
import React from 'react';
import Link from 'next/link';

export default function SettingsPage() {
    return (
        <div>
            <h4 className="fw-bold mb-4">Paramètres du compte</h4>

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                    <h5 className="fw-bold mb-3">Sécurité</h5>
                    <div className="mb-3">
                        <label className="form-label">Mot de passe</label>
                        <input type="password" className="form-control" value="********" disabled />
                        <button className="btn btn-outline-primary btn-sm mt-2">Modifier le mot de passe</button>
                    </div>
                </div>
            </div>

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                    <h5 className="fw-bold mb-3">Préférences</h5>
                    <div className="form-check form-switch mb-3">
                        <input className="form-check-input" type="checkbox" id="emailNotif" defaultChecked />
                        <label className="form-check-label" htmlFor="emailNotif">Recevoir des emails promotionnels</label>
                    </div>
                </div>
            </div>

            <div className="text-end">
                <button className="btn btn-primary">Enregistrer les modifications</button>
            </div>
        </div>
    );
}
