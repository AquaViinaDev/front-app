import { MetadataRoute } from "next";

const SITE_URL = "https://aquaviina.md";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// Статические страницы
	const staticPages = [
		"",
		"ru",
		"ro",
		"products",
	].map((p) => ({
		url: `${SITE_URL}/${p}`,
		lastModified: new Date(),
		changeFrequency: "weekly",
		priority: 1.0,
	}));

	// Динамические товары из API Nest
	const products = await fetch(`${SITE_URL}/api/sitemap-products`, {
		next: { revalidate: 3600 },
	}).then((r) => r.json()).catch(() => []);

	const productPages = products.map((p: any) => ({
		url: `${SITE_URL}/products/${p.slug}`,
		lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
		changeFrequency: "monthly",
		priority: 0.8,
	}));

	return [...staticPages, ...productPages];
}
