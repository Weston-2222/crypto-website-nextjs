import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 將數字格式加上逗號
export function formatNumberWithCommas(price: number): string {
  return new Intl.NumberFormat('en-US').format(price);
}

//將數字轉換成文字
export function formatPrice(price: number): string {
  if (price >= 1000000000000) {
    return 'US$' + (price / 1000000000000).toFixed(2) + '兆';
  } else if (price >= 100000000) {
    return 'US$' + (price / 100000000).toFixed(1) + '億';
  } else if (price >= 10000) {
    return 'US$' + (price / 10000).toFixed(1) + '萬';
  } else if (price >= 1000) {
    return 'US$' + Math.floor(price).toString();
  }

  return new Intl.NumberFormat('en-US').format(price);
}
