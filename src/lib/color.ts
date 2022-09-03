export function HSVtoRGB(h: number, s: number, v: number): [number, number, number] {
	while (h >= 360) h -= 360;
	const M = 255 * v;
	const m = M * (1 - s);
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
	function t(n: number) {
		const q = Math.floor(n).toString(16);
		return q.length == 1 ? `0${q}` : q;
	}
	const hex = t(r) + t(g) + t(b);
	if (hex.length > 6) throw `Invalid RGB values (${r},${g},${b})`;
	return `#${hex}`;
}

export function HSVtoHEX(h: number, s: number, v: number) {
	const [r, g, b] = HSVtoRGB(h, s, v);
	return RGBtoHEX(r, g, b);
}
