import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Easy Sell Products",
    description: "Easy Sell Products Generated by create next app",
    openGraph: {
        images: [
            `https://ecommerce-nextjs-supabase.vercel.app/public/sellProducts.jpg`,
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="bumblebee">
            <body className={inter.className}>
                <Toaster />
                <Header />
                <main className="py-[2vh] px-[4vh] min-h-screen">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
