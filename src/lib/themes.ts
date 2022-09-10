import { order, themes } from './json';
import type { ITheme } from './types';

export function themeToCSS(theme: ITheme) {
	let result = '';
	for (const t of order.themeProps) {
		result += `--${t}: ${theme[t]};`;
	}
	// whatever it works
	return result;
}

export function themeToCode(theme: ITheme) {
	let result = '';
	for (const t of order.themeProps) {
		result += theme[t].slice(1);
	}
	return result;
}

export function codeToTheme(code: string) {
  if (code.length % 6 !== 0) throw `Invalid theme code.`;
  const theme: ITheme = {...themes.smilie};
	for (let i = 0; i < code.length; i += 6) {
    theme[order.themeProps[i / 6]] = `#${code.slice(i, i + 6)}`;
  }
  return theme;
}
