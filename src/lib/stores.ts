import { writable } from 'svelte/store';
import type { ITodoList } from './vars';
import { localStorage, persist } from '@macfja/svelte-persistent-store';

export const lang = writable(0);
export const todo = writable<ITodoList[]>([]);
persist(todo, localStorage(true), 'todo');