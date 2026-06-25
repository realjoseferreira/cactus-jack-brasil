import raw from "@/data/catalog.json";

export const CATEGORY_ORDER = [
  "Sneakers",
  "Camisetas",
  "Bermudas",
  "Moletons & Jaquetas",
  "Colecionáveis",
];

// Curated demo simulation
const SOLD_OUT = new Set(["camiseta-respect-vintage-oversized-travis-scott-black"]);
const FEATURED = [
  "fragment-design-x-travis-scott-x-air-jordan-1-retro-high",
  "travis-scott-x-air-jordan-1-low-og-black-phantom",
  "fragment-x-travis-scott-x-air-jordan-1-low-og-sp-sail-military-blue",
  "travis-scott-x-air-jordan-1-low-og-sp-velvet-brown",
  "travis-scott-x-nike-air-force-1-utopia",
  "travis-scott-x-air-jordan-1-low-og-sp-sail-tropical-pink",
];

const NOW = new Date();

function enrich(p) {
  const soldOut = SOLD_OUT.has(p.id);
  const available = !soldOut && typeof p.priceCurrent === "number";
  const isNew = p.launchDate ? new Date(p.launchDate + "T00:00:00") > NOW : false;
  const badges = [];
  if (soldOut) badges.push({ label: "Sold Out", kind: "soldout" });
  else {
    if (isNew) badges.push({ label: "Novo", kind: "new" });
    if (p.stockLabel && /última/i.test(p.stockLabel)) badges.push({ label: "Última Unidade", kind: "last" });
    else if (typeof p.stock === "number" && p.stock <= 5) badges.push({ label: "Limited", kind: "limited" });
    if (p.priceCurrent && p.priceCurrent >= 5000) badges.push({ label: "Exclusivo", kind: "exclusive" });
  }
  return {
    ...p,
    soldOut,
    available,
    isNew,
    badges,
    description: p.description || "Informações detalhadas em atualização.",
  };
}

export const PRODUCTS = raw.map(enrich);

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);

export const CATEGORIES = CATEGORY_ORDER.filter((c) =>
  PRODUCTS.some((p) => p.category === c)
).map((name) => ({
  name,
  count: PRODUCTS.filter((p) => p.category === name).length,
  cover: PRODUCTS.find((p) => p.category === name)?.image,
}));

export const featuredProducts = () => {
  const list = FEATURED.map(getProduct).filter(Boolean);
  return list.length ? list : PRODUCTS.slice(0, 6);
};

export const latestDrops = () =>
  [...PRODUCTS]
    .filter((p) => p.launchDate)
    .sort((a, b) => (a.launchDate < b.launchDate ? 1 : -1))
    .slice(0, 8);

export const relatedProducts = (product, n = 4) =>
  PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, n);

export function filterSort({ products = PRODUCTS, category = "Todos", query = "", sort = "destaque" }) {
  let list = products.filter((p) => (category === "Todos" ? true : p.category === category));
  if (query.trim()) {
    const q = query.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.brand || "").toLowerCase().includes(q) ||
        (p.color || "").toLowerCase().includes(q)
    );
  }
  const featuredIdx = (id) => {
    const i = FEATURED.indexOf(id);
    return i === -1 ? 999 : i;
  };
  switch (sort) {
    case "preco-asc":
      list = [...list].sort((a, b) => (a.priceCurrent ?? Infinity) - (b.priceCurrent ?? Infinity));
      break;
    case "preco-desc":
      list = [...list].sort((a, b) => (b.priceCurrent ?? -Infinity) - (a.priceCurrent ?? -Infinity));
      break;
    case "novidade":
      list = [...list].sort((a, b) => (a.launchDate || "") < (b.launchDate || "") ? 1 : -1);
      break;
    default:
      list = [...list].sort((a, b) => featuredIdx(a.id) - featuredIdx(b.id));
  }
  return list;
}
