import { MetadataRoute } from "next";

const SITE_URL = "https://aquaviina.md";
const LOCALES = ["ru", "ro"] as const;
const STATIC_PATHS = ["", "products", "services", "about"] as const;

const normalizeSlug = (value: string) => {
	const trimmed = value.trim().toLowerCase();
	const normalized = trimmed
		.replace(/ă/g, "a")
		.replace(/â/g, "a")
		.replace(/î/g, "i")
		.replace(/ș/g, "s")
		.replace(/ş/g, "s")
		.replace(/ț/g, "t")
		.replace(/ţ/g, "t");
	return normalized
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.replace(/--+/g, "-");
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticPages: MetadataRoute.Sitemap = [];

	LOCALES.forEach((locale) => {
		STATIC_PATHS.forEach((path) => {
			const normalized = path ? `${locale}/${path}` : `${locale}`;
			staticPages.push({
				url: `${SITE_URL}/${normalized}`,
				lastModified: new Date(),
				changeFrequency: "weekly",
				priority: path === "" ? 1.0 : 0.8,
			});
		});
	});

	const products = await fetch(`${SITE_URL}/api/sitemap-products`, {
		next: { revalidate: 3600 },
	})
		.then((r) => r.json())
		.catch(() => []);

	const productsData = Array.isArray(products)
		? products
		: Array.isArray((products as any)?.items)
			? (products as any).items
			: [];

	const productPages: MetadataRoute.Sitemap = [];

	productsData.forEach((p: any) => {
		const slugOrId = p?.slug || p?.id;
		if (!slugOrId) return;

		LOCALES.forEach((locale) => {
			productPages.push({
				url: `${SITE_URL}/${locale}/products/${slugOrId}`,
				lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
				changeFrequency: "monthly",
				priority: 0.8,
			});
		});
	});

	const filters = await fetch(`${SITE_URL}/api/filters`, {
		next: { revalidate: 3600 },
	})
		.then((r) => r.json())
		.catch(() => ({ brand: [], productType: [] }));

	const brandPages: MetadataRoute.Sitemap = [];
	(filters.brand ?? []).forEach((item: any) => {
		if (!item?.ro) return;
		const slug = normalizeSlug(item.ro);
		if (!slug) return;
		LOCALES.forEach((locale) => {
			brandPages.push({
				url: `${SITE_URL}/${locale}/brands/${slug}`,
				lastModified: new Date(),
				changeFrequency: "weekly",
				priority: 0.7,
			});
		});
	});

	const typePages: MetadataRoute.Sitemap = [];
	(filters.productType ?? []).forEach((item: any) => {
		if (!item?.ro) return;
		const slug = normalizeSlug(item.ro);
		if (!slug) return;
		LOCALES.forEach((locale) => {
			typePages.push({
				url: `${SITE_URL}/${locale}/types/${slug}`,
				lastModified: new Date(),
				changeFrequency: "weekly",
				priority: 0.7,
			});
		});
	});

	return [...staticPages, ...productPages, ...brandPages, ...typePages];
}
