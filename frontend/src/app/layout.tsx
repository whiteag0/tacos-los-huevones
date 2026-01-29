import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WelcomeLetterModal from "@/components/WelcomeLetterModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tacos Los Huevones | Authentic Mexican Street Food",
  description: "Fresh, authentic Mexican tacos, burritos, and more in Parker, Colorado. Order online for pickup!",
  keywords: ["tacos", "mexican food", "food truck", "parker colorado", "burritos", "authentic mexican"],
  metadataBase: new URL('https://tacosloshuevones.com'),
  openGraph: {
    title: "Tacos Los Huevones",
    description: "Authentic Mexican Street Food in Parker, Colorado. Order online for pickup!",
    type: "website",
    siteName: "Tacos Los Huevones",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tacos Los Huevones",
    description: "Authentic Mexican Street Food in Parker, Colorado. Order online for pickup!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <CartProvider>
          <WelcomeLetterModal />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
