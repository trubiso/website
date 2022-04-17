import type { ISocialMediaEntry } from './types';
import { emoteLinks, emoteNames } from './json/emotes.json';
export * from './functions';
export * from './types';
export * from './langs';
export * from './themes';

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
