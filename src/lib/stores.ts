import { writable } from 'svelte/store';
import type { ITheme } from './types';
import { themes } from './json';
import { createLocalStorage, persist } from '@macfja/svelte-persistent-store';
// waiting for them to fix the require issue

export const lang = writable('none');
persist(lang, createLocalStorage(true), 'lang');
export const theme = writable<ITheme>(themes.smilie_lavender);
persist(theme, createLocalStorage(true), 'theme');
export const sidebarLocation = writable(0);
persist(sidebarLocation, createLocalStorage(true), 'sidebarLocation');
export const sidebarStyle = writable(0);
persist(sidebarStyle, createLocalStorage(true), 'sidebarStyle');
export const fishy = writable(false);
persist(fishy, createLocalStorage(true), 'fishy');
export const spiny = writable(false);
export const mobile = writable(false);
export const lock = writable(false);
export const copiedColor = writable('#000000');
persist(copiedColor, createLocalStorage(true), 'copiedColor')
