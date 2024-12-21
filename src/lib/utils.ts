import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @description 幫數字加上逗號
 * @param price 數字
 * @returns 格式化後的數字
 */
export function formatNumberWithCommas(price: number): string {
  return new Intl.NumberFormat('en-US').format(price);
}

/**
 * @description 幫數字加上單位
 * @param price 數字
 * @param isUsd 是否加US$字串 預設為true
 * @returns 格式化後的數字
 */
export function formatPriceUnit(price: number, isUsd: boolean = true): string {
  const formatNumber = (num: number, divisor: number, unit: string) => {
    return isUsd
      ? 'US$' + (num / divisor).toFixed(1).replace(/\.0$/, '') + unit
      : (num / divisor).toFixed(1).replace(/\.0$/, '') + unit;
  };

  if (price >= 1000000000000) {
    return formatNumber(price, 1000000000000, '兆');
  } else if (price >= 100000000) {
    return formatNumber(price, 100000000, '億');
  } else if (price >= 10000) {
    return formatNumber(price, 10000, '萬');
  } else if (price >= 1000) {
    return Math.floor(price).toString();
  }

  return new Intl.NumberFormat('en-US').format(price);
}

/**
 * @description 提取網站名稱並首字母大寫
 * @param url 網站鏈接
 * @returns 網站名稱
 */
export const urlExtractAndCapitalizeNames = (url: string): string => {
  try {
    if (url === null || url === '') return '';

    // 使用 URL 物件解析網址
    const parsedUrl = new URL(url);
    // 提取主機名並去掉 "www." 前綴
    const hostname = parsedUrl.hostname.replace(/^www\./, '');

    // 提取名稱部分（去掉域名後綴）
    const nameArr = hostname.split('.');
    let name = '';
    if (nameArr.length >= 2) {
      name = nameArr[nameArr.length - 2];
    } else {
      name = nameArr[0];
    }

    // 首字母大寫
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  } catch (error) {
    console.error(`Invalid URL: ${url}`, error);
    return '';
  }
};

/**
 * @description 把合約地址縮短
 * @param contractAddress 合約地址
 * @param startLength 前面要留幾個字 預設為6
 * @param endLength 後面要留幾個字 預設為6
 * @returns 縮短後的合約地址
 */
export const hideContractAddress = (
  contractAddress: string,
  startLength: number = 6,
  endLength: number = 6
): string => {
  if (contractAddress === null || contractAddress === '') return 'N/A';
  return `${contractAddress.slice(0, startLength)}...${contractAddress.slice(
    -endLength
  )}`;
};
