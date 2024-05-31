import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Upload Your Products",
    description: "Easy Sell Products - Upload Your Products",

    alternates: {
        canonical: "https://ecommerce-nextjs-supabase.vercel.app/upload",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
