'use client';
import React from 'react';

export default function SettingsPage() {
    return (
        <div className="container py-5 mt-5">
            <h2 className="mb-4">Paramètres</h2>
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <p className="text-muted">Configuration du compte pour bientôt...</p>
                    <hr />
                    <div className="mb-3">
                        <label className="form-label">Changer le mot de passe</label>
                        <button className="btn btn-outline-primary d-block">Modifier</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
