import prisma from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';

export const get: RequestHandler = async ({ url, request }) => {
  try {
    const sentToken = cookie.parse(request.headers.get('Cookie'))['token'];
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

    const user = await prisma.users.findFirst({
      where: {
        token: { has: sentToken }
      }
    });

    if (user == null) {
      return {
        status: 500,
        body: {
          message: 'Not logged in.',
          error: 'login'
        }
      };
    }

    await prisma.users.update({
      where: {
        id: user.id
      },
      data: {
        token: removeTokens ? [] : user.token.filter((token) => token !== sentToken)
      }
    });

    return {
      body: {
        message: 'OK'
      }
    };
  } catch (error) {
    return {
      body: {
        message: `Error: ${error}`
      }
    };
  }
};
