import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResponseAPI } from "./supabase/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getBaseUrl(): Promise<string> {
  const res = await fetch("/api/getbaseurl");
  const data = await res.json();
  return data.baseUrl;
}

type OptionsType = {
  method?: string;
  data?: any;
};

export async function fetchAPI(url: string, options?: OptionsType) {
  if (options) {
    const res = await fetch(`/api/${url}`, {
      method: options.method ? options.method : "GET",
      headers: {
        "Content-Type": "application",
      },
      body: JSON.stringify(options.data ? options.data : {}),
    });
    const data = (await res.json()) as ResponseAPI;
    return data;
  }
  const res = await fetch(`/api/${url}`);
  const data = (await res.json()) as ResponseAPI;
  return data;
}

export function tambahAt(name: string) {
  if (name.includes("@")) {
    return name; // Jika sudah ada @, tidak melakukan apa-apa
  }
  return "@" + name; // Jika tidak ada @, tambahkan di awal kata
}
