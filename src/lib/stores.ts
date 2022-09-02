import { writable } from 'svelte/store';
import type { ITheme } from './types';
import { themes } from './json';
import { localStorage, persist } from '@macfja/svelte-persistent-store';
// waiting for them to fix the require issue

export const lang = writable("none");
persist(lang, localStorage(true), 'lang');
export const theme = writable<ITheme>(themes.smilie);
persist(theme, localStorage(true), 'theme');
export const sidebarLocation = writable(1);
persist(sidebarLocation, localStorage(true), 'sidebarLocation');
export const sidebarStyle = writable(0);
persist(sidebarStyle, localStorage(true), 'sidebarStyle');
export const fishy = writable(true);
persist(fishy, localStorage(true), 'fishy');
export const spiny = writable(false);