import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	poweredByHeader: false,
	compress: true,
	async redirects() {
		return [
			{
				source: "/email-templates",
				destination: "/resources",
				permanent: true,
			},
			{
				source: "/companies",
				destination: "/resources",
				permanent: true,
			},
			{
				source: "/companies/:path*",
				destination: "/resources",
				permanent: true,
			},
		];
	},
	images: {
		formats: ["image/avif", "image/webp"],
	},
	async headers() {
		return [

			{
				source: "/images/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=86400, stale-while-revalidate=604800",
					},
				],
			},
		];
	},
};

export default nextConfig;
