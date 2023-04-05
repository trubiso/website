import { keys } from './functions';
import { strings } from './json';

const tags = [
	'exploit',
	'bug',
	'visual',
	'ergonomic',
	'enhancement',
	'removal',
	'new page',
	'qol',
	'suggestion',
	'navbar',
	'pages',
	'themes',
	'theme colors'
];

keys(strings.en.navbar)
	.filter((x) => x !== 'logo' && x !== 'log_in')
	.forEach((x) => tags.push(`page: ${strings.en.navbar[x]}`));
keys(strings.en.themes).forEach((x) => tags.push(`theme: ${strings.en.themes[x]}`));
keys(strings.en.themeProps).forEach((x) => tags.push(`theme color: ${strings.en.themeProps[x]}`));

export const bugTags = tags;
