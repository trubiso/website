import type { ITheme } from "./types";

export function themeToCSS(theme: ITheme) {
  let result = '';
  const themeObj = theme as unknown as Record<string, string>; // ts is dumb, chapter 3
  // seriously though, i'm iterating over ITheme's properties and accessing them on ITheme
  // how is that possibly `any`????? does anyone know?????? i've dealt with this error so many times already
  // i think ts is draining my mental health
  for (const t in theme) {
    result += `--${t}: ${themeObj[t]};`
  }
  // whatever it works
  return result;
}