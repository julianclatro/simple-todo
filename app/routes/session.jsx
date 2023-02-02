import { createUserSession } from '~/utils/session.server';

export const loader = async ({ request }) => {
  return await createUserSession();
};