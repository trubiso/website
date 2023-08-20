// I love this function, it's so handy
export function pick<T>(...a: T[] | T[][]) {
	const arr = a.flat();

	return arr[Math.floor(Math.random() * arr.length)];
}

// idk who wrote this function but ty
export function shuffle<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
}
