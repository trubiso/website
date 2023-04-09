import { getRequestCookie } from '$lib/functions';
import prisma from '$lib/server/db';
import {
	checkLogin,
	findToken,
	hash,
	makeCookie,
	randomHash,
	replyError,
	replyWithCookies
} from '$lib/server/user';
import type { RequestHandler } from '@sveltejs/kit';
import * as bcrypt from 'bcryptjs';

// LOG IN
export const POST: RequestHandler = async ({ request }) => {
	try {
		const req = await request.json();

		const username = req.username;
		const password = req.password;

		const sentToken = getRequestCookie(request, 'token');

		const user = await prisma.user.findFirst({ where: { username } });

		if (!user) return replyError('username', 'User not found.');

		if (sentToken)
			if ((await findToken(sentToken, user.token)) !== null)
				return replyError('ok', 'Already logged in.');

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) return replyError('password', 'Password is incorrect.');

		const token = await randomHash();
		const hashedToken = await hash(token);

		await prisma.user.update({
			where: { id: user.id },
			data: { token: [...user.token, hashedToken] }
		});

		const baseDate = Date.now();
		const tokenCookie = makeCookie('token', token, baseDate);
		const usernameCookie = makeCookie('username', username, baseDate);

		return replyWithCookies('OK', usernameCookie, tokenCookie);
	} catch (error) {
		return replyError('unknown', `${error}`);
	}
};

// LOG OUT
export const GET: RequestHandler = async ({ url, request }) => {
	try {
		const sentToken = getRequestCookie(request, 'token');
		const who = getRequestCookie(request, 'username');
		const removeAll = url.searchParams.has('all');

		if (who === null || sentToken === null) return replyError('ok', 'Not logged in.');

		const baseDate = Date.now();
		const tokenCookie = makeCookie('token', null, baseDate);
		const usernameCookie = makeCookie('username', null, baseDate);

		const checked = await checkLogin(who, sentToken);
		if (checked === null)
			return replyWithCookies('Removing illegal login.', usernameCookie, tokenCookie);

		let newTokens: string[];
		if (removeAll) newTokens = [];
		else newTokens = checked.user.token.filter((token) => token !== checked.foundToken);

		await prisma.user.update({
			where: { id: checked.user.id },
			data: { token: newTokens }
		});

		return replyWithCookies('OK', usernameCookie, tokenCookie);
	} catch (error) {
		return replyError('unknown', `${error}`);
	}
};
