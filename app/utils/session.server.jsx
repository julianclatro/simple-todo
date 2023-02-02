import {
  json,
  createCookie,
  createFileSessionStorage,
  redirect
} from '@remix-run/node';
import { randomUUID } from 'crypto'
// CONFIGURACION DE SESSION
const sessionCookie = createCookie("__session", {
  secrets: ["r3m1xr0ck5"],
  sameSite: true,
});

// COMO SE PERSISTE LA SESSION
const { getSession, commitSession, destroySession } =
  createFileSessionStorage({
  dir: "./sessions",
  cookie: sessionCookie,
});

// DELETE
export async function closeSession(request) {
  let session = await getSession(request.headers.get("Cookie"));
  destroySession(session)
  return redirect('/')
}
// POST
export async function createUserSession() {
  let session = await getSession();
  session.set("session", { sessionId: randomUUID(), todo: [] });
  return redirect('/', {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
// PUT
export async function updateSession(request, data) {
  let session = await getSession(request.headers.get("Cookie"));
  const d = session.get('session')
  session.set("session", { ...d, todo: [ ...d.todo, ...data ]});
  return json(
    { message:'Session Updated'},
    { status: 200, headers: { "Set-Cookie": await commitSession(session) } });
}
// GET
export async function sessionState(request) {
  let session = await getSession(request.headers.get("Cookie"));
  return session.get("session");
}