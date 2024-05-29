/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "icqynkupawzmkbafwidf.supabase.co",
            },
        ],
    },
};

export default nextConfig;
