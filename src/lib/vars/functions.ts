import { texts } from '.';

// [key: string]: string;

// TODO: Make this a proper good type (pls help dave)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TextCollection = any;

export function getTextCollection(id: string): TextCollection {
  const path = id.split('.');
  let current: TextCollection = texts;

  for (const step of path) current = current[step];

  if (!current) throw `Text collection ${id} does not exist.`;

  return current;
}

export function getTitleOfPage(page: string, lang: number): string {
  const titles = getTextCollection('navbar_items');
  const index = titles[0].findIndex((v) => v === page);
  return titles[lang][index];
}

export function formatDate(date: Date, template = 'YYYY-MM-DD HH:mm:ss'): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return template
    .replace(/YYYY/g, year.toString())
    .replace(/YY/g, year.toString().slice(-2))
    .replace(/MM/g, padNumber(month))
    .replace(/DD/g, padNumber(day))
    .replace(/HH/g, padNumber(hours))
    .replace(/mm/g, padNumber(minutes))
    .replace(/ss/g, padNumber(seconds));
}

export const padNumber = (num: number, digits = 2): string =>
  '0'.repeat(digits - num.toString().length) + num;
