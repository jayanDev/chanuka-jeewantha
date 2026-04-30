import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	poweredByHeader: false,
	compress: true,
	outputFileTracingIncludes: {
		"/api/resources/templates/[slug]/download": ["./Resources/Templates/Free/**/*.docx"],
	},
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
		const securityHeaders = [
			{
				key: "X-Content-Type-Options",
				value: "nosniff",
			},
			{
				key: "X-Frame-Options",
				value: "DENY",
			},
			{
				// Modern browsers ignore this; set to 0 to prevent XSS auditor quirks in older browsers
				key: "X-XSS-Protection",
				value: "0",
			},
			{
				key: "Referrer-Policy",
				value: "strict-origin-when-cross-origin",
			},
			{
				key: "X-DNS-Prefetch-Control",
				value: "on",
			},
			{
				key: "Permissions-Policy",
				value: "camera=(), microphone=(), geolocation=()",
			},
			{
				key: "Strict-Transport-Security",
				value: "max-age=63072000; includeSubDomains; preload",
			},
			{
				// Allows popups (e.g. WhatsApp links) while isolating top-level context from cross-origin pages
				key: "Cross-Origin-Opener-Policy",
				value: "same-origin-allow-popups",
			},
			{
				// Foundational CSP — unsafe-inline/unsafe-eval needed for Next.js + Tailwind 4 + GA
				key: "Content-Security-Policy",
				value: [
					"default-src 'self'",
					"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
					"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
					"font-src 'self' https://fonts.gstatic.com",
					"img-src 'self' data: blob: https:",
					"connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://firestore.googleapis.com https://storage.googleapis.com",
					"frame-src 'self' https://www.youtube.com https://player.vimeo.com",
					"frame-ancestors 'none'",
					"base-uri 'self'",
					"form-action 'self'",
					"upgrade-insecure-requests",
				].join("; "),
			},
		];

		return [
			{
				source: "/(.*)",
				headers: securityHeaders,
			},
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
