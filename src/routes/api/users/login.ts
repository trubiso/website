import prisma from '$lib/db';
import { arrContainsHashed, getRequestCookie } from '$lib/vars';
import type { RequestHandler } from '@sveltejs/kit';
import * as bcrypt from 'bcrypt';
import cookie from 'cookie';
import * as uuid from 'uuid';

export const post: RequestHandler = async ({ request }) => {
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
      return {
        status: 500,
        body: {
          message: `User not found.`,
          error: 'username'
        }
      };
    }

    if (arrContainsHashed(sentToken, user.token)) {
      // token's hashed
      return {
        status: 500,
        body: {
          message: 'Already logged in.',
          error: 'ok'
        }
      };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return {
        status: 500,
        body: {
          message: `Password is incorrect.`,
          error: 'password'
        }
      };
    }

    const token = bcrypt.hashSync(uuid.v4(), 10);

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        token: [...user.token, bcrypt.hashSync(token, 10)] // hash token again
      }
    });

    return {
      body: {
        message: `OK`
      },
      headers: {
        'Set-Cookie': cookie.serialize('token', token, {
          secure: true,
          expires: new Date(Date.now() + 1000 * 3600 * 24 * 30)
        })
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
