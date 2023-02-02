import { Outlet } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { updateSession } from "~/utils/session.server";

// POST
// Define the action as an async function
export const action = async ({ request }) => {
  // Get the request body as text
  let form = new URLSearchParams(await request.text());
  // Get the value of the name field from the request body
  let name = form.get("name");
  await updateSession(request, [name])
  return redirect('/')
};

export default function Index() {
  return <Outlet />
}