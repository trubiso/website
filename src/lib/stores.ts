import { writable } from 'svelte/store';
import type { ITheme } from './types';
import { themes } from './json';
import { localStorage, persist } from '@macfja/svelte-persistent-store';
// waiting for them to fix the require issue

export const lang = writable('none');
persist(lang, localStorage(true), 'lang');
export const theme = writable<ITheme>(themes.smilie);
persist(theme, localStorage(true), 'theme');
export const sidebarLocation = writable(false);
persist(sidebarLocation, localStorage(true), 'sidebarLocation');
export const sidebarStyle = writable(false);
persist(sidebarStyle, localStorage(true), 'sidebarStyle');
export const fishy = writable(true);
persist(fishy, localStorage(true), 'fishy');
export const spiny = writable(false);
export const mobile = writable(false);
export const lock = writable(false);
export const copiedColor = writable('#000000');
persist(copiedColor, localStorage(true), 'copiedColor')
