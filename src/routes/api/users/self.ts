import prisma from '$lib/db';
import { getRequestCookie } from '$lib/vars';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ request }) => {
  try {
    const sentToken = getRequestCookie(request, 'token');

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

    return {
      body: {
        message: 'OK',
        user: {
          id: user.id,
          username: user.username
        }
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
