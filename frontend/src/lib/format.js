export const brl = (n) =>
  typeof n === "number"
    ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n)
    : null;

export const priceLabel = (n) => (typeof n === "number" ? brl(n) : "Consulte disponibilidade");

export const formatDateBR = (iso) => {
  if (!iso) return null;
  try {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  } catch {
    return null;
  }
};
