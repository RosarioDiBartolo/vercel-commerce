import { StoreProductOption } from '@medusajs/types';
import { clsx, type ClassValue } from "clsx";
import { ReadonlyURLSearchParams } from 'next/navigation';
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const mapOptionIds = (productOptions: StoreProductOption[]) => {
  // Maps the option titles to their respective ids
  const map: Record<string, string> = {};
  productOptions.forEach((option) => {
    map[option.id] = option.title;
  });
  return map;
};

export const isObject = (input: any) => input instanceof Object;
export const isArray = (input: any) => Array.isArray(input);

export const isEmpty = (input: any) => {
  return (
    input === null ||
    input === undefined ||
    (isObject(input) && Object.keys(input).length === 0) ||
    (isArray(input) && (input as any[]).length === 0) ||
    (typeof input === 'string' && input.trim().length === 0)
  );
};
