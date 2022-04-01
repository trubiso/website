import { writable } from 'svelte/store';
import type { ITheme, ITodoList } from './vars';
import { localStorage, persist } from '@macfja/svelte-persistent-store';

export const lang = writable(0);
export const theme = writable<string | ITheme>('smilie');
export const todo = writable<ITodoList[]>([]);
persist(todo, localStorage(true), 'todo');
export const fishy = writable(true);
persist(fishy, localStorage(true), 'fishy');
export const spiny = writable(false);