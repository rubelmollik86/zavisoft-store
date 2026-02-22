import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
}

export function truncate(text: string, max: number): string {
  return text.length <= max ? text : text.slice(0, max) + "...";
}

export function getImage(images: string[], index = 0, fallbackId = 1): string {
  const fallback = `https://picsum.photos/600/600?random=${fallbackId}`;
  if (!images || images.length === 0) return fallback;
  const raw = images[index] ?? images[0];
  try {
    const parsed = JSON.parse(raw);
    const url = Array.isArray(parsed) ? parsed[0] : raw;
    return url?.startsWith("http") ? url : fallback;
  } catch {
    const cleaned = raw.replace(/["[\]]/g, "").trim();
    return cleaned.startsWith("http") ? cleaned : fallback;
  }
}
