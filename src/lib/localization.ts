import { derived, type Readable } from 'svelte/store';
import { strings } from './json';
import { lang } from './stores';

type Keys<T> = {
	[K in keyof T]: T[K] extends Record<string, unknown>
		? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
		  // @ts-ignore
		  `${K}.${Keys<T[K]>}`
		: K;
}[keyof T];

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

export function t(id: Keys<typeof strings.en>): Readable<string> {
	return derived(lang, ($lang) => innerT(id, $lang));
}
