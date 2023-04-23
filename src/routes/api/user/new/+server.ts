import prisma from '$lib/server/db';
import { hash, reply, replyError, replyErrorInvalid } from '$lib/server/user';
import type { RequestHandler } from '@sveltejs/kit';
import * as uuid from 'uuid';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const req = await request.json();

		if (!('username' in req && 'password' in req && 'passwordConfirm' in req))
			return replyErrorInvalid();

		const username: string = req.username.trim();
		const password: string = req.password;
		const passwordConfirm: string = req.passwordConfirm;

		if (password !== passwordConfirm) return replyError('password', "Passwords don't match.");

		const sameName = await prisma.user.findFirst({
			where: { username: { equals: username, mode: 'insensitive' } }
		});

		if (sameName !== null) return replyError('username', 'Username already exists.');

		if (!username.match(/^[a-zA-Z0-9._\-?!]+$/))
			return replyError('badname', 'Username must only have alphanumeric characters/punctuation.');

		if (username.length > 32)
			return replyError('badnamelen', 'Username must be less than 32 characters.');

		const hashed = await hash(password);
		const id = uuid.v4();

		await prisma.user.create({
			data: {
				id,
				username: username,
				password: hashed,
				creation: new Date()
			}
		});

		return reply({ message: 'OK' });
	} catch (error) {
		return replyError('unknown', `${error}`);
	}
};
