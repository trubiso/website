import type { ISocialMediaEntry } from './types';
import { emoteLinks, emoteNames } from './json/emotes.json';
export * from './functions';
export * from './types';
import * as themesJSON from './json/themes.json';

import international from './json/langs/international.json';
import english from './json/langs/english.json';
import oogieBoogie from './json/langs/oogieBoogie.json';
import smilie from './json/langs/smilie.json';
import spanish from './json/langs/spanish.json';
import macedonian from './json/langs/macedonian.json';

export const socialMedias: Map<string, ISocialMediaEntry> = new Map()
  .set('github', {
    name: 'trubiso',
    link: 'https://github.com/trubiso'
  })
  .set('twitch', {
    name: 'trubiso',
    link: 'https://twitch.tv/trubiso'
  })
  .set('discord', {
    name: '@Trubiso#5265'
  });

export const emotes: Map<string, string> = new Map();

for (let i = 0; i < emoteNames.length; i++) {
  emotes.set(emoteNames[i], emoteLinks[i]);
}

export const navbarItems: string[] = [
  '/',
  '/smilys',
  '/bad',
  '/kity',
  '/games',
  '/q+a',
  '/socials',
  '/options'
];

export const texts = {
  ...international,
  error: [english.error, smilie.error, oogieBoogie.error, spanish.error, macedonian.error],
  themes: [english.themes, smilie.themes, oogieBoogie.themes, spanish.themes, macedonian.themes],
  index: {
    reasons: [
      english.index.reasons,
      smilie.index.reasons,
      oogieBoogie.index.reasons,
      spanish.index.reasons,
      macedonian.index.reasons
    ],
    texts: [
      english.index.texts,
      smilie.index.texts,
      oogieBoogie.index.texts,
      spanish.index.texts,
      macedonian.index.texts
    ]
  },
  options: {
    langs: [
      english.options.langs,
      smilie.options.langs,
      oogieBoogie.options.langs,
      spanish.options.langs,
      macedonian.options.langs
    ],
    themes: [
      english.options.themes,
      smilie.options.themes,
      oogieBoogie.options.themes,
      spanish.options.themes,
      macedonian.options.themes
    ]
  },
  navbar_items: [
    english.navbar_items,
    smilie.navbar_items,
    oogieBoogie.navbar_items,
    spanish.navbar_items,
    macedonian.navbar_items
  ],
  smilies: {
    texts: [
      english.smilies.texts,
      smilie.smilies.texts,
      oogieBoogie.smilies.texts,
      spanish.smilies.texts,
      macedonian.smilies.texts
    ],
    sorts: [
      english.smilies.sorts,
      smilie.smilies.sorts,
      oogieBoogie.smilies.sorts,
      spanish.smilies.sorts,
      macedonian.smilies.sorts
    ]
  },
  'q+a': [english['q+a'], smilie['q+a'], oogieBoogie['q+a'], spanish['q+a'], macedonian['q+a']]
};

export const themeColors = themesJSON;
