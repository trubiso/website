type RGB = [number, number, number];

export function validateHEX(hex: string): boolean {
	if (!hex.startsWith('#')) return false;
	if (
		hex
			.slice(1, 7)
			.split('')
			.some((v) => !'0123456789abcdef'.split('').includes(v))
	)
		return false;
	if (hex.length !== 7) return false;
	return true;
}

export function validateRGB(r: number, g: number, b: number): boolean {
	function v(n: number) {
		if (isNaN(n)) return false;
		if (n < 0 || n > 255) return false;
		return true;
	}
	return v(r) && v(g) && v(b);
}

export function HSVtoRGB(h: number, s: number, v: number): RGB {
	while (h >= 360) h -= 360;
	const M = 255 * (v / 100);
	const m = M * (1 - s / 100);
	const z = (M - m) * (1 - Math.abs(((h / 60) % 2) - 1));
	let r = 0;
	let g = 0;
	let b = 0;
	function btw(n: number, min: number, max: number) {
		return n >= min && n < max;
	}
	// r
	if (btw(h, 0, 60) || btw(h, 300, 360)) r = M;
	else if (btw(h, 60, 120) || btw(h, 240, 300)) r = z + m;
	else if (btw(h, 120, 240)) r = m;
	// g
	if (btw(h, 60, 180)) g = M;
	else if (btw(h, 0, 60) || btw(h, 180, 240)) g = z + m;
	else if (btw(h, 240, 360)) g = m;
	// b
	if (btw(h, 180, 300)) b = M;
	else if (btw(h, 120, 180) || btw(h, 300, 360)) b = z + m;
	else if (btw(h, 0, 120)) b = m;

	return [r, g, b];
}

export function RGBtoHEX(r: number, g: number, b: number): string {
	if (!validateRGB(r, g, b)) throw new Error(`Invalid RGB values (${r},${g},${b})`);
	function t(n: number) {
		const q = Math.floor(n).toString(16);
		return q.length == 1 ? `0${q}` : q;
	}
	const hex = `#${t(r) + t(g) + t(b)}`;
	if (!validateHEX(hex)) throw new Error(`Invalid RGB values (${r},${g},${b})`);
	return hex;
}

export function HSVtoHEX(h: number, s: number, v: number): string {
	const [r, g, b] = HSVtoRGB(h, s, v);
	return RGBtoHEX(r, g, b);
}

export function HEXtoRGB(hex: string): RGB {
	if (!validateHEX(hex)) throw new Error(`Invalid hex code ${hex}.`);
	const r = hex.slice(1, 3);
	const g = hex.slice(3, 5);
	const b = hex.slice(5, 7);
	const rVal = parseInt(r, 16);
	const gVal = parseInt(g, 16);
	const bVal = parseInt(b, 16);
	return [rVal, gVal, bVal];
}
