import { Geist, Geist_Mono, Michroma } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ClientProvider from "@/contextApi/ClientProvider";
import { SpeedInsights } from "@vercel/speed-insights/next"
import MobileNavbar from "@/components/MobileNavbar";



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
      <head>
        <meta name="google-site-verification" content="5hZCMM0nK63VTuvWOwQ7CTMbwTTMlN8DGBVP_eg2pIA" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${michroma.variable} antialiased`}
      >
        <MobileNavbar/>
        {/* ClientProvider wraps the entire app to provide context */}
        <ClientProvider>
        {children}
        <SpeedInsights />
        <ScrollToTopButton />
        <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
