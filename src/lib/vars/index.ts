import type { ISocialMediaEntry } from './types';
import { emoteLinks, emoteNames } from './json/emotes.json';
export * from './functions';
export * from './types';
import * as themesJSON from './json/themes.json';

import international from './json/langs/international.json';
import english from './json/langs/en.json';
import oogieBoogie from './json/langs/ob.json';
import smilie from './json/langs/el.json';
import spanish from './json/langs/es.json';
import macedonian from './json/langs/mk.json';
import french from './json/langs/fr.json';
import polish from './json/langs/pl.json';
import tokipona from './json/langs/tp.json';
import german from './json/langs/de.json';

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
  error: [
    english.error,
    smilie.error,
    oogieBoogie.error,
    spanish.error,
    macedonian.error,
    french.error,
    polish.error,
    tokipona.error,
    german.error
  ],
  themes: [
    english.themes,
    smilie.themes,
    oogieBoogie.themes,
    spanish.themes,
    macedonian.themes,
    french.themes,
    polish.themes,
    tokipona.themes,
    german.themes
  ],
  kitty: [
    english.kitty,
    smilie.kitty,
    oogieBoogie.kitty,
    spanish.kitty,
    macedonian.kitty,
    french.kitty,
    polish.kitty,
    tokipona.kitty,
    german.kitty
  ],
  bad: [english.bad, smilie.bad, oogieBoogie.bad, spanish.bad, macedonian.bad, french.bad, polish.bad, tokipona.bad, german.bad],
  options: {
    langs: [
      english.options.langs,
      smilie.options.langs,
      oogieBoogie.options.langs,
      spanish.options.langs,
      macedonian.options.langs,
      french.options.langs,
      polish.options.langs,
      tokipona.options.langs,
      german.options.langs
    ],
    themes: [
      english.options.themes,
      smilie.options.themes,
      oogieBoogie.options.themes,
      spanish.options.themes,
      macedonian.options.themes,
      french.options.themes,
      polish.options.themes,
      tokipona.options.themes,
      german.options.themes
    ]
  },
  index: {
    reasons: [
      english.index.reasons,
      smilie.index.reasons,
      oogieBoogie.index.reasons,
      spanish.index.reasons,
      macedonian.index.reasons,
      french.index.reasons,
      polish.index.reasons,
      tokipona.index.reasons,
      german.index.reasons
    ],
    texts: [
      english.index.texts,
      smilie.index.texts,
      oogieBoogie.index.texts,
      spanish.index.texts,
      macedonian.index.texts,
      french.index.texts,
      polish.index.texts,
      tokipona.index.texts,
      german.index.texts
    ]
  },
  navbar_items: [
    english.navbar_items,
    smilie.navbar_items,
    oogieBoogie.navbar_items,
    spanish.navbar_items,
    macedonian.navbar_items,
    french.navbar_items,
    polish.navbar_items,
    tokipona.navbar_items,
    german.navbar_items
  ],
  smilies: {
    texts: [
      english.smilies.texts,
      smilie.smilies.texts,
      oogieBoogie.smilies.texts,
      spanish.smilies.texts,
      macedonian.smilies.texts,
      french.smilies.texts,
      polish.smilies.texts,
      tokipona.smilies.texts,
      german.smilies.texts
    ],
    sorts: [
      english.smilies.sorts,
      smilie.smilies.sorts,
      oogieBoogie.smilies.sorts,
      spanish.smilies.sorts,
      macedonian.smilies.sorts,
      french.smilies.sorts,
      polish.smilies.sorts,
      tokipona.smilies.sorts,
      german.smilies.sorts
    ]
  },
  'q+a': [
    english['q+a'],
    smilie['q+a'],
    oogieBoogie['q+a'],
    spanish['q+a'],
    macedonian['q+a'],
    french['q+a'],
    polish['q+a'],
    tokipona['q+a'],
    german['q+a']
  ]
};

export const themeColors = themesJSON;
