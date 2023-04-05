import { derived } from 'svelte/store';
import { strings } from './json';
import { lang } from './stores';

type Keys<T> = {
	[K in keyof T]: T[K] extends Record<string, unknown>
		? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
		  // @ts-ignore
		  `${K}.${Keys<T[K]>}`
		: K;
}[keyof T];
type LocalizationKey = Keys<typeof strings.en>;

function innerInnerT(id: string, language: string) {
	const path = id.split('.');
	type Traverser = Record<string, Record<string, string>> | Record<string, string> | string;

	let current: Traverser = (strings as Record<string, Record<string, Record<string, string>>>)[
		language
	];

	for (const step of path) current = current[step];

	if (!current) throw `String with ID ${id} does not exist.`;

	if (typeof current != 'string')
		throw `Cannot get more than 1 string at a time (provided: ${id}).`;

	return current;
}

function innerT(id: string, lang: string): string {
	const l = lang === 'none' ? 'en' : lang;
	let r;

	try {
		r = innerInnerT(id, l);
	} catch (_) {
		r = innerInnerT(id, 'en');
	}

	return r;
}

function format(id: string, lang: string, fmt: Record<string, string>): string {
	let data = innerT(id, lang);
	for (const key in fmt) {
		data = data.replaceAll(`{${key}}`, fmt[key]);
	}
	return data;
}

export const t = derived(lang, ($lang) => (id: LocalizationKey) => innerT(id, $lang));
export const f = derived(lang, ($lang) => (id: LocalizationKey) => (fmt: Record<string, string>) => format(id, $lang, fmt));
