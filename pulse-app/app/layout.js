import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'PULSE — Squad Vitality Tracker',
  description: 'Sistem manajemen keaktifan member squad Mobile Legends',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="font-body bg-slate-950 text-slate-100 min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
