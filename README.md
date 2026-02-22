# KICKS — Zavisoft Frontend Task

> Premium sneaker e-commerce store · Next.js 15 · React 19 · Context API

---

## 🚀 Setup

```bash
npm install
npm run dev   # http://localhost:3000
```

---

## 🛠 Tech Stack

| | |
|---|---|
| Framework | **Next.js 15** (App Router, Turbopack) |
| Runtime | **React 19** |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| State | **Context API** + `useReducer` |
| Data Fetching | Axios |
| Fonts | Barlow Condensed + Barlow |

---

## 🔧 Key Fixes in This Version

| Issue | Fix |
|---|---|
| `use(params)` runtime error | Restored for Next.js 15 — `params` is a `Promise<{id}>` |
| `useState` inside `.map()` | Extracted `CartItemRow` and `OrderItemPreview` as proper components |
| Infinite fetch loop in Context | Replaced `state.categoriesStatus` dep with a stable `useRef` guard |
| Image domain errors | Added `images.unsplash.com`, `i.pravatar.cc`, `**.escuelajs.co` |
| stale `useEffect` deps | Split compound effects into separate focused `useEffect` calls |

---

## 📁 Structure

```
src/
├── app/
│   ├── page.tsx               # Home — hero, drops, categories, reviews
│   ├── products/page.tsx      # All products + filters
│   ├── products/[id]/page.tsx # Detail: gallery, sizes, add to bag
│   ├── cart/page.tsx          # Cart + order summary (bonus)
│   └── not-found.tsx
├── context/
│   ├── ProductsContext.tsx    # Products + categories via useReducer + useRef guard
│   └── CartContext.tsx        # Cart via useReducer
├── components/
│   ├── layout/   Navbar · Footer
│   ├── products/ ProductCard · ProductGrid · CategoryCard
│   └── ui/       Skeleton · ErrorState · EmptyState
├── services/api.ts            # Axios — Platzi Fake Store API
├── types/index.ts
└── utils/index.ts
```

---

## 🎨 Design Tokens

```
black:       #0a0a0a   background
blue:        #3B5BFF   primary CTA
yellow:      #FFD600   accents / stars
gray:        #1a1a1a   cards
gray-3:      #6b6b6b   muted text
```
