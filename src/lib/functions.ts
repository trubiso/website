import { emotes } from './json';
import type { LocalizationKey, LocalizationKeyFirst } from './localization';

export function padZeroes(num: number, zeroes = 2) {
	const str = num.toString();
	const zero = '0'.repeat(zeroes - str.length);
	return zero + str;
}

export function dateFormat(date: Date) {
	const day = `${date.getFullYear()}-${padZeroes(date.getMonth() + 1)}-${padZeroes(
		date.getDate()
	)}`;
	const time = `${padZeroes(date.getHours())}:${padZeroes(date.getMinutes())}`;
	return `${day} ${time}`;
}

export function getEmote(name: string) {
	const index = emotes.emoteNames.findIndex((x) => x === name);
	if (!index) return undefined;
	return emotes.emoteLinks[index];
}

export function keys<T extends object>(data: T): (keyof T)[] {
	return Object.keys(data) as (keyof T)[];
}

function apl(a: LocalizationKeyFirst, b: string): LocalizationKey {
	return <LocalizationKey>(a + b);
}

export function submitFormFormat(who: LocalizationKeyFirst) {
	return { object: apl(who, '.object'), one: apl(who, '.one'), articled: apl(who, '.articled'), your: apl(who, '.your'), sent: apl(who, '.sent') };
}
