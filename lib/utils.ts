import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getBaseUrl(): Promise<string> {
  const res = await fetch("/api/getbaseurl");
  const data = await res.json();
  return data.baseUrl;
}
