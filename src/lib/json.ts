import * as emotesJSON from '../json/emotes.json';
import * as langsJSON from '../json/langs.json';
import * as navbarJSON from '../json/navbar.json';
import * as orderJSON from '../json/order.json';
import * as socialMediaJSON from '../json/socialmedia.json';
import * as stringsJSON from '../json/strings.json';
import * as themesJSON from '../json/themes.json';
import type { ThemeProp } from './types';

export const emotes = emotesJSON;
export const themes = themesJSON;
export const langs = langsJSON;
export const strings = stringsJSON;
export const navbar = navbarJSON; // no log_in in navbar.order because it's a special element
export const order = orderJSON as {
	themes: string[];
	langs: string[];
	socialMedia: ('github' | 'twitch' | 'discord' | 'newgrounds')[];
	themeProps: ThemeProp[];
}; // navbar not there because already in navbar.json
export const socialMedia = socialMediaJSON;
