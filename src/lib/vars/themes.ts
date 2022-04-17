import * as themeNavbar from './json/themes/navbar.json';
import * as themeContent from './json/themes/content.json';
import * as themeCard from './json/themes/card.json';

const themes = {
  navbar: themeNavbar,
  content: themeContent,
  card: themeCard
};

export type NavbarThemeName =
  | 'smilie'
  | 'marble'
  | 'owl'
  | 'plum_owl'
  | 'purple_owl'
  | 'lavender'
  | 'salmon'
  | 'panda'
  | 'basic'
  | 'hot_pink';

export type ContentThemeName = 'default' | 'comfy' | 'dark' | 'dark_comfy';
export type CardThemeName = 'coffee' | 'lavender';

export interface INavbarTheme {
  navbarBG1: string;
  navbarBG2: string;
  navbarText: string;
  navbarAccent: string;
  accent: string;
}

export interface IContentTheme {
  bg: string;
  text: string;
}

export interface ICardTheme {
  cardBG: string;
  cardText: string;
  cardAccent: string;
}

export type ITheme = INavbarTheme & IContentTheme & ICardTheme;

export function combineTheme(
  navbarTheme: NavbarThemeName = 'smilie',
  contentTheme: ContentThemeName = 'default',
  cardTheme: CardThemeName = 'coffee'
): ITheme {
  const navbar = themes.navbar[navbarTheme];
  let content = {} as IContentTheme;
  switch (contentTheme) {
    case 'default':
      content = {
        bg: '#ffffff',
        text: '#000000'
      };
      break;
    case 'dark':
      content = {
        bg: '#000000',
        text: '#ffffff'
      };
      break;
    case 'comfy':
      content = themes.content[navbarTheme].light;
      break;
    case 'dark_comfy':
      content = themes.content[navbarTheme].dark;
      break;
  }
  const card = themes.card[cardTheme];

  return {
    navbarBG1: navbar.navbarBG1,
    navbarBG2: navbar.navbarBG2,
    navbarText: navbar.navbarText,
    navbarAccent: navbar.navbarAccent,
    accent: navbar.accent,
    bg: content.bg,
    text: content.text,
    cardBG: card.bg,
    cardText: card.text,
    cardAccent: card.accent
  };
}

export default themes;
