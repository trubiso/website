import { getRequestCookie } from '$lib/functions';
import prisma from '$lib/server/db';
import type { RequestHandler } from '@sveltejs/kit';
import * as bcrypt from 'bcrypt';
import cookie from 'cookie';
import * as uuid from 'uuid';

async function findToken(token: string, tokens: string[]): Promise<string | null> {
	let foundToken: string | null = null;
	for (const userToken of tokens) {
		if (await bcrypt.compare(token, userToken)) {
			foundToken = userToken;
			break;
		}
	}
	return foundToken;
}

function makeCookie(name: string, data: string | null, baseDate: number | null): string {
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

// LOG IN
export const POST: RequestHandler = async ({ request }) => {
	try {
		const req = await request.json();

		const username = req.username;
		const password = req.password;

		const sentToken = getRequestCookie(request, 'token');

		const user = await prisma.user.findFirst({
			where: {
				username: username
			}
		});

		if (!user) {
			return new Response(
				JSON.stringify({
					body: {
						message: `User not found.`,
						error: 'username'
					}
				}),
				{ status: 500 }
			);
		}

		if (sentToken)
			if ((await findToken(sentToken, user.token)) !== null) {
				return new Response(
					JSON.stringify({
						body: {
							message: 'Already logged in.',
							error: 'ok'
						}
					}),
					{ status: 500 }
				);
			}

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			return new Response(
				JSON.stringify({
					body: {
						message: `Password is incorrect.`,
						error: 'password'
					}
				}),
				{ status: 500 }
			);
		}

		const token = bcrypt.hashSync(uuid.v4(), 10);
		const hashedToken = await bcrypt.hash(token, await bcrypt.genSalt(10));

		await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				token: [...user.token, hashedToken]
			}
		});

		const baseDate = Date.now();
		const tokenCookie = makeCookie('token', token, baseDate);
		const usernameCookie = makeCookie('username', username, baseDate);

		return new Response(JSON.stringify({ body: { message: `OK`, usernameCookie } }), {
			headers: { 'Set-Cookie': tokenCookie }
		});
	} catch (error) {
		return new Response(
			JSON.stringify({
				body: {
					message: `${error}`,
					error: 'unknown'
				}
			}),
			{ status: 500 }
		);
	}
};

// LOG OUT
export const GET: RequestHandler = async ({ url, request }) => {
	try {
		const sentToken = getRequestCookie(request, 'token');
		const who = getRequestCookie(request, 'username');
		const removeTokens = url.searchParams.has('all');

		if (who === null || sentToken === null) {
			return new Response(
				JSON.stringify({
					body: {
						message: 'Not logged in.',
						error: 'ok'
					}
				}),
				{ status: 500 }
			);
		}

		const baseDate = Date.now();
		const tokenCookie = makeCookie('token', null, baseDate);
		const usernameCookie = makeCookie('username', null, baseDate);

		const user = await prisma.user.findFirst({
			where: {
				username: who
			}
		});

		if (user === null) {
			return new Response(
				JSON.stringify({
					body: {
						message: 'Removing illegal login.',
						usernameCookie
					}
				}),
				{ headers: { 'Set-Cookie': tokenCookie } }
			);
		}

		const foundToken = await findToken(sentToken, user.token);
		if (foundToken === null) {
			return new Response(
				JSON.stringify({
					body: {
						message: 'Removing illegal login.',
						usernameCookie
					}
				}),
				{ headers: { 'Set-Cookie': tokenCookie } }
			);
		}

		await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				token: removeTokens ? [] : user.token.filter((token) => token !== foundToken)
			}
		});
		
		return new Response(JSON.stringify({ body: { message: `OK`, usernameCookie } }), {
			headers: { 'Set-Cookie': tokenCookie }
		});
	} catch (error) {
		return new Response(
			JSON.stringify({
				body: {
					message: `${error}`,
					error: 'unknown'
				}
			}),
			{ status: 500 }
		);
	}
};
