import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/style.scss';
import '../styles/globals.css';
import '../styles/admin-theme.css';

import StoreProvider from '../store/StoreProvider';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});

export const metadata = {
    title: 'LeBonResto Owner - Restaurant Management',
    description: 'Manage your restaurant listings and reservations on LeBonResto.',
    viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <StoreProvider>
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
}
