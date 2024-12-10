import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 將數字格式加上逗號
export function formatNumberWithCommas(price: number): string {
  return new Intl.NumberFormat('en-US').format(price);
}
