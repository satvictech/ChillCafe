import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const rupees = (n: number) => `₹${n}`;

export const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function openStatus(opens = "11:00", closes = "22:30") {
  const now = new Date();
  const ist = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  const mins = ist.getHours() * 60 + ist.getMinutes();
  const toMins = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const o = toMins(opens);
  const c = toMins(closes);
  const isOpen = mins >= o && mins < c;

  let detail: string;
  if (isOpen) {
    const left = c - mins;
    detail =
      left <= 60 ? `Closing in ${left} min` : `Open till ${fmt(closes)}`;
  } else {
    detail = mins < o ? `Opens at ${fmt(opens)}` : `Opens tomorrow, ${fmt(opens)}`;
  }
  return { isOpen, detail };
}

function fmt(t: string) {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}${m ? `:${String(m).padStart(2, "0")}` : ""} ${period}`;
}
