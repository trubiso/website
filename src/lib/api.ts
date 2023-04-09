interface LogPositive {
	message: string;
	usernameCookie: string;
}

interface LogoutNegative {
	error: 'ok' | 'unknown';
	message: string;
}

interface LoginNegative {
	error: 'ok' | 'username' | 'password' | 'unknown';
	message: string;
}

export type Logout = LogoutNegative | LogPositive;
export type Login = LoginNegative | LogPositive;

export async function interpretLog<T extends boolean>(
	res: Response
): Promise<T extends false ? Logout : Login> {
	const json = await res.json();
	const body = json.body;
	switch (res.status) {
		case 200:
			return <LogPositive>{
				message: body.message,
				usernameCookie: body.usernameCookie
			};
		case 500:
			return {
				message: body.message,
				error: body.error
			};
		default:
			throw 'what';
	}
}

export function isPositiveResult(
	x: LogPositive | LoginNegative | LogoutNegative
): x is LogPositive {
	return 'usernameCookie' in x;
}
