import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { CoursesProvider } from '@/context/CoursesContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'MOS 1000 Master - Nền Tảng Luyện Thi Chứng Chỉ MOS Quốc Tế',
  description: 'Website luyện thi chứng chỉ tin học văn phòng MOS (Microsoft Office Specialist) Word, Excel, PowerPoint. Đề thi thử chuẩn Certiport 1000 điểm.',
  keywords: ['MOS 1000', 'MOS Word', 'MOS Excel', 'MOS PowerPoint', 'Chứng chỉ MOS', 'Thi thử MOS', 'Certiport'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <AuthProvider>
          <CoursesProvider>
            <CartProvider>
              <WishlistProvider>
                <Header />
                <main className="main-content-area">{children}</main>
                <Footer />
              </WishlistProvider>
            </CartProvider>
          </CoursesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
