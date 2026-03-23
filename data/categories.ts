export interface Category {
  id: string;
  label: string;
  color: string;
  opposite: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  { id: "far-right", label: "Far-Right", color: "#dc2626", opposite: "far-left", description: "Conservative media, MAGA, traditional values punditry" },
  { id: "far-left", label: "Far-Left", color: "#2563eb", opposite: "far-right", description: "Progressive media, democratic socialism, social justice" },
  { id: "flat-earth", label: "Flat Earth", color: "#854d0e", opposite: "climate-activist", description: "Flat earth theories, NASA skepticism, alternative cosmology" },
  { id: "crypto-maximalist", label: "Crypto Maximalist", color: "#f59e0b", opposite: "hustle-bro", description: "Bitcoin maxis, DeFi evangelists, fiat doomers" },
  { id: "hustle-bro", label: "Hustle Bro", color: "#16a34a", opposite: "crypto-maximalist", description: "Sigma grindset, dropshipping, passive income, 4AM routines" },
  { id: "trad-life", label: "Trad Life", color: "#db2777", opposite: "far-left", description: "Traditional living, homesteading, nuclear family content" },
  { id: "conspiracy", label: "Conspiracy", color: "#7c3aed", opposite: "climate-activist", description: "Deep state, secret societies, cover-up theories" },
  { id: "climate-activist", label: "Climate Activist", color: "#0d9488", opposite: "conspiracy", description: "Climate crisis urgency, environmental activism, green tech" },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getOppositeCategory(id: string): Category | undefined {
  const cat = getCategoryById(id);
  if (!cat) return undefined;
  return getCategoryById(cat.opposite);
}
