import { MetadataRoute } from "next";
import { buildProductPath, normalizeSeoSlug } from "@lib/seo";

const SITE_URL = "https://aquaviina.md";
const LOCALES = ["ru", "ro"] as const;
const STATIC_PATHS_BY_LOCALE: Record<(typeof LOCALES)[number], readonly string[]> = {
	ru: ["", "products", "services", "about", "filtry-dlya-vody-v-moldove"],
	ro: ["", "products", "services", "about", "filtre-apa-moldova"],
};

type SitemapProduct = {
	id?: string;
	slug?: string;
	updatedAt?: string;
	name?: string | { ru?: string; ro?: string };
};

type SitemapProductsResponse =
	| SitemapProduct[]
	| {
			items?: SitemapProduct[];
			totalPages?: number;
	  };

type FilterItem = {
	ro?: string;
	ru?: string;
};

type FiltersResponse = {
	brand?: FilterItem[];
	productType?: FilterItem[];
};

const fetchProductsForSitemap = async () => {
	const productsResponse = (await fetch(`${SITE_URL}/api/products?page=1&limit=200`, {
		next: { revalidate: 3600 },
	})
		.then((r) => (r.ok ? r.json() : null))
		.catch(() => null)) as SitemapProductsResponse | null;

	const productsData = Array.isArray(productsResponse)
		? productsResponse
		: Array.isArray(productsResponse?.items)
			? productsResponse.items
			: [];

	if (productsData.length > 0) {
		return productsData;
	}

	const fallbackResponse = (await fetch(`${SITE_URL}/api/sitemap-products`, {
		next: { revalidate: 3600 },
	})
		.then((r) => (r.ok ? r.json() : []))
		.catch(() => [])) as SitemapProductsResponse;

	return Array.isArray(fallbackResponse)
		? fallbackResponse
		: Array.isArray(fallbackResponse?.items)
			? fallbackResponse.items
			: [];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticPages: MetadataRoute.Sitemap = [];

	LOCALES.forEach((locale) => {
		STATIC_PATHS_BY_LOCALE[locale].forEach((path) => {
			const normalized = path ? `${locale}/${path}` : `${locale}`;
			staticPages.push({
				url: `${SITE_URL}/${normalized}`,
				changeFrequency: "weekly",
				priority: path === "" ? 1.0 : 0.85,
			});
		});
	});

	const productsData = await fetchProductsForSitemap();

	const productPages: MetadataRoute.Sitemap = [];

	productsData.forEach((p) => {
		const slugOrId = p?.slug || p?.id;
		if (!slugOrId) return;

		LOCALES.forEach((locale) => {
			const lastModified = p.updatedAt ? new Date(p.updatedAt) : undefined;
			productPages.push({
				url: `${SITE_URL}${buildProductPath({ id: slugOrId, name: p.name }, locale)}`,
				...(lastModified && !Number.isNaN(lastModified.getTime()) ? { lastModified } : {}),
				changeFrequency: "monthly",
				priority: 0.8,
			});
		});
	});

	const filters = (await fetch(`${SITE_URL}/api/filters`, {
		next: { revalidate: 3600 },
	})
		.then((r) => r.json())
		.catch(() => ({ brand: [], productType: [] }))) as FiltersResponse;

	const brandPages: MetadataRoute.Sitemap = [];
	(filters.brand ?? []).forEach((item) => {
		if (!item?.ro) return;
		const slug = normalizeSeoSlug(item.ro);
		if (!slug) return;
		LOCALES.forEach((locale) => {
			brandPages.push({
				url: `${SITE_URL}/${locale}/brands/${slug}`,
				changeFrequency: "weekly",
				priority: 0.7,
			});
		});
	});

	const typePages: MetadataRoute.Sitemap = [];
	(filters.productType ?? []).forEach((item) => {
		if (!item?.ro) return;
		const slug = normalizeSeoSlug(item.ro);
		if (!slug) return;
		LOCALES.forEach((locale) => {
			typePages.push({
				url: `${SITE_URL}/${locale}/types/${slug}`,
				changeFrequency: "weekly",
				priority: 0.7,
			});
		});
	});

	return [...staticPages, ...productPages, ...brandPages, ...typePages];
}
