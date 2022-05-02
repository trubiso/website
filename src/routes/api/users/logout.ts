import prisma from '$lib/db';
import { getRequestCookie } from '$lib/vars';
import type { RequestHandler } from '@sveltejs/kit';

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

    const user = await prisma.user.findFirst({
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

    await prisma.user.update({
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
      status: 500,
      body: {
        message: `${error}`,
        error: 'unknown'
      }
    };
  }
};
