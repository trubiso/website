import { get } from "svelte/store";
import { strings } from "./json";
import { lang } from "./stores";

// TODO: make a type system so it suggests stuff like
// index.top, navbar.home, ...
export function t<T extends string>(id: T): string {
  const path = id.split('.');
  const currLang = get(lang) === 'none' ? 'en' : get(lang);
  type Traverser = Record<string, Record<string, string>> | Record<string, string> | string;

  let current: Traverser = strings[currLang];

  for (const step of path) current = current[step];

  if (!current) throw `String with ID ${id} does not exist.`;

  if (typeof current != 'string') throw `Cannot get more than 1 string at a time (provided: ${id}).`;

  return current;
}