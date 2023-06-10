interface Messenger {
	message: string;
}

interface Negative extends Messenger {
	error: string;
	message: string;
}

interface LogPositive extends Messenger {
	message: string;
	usernameCookie: string;
}

interface LogoutNegative extends Negative {
	error: 'ok' | 'unknown';
	message: string;
}

interface LoginNegative extends Negative {
	error: 'ok' | 'username' | 'password' | 'unknown';
	message: string;
}

export type Logout = LogoutNegative | LogPositive;
export type Login = LoginNegative | LogPositive;

interface RegisterPositive extends Messenger {
	message: string;
}

interface RegisterNegative extends Negative {
	error: 'username' | 'badname' | 'badnamelen' | 'password' | 'unknown';
	message: string;
}

export type Register = RegisterPositive | RegisterNegative;

export interface LogoutInput {
	all: boolean;
}
export interface LoginInput {
	username: string;
	password: string;
}
export interface RegisterInput {
	username: string;
	password: string;
	passwordConfirm: string;
}

async function status<A, B>(
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	positive: (body: any) => A,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	negative: (body: any) => B
): Promise<A | B> {
	const json = await res.json();
	const body = json.body;
	switch (res.status) {
		case 200:
			return positive(body);
		case 500:
			return negative(body);
		default:
			throw 'what';
	}
}

async function statusCast<A, B>(res: Response): Promise<A | B> {
	return status(
		res,
		(body) => body as A,
		(body) => body as B
	);
}

export async function interpretUserLog<T extends boolean>(
	res: Response
): Promise<T extends false ? Logout : Login> {
	return statusCast(res);
}

export async function interpretUserNew(res: Response): Promise<Register> {
	return statusCast(res);
}

// TODO: merge all isPositive functions into one

export function isPositiveResult(
	x: LogPositive | LoginNegative | LogoutNegative
): x is LogPositive {
	return 'usernameCookie' in x;
}

export function isNegativeRegister(x: RegisterPositive | RegisterNegative): x is RegisterNegative {
	return 'error' in x;
}
