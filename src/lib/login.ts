import prisma from '$lib/server/db';
import type { user } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import cookie from 'cookie';
import * as uuid from 'uuid';

export async function findToken(token: string, tokens: string[]): Promise<string | null> {
	let foundToken: string | null = null;
	for (const userToken of tokens) {
		if (await bcrypt.compare(token, userToken)) {
			foundToken = userToken;
			break;
		}
	}
	return foundToken;
}

// this is a one-off class for checkLogin
export class CheckedLogin {
	public constructor(public user: user, public foundToken: string) {}
}

// if this function returns a checked login, the login is valid
export async function checkLogin(
	username: string,
	sentToken: string
): Promise<CheckedLogin | null> {
	const user = await prisma.user.findFirst({
		where: {
			username
		}
	});

	if (user === null) {
		return null;
	}

	const foundToken = await findToken(sentToken, user.token);
	if (foundToken === null) {
		return null;
	}

	return new CheckedLogin(user, foundToken);
}

export function makeCookie(name: string, data: string | null, baseDate: number | null): string {
	const date = baseDate ?? Date.now();
	if (data === null)
		return cookie.serialize(name, '', {
			secure: true,
			expires: new Date(date - 1000)
		});
	return cookie.serialize(name, data, {
		secure: true,
		expires: new Date(date + 1000 * 3600 * 24 * 30)
	});
}

export async function hash(data: string | Buffer): Promise<string> {
	return await bcrypt.hash(data, await bcrypt.genSalt(10));
}

export async function randomHash(): Promise<string> {
	return await hash(uuid.v4());
}

export function reply(body: object, status: number, headers?: HeadersInit): Response {
	return new Response(JSON.stringify({ body }), { status, headers });
}

export function replyError<T extends object>(error: string, message: string): Response {
	return reply(<T>{ error, message }, 500);
}

export function replyWithCookies<T extends object>(
	message: string,
	usernameCookie: string,
	tokenCookie: string
): Response {
	return reply(<T>{ message, usernameCookie }, 200, { 'Set-Cookie': tokenCookie });
}

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
