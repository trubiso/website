import prisma from '$lib/db';
import { arrContainsHashed, getRequestCookie } from '$lib/vars';
import type { RequestHandler } from '@sveltejs/kit';
import * as bcrypt from 'bcrypt';

export const get: RequestHandler = async ({ url, request }) => {
  try {
    const sentToken = getRequestCookie(request, 'token');
    const removeTokens = url.searchParams.has('all');

    if (!sentToken) {
      return {
        status: 500,
        body: {
          message: 'Not logged in.',
          error: 'login'
        }
      };
    }

    const users = await prisma.user.findMany({
      where: {
        token: {
          isEmpty: false
        }
      }
    });

    const user = users.find((v) => arrContainsHashed(sentToken, v.token));

    if (user == null) {
      return {
        status: 500,
        body: {
          message: 'Not logged in.',
          error: 'login'
        }
      };
    }

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        token: removeTokens
          ? []
          : user.token.filter((token) => !bcrypt.compareSync(token, sentToken))
      }
    });

    return {
      body: {
        message: 'OK'
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
