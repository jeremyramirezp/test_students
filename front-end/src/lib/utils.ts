import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate (date: string | undefined | null): string {
  if (! date) return ""

  const dateC = new Date(date);
  const localDate = new Date(dateC.getTime() + dateC.getTimezoneOffset() * 60000);

  const monthNames = [ "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ];
  const day = localDate.getDate();
  const monthIndex = localDate.getMonth();
  const year = localDate.getFullYear();
  return `${monthNames[monthIndex]} ${day}, ${year}`;
}

export function formatNumber(number: string | number): string {
  const numberStr = number.toString();
  return numberStr.replace(/(\d{3})(?=\d)/g, '$1-');
}