import prisma from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import cookie from 'cookie';
import { getRequestCookie } from '$lib/vars';

export const post: RequestHandler = async ({ request }) => {
  try {
    const req = await request.json();

    const username = req.username;
    const password = req.password;

    const sentToken = getRequestCookie(request, 'token');

    const user = await prisma.users.findFirst({
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

    if (user.token.includes(sentToken)) {
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

    await prisma.users.update({
      where: {
        id: user.id
      },
      data: {
        token: [...user.token, token]
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
