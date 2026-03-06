# AquaViina SEO Growth Playbook (RU + RO)

## 1) Семантика: RU + RO

### Core commercial cluster
- RU: `фильтр для воды`, `фильтр для воды в молдове`, `купить фильтр для воды кишинев`, `обратный осмос купить`
- RO: `filtru de apă`, `filtre apa moldova`, `filtru apa chisinau`, `osmoza inversa`

### Intent cluster
- RU: `фильтр для воды для дома`, `фильтр для скважины`, `фильтр для жесткой воды`, `проточный фильтр`
- RO: `filtru apa pentru casa`, `filtru apa fantana`, `filtru pentru apa dura`, `filtru sub chiuveta`

### Product/support cluster
- RU: `картриджи для фильтра`, `обслуживание фильтров`, `установка фильтра воды`
- RO: `cartuse filtru apa`, `service filtre apa`, `montaj filtru apa`

### Landing mapping
- RU landing: `/ru/filtry-dlya-vody-v-moldove`
- RO landing: `/ro/filtre-apa-moldova`
- Catalog: `/ru/products`, `/ro/products`
- Types: `/[locale]/types/osmoza-inversa`, `/[locale]/types/filtre-sub-chiuveta`, `/[locale]/types/prefiltre`, `/[locale]/types/cartuse`

## 2) Merchant Center / Free Listings

### Product feed endpoint
- RU feed: `https://aquaviina.md/merchant-feed.xml?locale=ru`
- RO feed: `https://aquaviina.md/merchant-feed.xml?locale=ro`

### Setup checklist
1. Merchant Center account -> Business information -> verify domain `aquaviina.md`.
2. Products -> Feeds -> Add feed -> Scheduled fetch.
3. Use RU and RO feed URLs above.
4. Currency: `MDL`, target country: `MD`.
5. After fetch, resolve diagnostics (missing GTIN/brand/image issues if any).

## 3) Indexing and Technical SEO

### Current technical assets
- Sitemap: `https://aquaviina.md/sitemap.xml`
- Robots: `https://aquaviina.md/robots.txt`
- Hreflang on key pages includes `ru-MD` and `ro-MD`.
- Product pages include Product + Merchant listing structured data + FAQ.

### Search Console checklist
1. Add and verify property `https://aquaviina.md/`.
2. Submit sitemap `https://aquaviina.md/sitemap.xml`.
3. URL Inspection -> request indexing for:
   - `/ru/filtry-dlya-vody-v-moldove`
   - `/ro/filtre-apa-moldova`
   - top product pages
4. Check Coverage and Enhancements weekly.

## 4) Google Business Profile (manual operations)

1. Complete all fields: category, description, hours, phone, site URL.
2. Add products/services with URLs to relevant landing/catalog pages.
3. Upload fresh photos weekly (office, delivery, installations, products).
4. Publish 1 post per week (offers, maintenance reminders, new arrivals).
5. Reply to every review within 24-48 hours.

## 5) Reviews process (manual SOP)

1. Ask every delivered customer for a Google review (SMS/WhatsApp template).
2. Trigger request 2-3 days after delivery.
3. Ask reviewers to mention product type and city (natural language).
4. Log requests and responses in CRM/Google Sheet.

## 6) Local links and mentions (manual SOP)

1. Register business in Moldova directories and local listings.
2. Publish 2 educational articles/month in local media/blogs.
3. Build partner links from installers, plumbers, renovation companies.
4. Sponsor niche local communities and request attribution links.

## 7) Google Ads (first 60-90 days)

### Campaign split
1. Search brand: `aquaviina`, `aqua viina`.
2. Search non-brand: `фильтр для воды`, `filtru de apă`, `обратный осмос`.
3. Dynamic remarketing / Performance Max (after conversion tracking is stable).

### Minimum tracking setup
1. Track calls, form submissions, cart/checkout, purchases.
2. Import conversions to Google Ads.
3. Weekly negatives cleanup and query report review.

