import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/style.scss';
import './globals.css';
import StoreProvider from '../store/StoreProvider';
import { Poppins } from 'next/font/google';
import MainLayoutWrapper from '../components/MainLayoutWrapper';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});

export const metadata = {
    title: 'LeBonResto – Marketplace des Restaurants au Maroc',
    description: 'Première plateforme de découverte et réservation de restaurants au Maroc.',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
            <body className={poppins.className}>
                <StoreProvider>
                    <MainLayoutWrapper>
                        {children}
                    </MainLayoutWrapper>
                </StoreProvider>
            </body>
        </html>
    );
}
