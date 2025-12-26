"use client";
import React, { createContext, useContext, useState } from 'react';
import AuthModal from './auth/AuthModal';

const UIContext = createContext({
    isAuthModalOpen: false,
    openAuthModal: () => { },
    closeAuthModal: () => { },
});

export const UIProvider = ({ children }) => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const openAuthModal = () => setIsAuthModalOpen(true);
    const closeAuthModal = () => setIsAuthModalOpen(false);

    return (
        <UIContext.Provider value={{
            isAuthModalOpen,
            openAuthModal,
            closeAuthModal
        }}>
            {children}
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={closeAuthModal}
            />
        </UIContext.Provider>
    );
};

export const useUI = () => useContext(UIContext);
