import prisma from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request }) => {
  const question = (await request.json()).question;
  try {
    await prisma.qa.create({
      data: {
        created_at: new Date(),
        question: question,
        answer: null
      }
    });
    return {
      body: {
        success: true
      }
    };
  } catch (e) {
    return {
      status: 500,
      body: {
        success: false,
        error: e
      }
    };
  }
};

export const get: RequestHandler = async ({ url }) => {
  const questionsPerPage = 20;
  let page = 1;
  if (url.searchParams.has('page')) page = parseInt(url.searchParams.get('page'));

  const questions = await prisma.qa.findMany({
    where: {
      NOT: {
        answer: null
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  });

  return {
    body: {
      questions: questions.slice((page - 1) * questionsPerPage, page * questionsPerPage),
      hasPreviousPage: page > 1,
      hasNextPage: questions.length > page * questionsPerPage
    }
  };
};
