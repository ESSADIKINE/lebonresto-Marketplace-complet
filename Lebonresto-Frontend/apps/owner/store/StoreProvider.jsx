'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './index';

export default function StoreProvider({ children }) {
    useEffect(() => {
        let bootstrapModule;

        import('bootstrap/dist/js/bootstrap.bundle.min.js').then((module) => {
            bootstrapModule = module.default;
            const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.forEach((tooltipTriggerEl) => {
                if (bootstrapModule?.Tooltip) {
                    new bootstrapModule.Tooltip(tooltipTriggerEl);
                }
            });
        });

        return () => {
            if (bootstrapModule?.Tooltip) {
                document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((tooltipTriggerEl) => {
                    const existing = bootstrapModule.Tooltip.getInstance(tooltipTriggerEl);
                    existing?.dispose();
                });
            }
        };
    }, []);

    return <Provider store={store}>{children}</Provider>;
}
