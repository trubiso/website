import prisma from '$lib/db';
import { getRequestCookie } from '$lib/vars';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ request, url }) => {
  try {
    const requested = url.searchParams.get('username');
    const sentToken = getRequestCookie(request, 'token');

    if (!sentToken && !requested) {
      return {
        status: 500,
        body: {
          message: 'Not logged in.',
          error: 'login'
        }
      };
    }

    const user = await prisma.user.findFirst({
      where: requested
        ? {
            username: {
              equals: requested,
              mode: 'insensitive'
            }
          }
        : {
            token: { has: sentToken }
          }
    });

    if (user == null) {
      if (requested)
        return {
          status: 500,
          body: {
            message: "User doesn't exist",
            error: 'username'
          }
        };
      else
        return {
          status: 500,
          body: {
            message: 'Not logged in.',
            error: 'login'
          }
        };
    }

    let profile = await prisma.profile.findFirst({
      where: {
        id: user.id
      }
    });

    if (profile == null)
      profile = {
        id: user.id,
        name: '',
        avatar: '',
        bg: '',
        isBgLink: false,
        isBgTile: false,
        text: '',
        accent: '',
        banner: '',
        bio: '',
        location: '',
        website: ''
      };

    return {
      body: {
        message: 'OK',
        user: {
          id: user.id,
          username: user.username
        },
        profile: profile
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
