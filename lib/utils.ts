import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getLabel = (
  labelObj: Record<string, string> | undefined,
  currentLang: string,
  fallbacks = ['no', 'en']
): string => {
  if (!labelObj) return 'Unknown';

  // Create a clean version of the label object without _type
  const cleanLabelObj = Object.fromEntries(
    Object.entries(labelObj)
      .filter(([key]) => key !== '_type')
      .map(([key, value]) => [key, value.trim()])
  );

  // Try current language
  if (cleanLabelObj[currentLang]) return cleanLabelObj[currentLang];

  // Try fallbacks in order
  for (const lang of fallbacks) {
    if (cleanLabelObj[lang]) return cleanLabelObj[lang];
  }

  // Get first available label
  const firstLabel = Object.values(cleanLabelObj)[0];
  return firstLabel || 'Unknown';
};

export const getBase = (type: string) => {
  if (type == 'LinguisticDocument') {
    return '/'
  }
  return '/id/'
}

export const calculateSpans = (ratio: number) => {
  /* Dafault */
  const spans = {
    classes: 'row-span-1 md:row-span-2 lg:row-span-1 xl:row-span-1 2xl:row-span-1 col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1'
  }

  /* Landscape */
  if (ratio >= 1.3) {
    spans.classes = 'row-span-1 md:row-span-1 lg:row-span-1 xl:row-span-1 2xl:row-span-1 col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2'
  }
  /* Extreme Landscape */
  if (ratio >= 1.9) {
    spans.classes = 'row-span-1 md:row-span-1 lg:row-span-1 xl:row-span-1 2xl:row-span-1 col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-3'
  }
  /* Portrait */
  if (ratio <= 0.6) {
    spans.classes = 'row-span-1 md:row-span-1 lg:row-span-1 xl:row-span-2 2xl:row-span-2 col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1'
  }
  return spans
}