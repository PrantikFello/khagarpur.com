# 🌾 Village Hub — Community & Local Business Directory

A blazing-fast, edge-rendered web portal and directory designed to empower local communities. It bridges the gap between residents and local commerce by offering dedicated indices for businesses, artisan trades, and community groups, paired with zero-latency local search.

---

## ⚡ Tech Stack & Architecture

* **Runtime & Package Manager:** [Bun](https://bun.sh/)
* **Framework:** [Next.js](https://nextjs.org/) (App Router, React Server Components)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Search Engine:** [MiniSearch](https://github.com/lucaong/minisearch) (In-memory, client-side full-text index)
* **Edge Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/) / `@opennextjs/cloudflare`
* **Icons:** [Lucide React](https://lucide.dev/)

---

## 📌 Core Features

* **Dedicated Business Index:** Searchable and categorized directory of local storefronts, services, home-based businesses, and agricultural suppliers.
* **Community Hub:** Public listings for local associations, self-help groups, emergency services, and community initiatives.
* **Instant Full-Text Search:** Sub-millisecond, typo-tolerant search powered by **MiniSearch** with prefix matching and field boosting across all entities.
* **Edge-First Performance:** Optimized bundle sizes and edge-cached pages for instant load times, even on constrained 2G/3G mobile networks.
* **Responsive & Mobile-First:** Designed with a clean, touch-friendly UI using Tailwind CSS.

---

## 🔍 Search Implementation Details

The application uses **MiniSearch** to eliminate backend query round-trips:

* **Indexed Fields:** `title`, `name`, `category`, `description`, `keywords`, `address`
* **Stored Fields:** `id`, `name`, `category`, `slug`, `phone`, `type`
* **Search Configuration:**
  * Prefix matching enabled for instant typing suggestions (`prefix: true`)
  * Fuzzy matching for typo tolerance (`fuzzy: 0.2`)
  * Field boosting prioritizing `name` and `category` over general descriptions

---
