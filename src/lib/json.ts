import * as emotesJSON from '../json/emotes.json';
import * as themesJSON from '../json/themes.json';
import * as langsJSON from '../json/langs.json';
import * as stringsJSON from '../json/strings.json';
import * as navbarJSON from '../json/navbar.json';
import * as orderJSON from '../json/order.json';
import type { ThemeProp } from './types';

export const emotes = emotesJSON;
export const themes = themesJSON;
export const langs = langsJSON;
export const strings: Record<string, Record<string, Record<string, string>>> = stringsJSON;
export const navbar = navbarJSON; // no log_in in navbar.order because it's a special element
export const order = orderJSON as {"themes": string[], "langs": string[], "themeProps": ThemeProp[]}; // navbar not there because already in navbar.json