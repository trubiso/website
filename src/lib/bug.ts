import { derived } from 'svelte/store';
import { keys } from './functions';
import { strings } from './json';
import { t, type LocalizationKey as L } from './localization';

const basicTags = [
	'exploit',
	'bug',
	'visual',
	'ergonomic',
	'mobile',
	'pc',
	'removal',
	'suggestion',
	'navbar',
	'tags',
	'colorpicker',
	'pages',
	'themes',
	'themeProps'
];
const tags = [...basicTags];

keys(strings.en.navbar)
	.filter((x) => x !== 'logo' && x !== 'log_in')
	.forEach((x) => tags.push(`page:${x}`));
keys(strings.en.themes).forEach((x) => tags.push(`theme:${x}`));
keys(strings.en.themeProps).forEach((x) => tags.push(`themeProp:${x}`));

export const bugTags = tags;
export const sectionedBugTags = [
	bugTags.slice(0, basicTags.length),
	bugTags.slice(basicTags.length, basicTags.length + keys(strings.en.navbar).length - 2),
	bugTags.slice(
		basicTags.length + keys(strings.en.navbar).length - 2,
		basicTags.length + keys(strings.en.navbar).length - 2 + keys(strings.en.themes).length
	),
	bugTags.slice(
		basicTags.length + keys(strings.en.navbar).length - 2 + keys(strings.en.themes).length
	)
];
export const sectionNames = ['tag.tags', 'tag.pages', 'tag.themes', 'tag.themeProps'] as L[];

function localizeTagInner($t: (id: L) => string, tag: string): string {
	if (tag.includes(':')) {
		const splitTag = tag.split(':');
		switch (splitTag[0]) {
			case 'page':
				return $t('tag.pagePre') + $t(`navbar.${splitTag[1]}` as L);
			case 'theme':
				return $t('tag.themePre') + $t(`themes.${splitTag[1]}` as L);
			case 'themeProp':
				return $t('tag.themePropPre') + $t(`themeProps.${splitTag[1]}` as L);
			default:
				throw `unknown tag ${tag}`;
		}
	} else {
		return $t(`tag.${tag}` as L);
	}
}

export const localizeTag = derived(t, ($t) => (tag: string) => localizeTagInner($t, tag));
