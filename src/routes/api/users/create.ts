/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';

export const post: RequestHandler = async ({ request }) => {
  try {
    const req = await request.json();

    const username: string = req.username.trim();

    if (
      (await prisma.user.findFirst({
        where: {
          username: {
            equals: username,
            mode: 'insensitive'
          }
        }
      })) != null
    ) {
      return {
        status: 500,
        body: {
          message: 'Username already exists',
          error: 'username'
        }
      };
    }

    if (!username.match(/^[a-zA-Z0-9._\-?!]+$/))
      return {
        status: 500,
        body: {
          message: `Username must only have alphanumeric or punctuation characters.`,
          error: 'badname'
        }
      };

    if (username.length > 32)
      return {
        status: 500,
        body: {
          message: `Username must be less than 32 characters.`,
          error: 'badname'
        }
      };

    const password: string = req.password;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const id = uuid.v4();

    await prisma.user.create({
      data: {
        id,
        username: username,
        password: hash,
        creation: new Date()
      }
    });

    return {
      body: {
        message: `OK`
      }
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        message: `${error}`,
        error: 'unknown'
      }
    };
  }
};

export const get: RequestHandler = async () => {
  return {
    body: {
      message: 'die'
    }
  };
};
