import { Geist, Geist_Mono, Michroma } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ClientProvider from "@/contextApi/ClientProvider";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata = {
  title: "Mogetzer's Wallpaper Site",
  description: "Browse and download high-quality mobile wallpapers across categories like nature, anime, minimal, and more.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${michroma.variable} antialiased`}
      >
        {/* ClientProvider wraps the entire app to provide context */}
        <ClientProvider>
        {children}
        <ScrollToTopButton />
        <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
