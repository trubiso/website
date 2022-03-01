import { texts } from '.';

type TextCollectionTraverser = string[] | string[][] | Record<string, string[] | string[][] | Record<string, string[][]>>;
type TextCollection<T extends string> = T extends 'langs' ? string[] : string[][];

export function getTextCollection<T extends string>(id: T): TextCollection<T> {
  const path = id.split('.');
  let current: TextCollectionTraverser = texts;

  typeof texts;

  for (const step of path) current = current[step];

  if (!current) throw `Text collection ${id} does not exist.`;

  return current as TextCollection<T>;
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
