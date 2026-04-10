import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Velocity AI - Générateur E-commerce',
  description: 'Générez des fiches produits optimisées SEO',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // On englobe tout le site avec le fournisseur de sécurité Clerk
    <ClerkProvider>
      <html lang="fr">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}