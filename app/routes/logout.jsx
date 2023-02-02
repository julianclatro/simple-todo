import { redirect } from '@remix-run/node';
import { closeSession } from '~/utils/session.server';

export const loader = async ({ request }) => {
  return await closeSession(request);
};