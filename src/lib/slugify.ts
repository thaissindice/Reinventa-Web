// src/lib/slugify.ts
export default function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")   // remove chars especiais
    .replace(/\s+/g, "-")       // espaços → -
    .replace(/-+/g, "-");       // múltiplos - → 1
}
