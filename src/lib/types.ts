export interface ITheme {
  navbarBG1: string;
  navbarBG2: string;
  navbarText: string;
  navbarAccent: string;
  accent: string;
  bg: string;
  text: string;
  cardBG: string;
  cardText: string;
  cardAccent: string;
}

export type ThemeProp = keyof ITheme;
