import {
	interpretUserLog,
	interpretUserNew,
	type Login,
	type LoginInput,
	type Logout,
	type LogoutInput,
	type Register,
	type RegisterInput
} from '$lib/api';

type FetchType = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

async function apiUserLog<T extends 'GET' | 'POST'>(
	x: T,
	i: T extends 'GET' ? LogoutInput : LoginInput,
	f: FetchType
) {
	let url = '/api/user/log';
	if (x === 'GET' && (i as LogoutInput).all) url += '?all';
	const res = await f(url, {
		method: x,
		body: JSON.stringify(x === 'GET' ? {} : i)
	});
	const isLogin = x === 'POST';
	return interpretUserLog<typeof isLogin>(res);
}

async function apiUserNew(i: RegisterInput, f: FetchType) {
	const res = await f('/api/user/new', {
		method: 'POST',
		body: JSON.stringify(i)
	});
	return interpretUserNew(res);
}

export async function api<T extends 'user/login' | 'user/logout' | 'user/new'>(
	x: T,
	i: T extends 'user/login'
		? LoginInput
		: T extends 'user/logout'
		? LogoutInput
		: T extends 'user/new'
		? RegisterInput
		: object,
	f: FetchType = fetch
): Promise<
	T extends 'user/login'
		? Login
		: T extends 'user/logout'
		? Logout
		: T extends 'user/new'
		? Register
		: object
> {
	switch (x) {
		case 'user/login':
		case 'user/logout':
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			return apiUserLog(x === 'user/logout' ? 'GET' : 'POST', i, f);
		case 'user/new':
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			return apiUserNew(i as RegisterInput, f);
		default:
			throw '';
	}
}
