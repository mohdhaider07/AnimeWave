/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "shikimori.one",
				pathname: "**",
			},
		],
	},
};

module.exports = nextConfig;
