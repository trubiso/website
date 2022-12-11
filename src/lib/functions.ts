export function padZeroes(num: number, zeroes = 2) {
  const str = num.toString();
  const zero = '0'.repeat(zeroes - str.length);
  return zero + str;
}

export function dateFormat(date: Date) {
  const day = `${date.getFullYear()}-${padZeroes(date.getMonth()+1)}-${padZeroes(date.getDate())}`;
  const time = `${padZeroes(date.getHours())}:${padZeroes(date.getMinutes())}`;
	return `${day} ${time}`;
}
