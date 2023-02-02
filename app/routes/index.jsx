import { Link, useLoaderData } from "@remix-run/react";
import { sessionState } from "~/utils/session.server";

export const loader = async ({ request }) => {
  const session = await sessionState(request);
  return { session };
}
export default function Index() {
  const data = useLoaderData();
  console.log('data', data)

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      {!!data.session ?
        <> 
          <Link to="/logout">Logout</Link>
          <h1>Todo</h1>
          <ul>
            {data.session.todo.map((t, i) => <li key={i}>{t}</li>)}        
          </ul>
          <form method="post" action="/todo">
            <input type="text" name="name" />
            <button type="submit">Add</button>
          </form>
        </>
        :
        <Link to="/session">Create Session</Link>
      }
    </div>
  );
}
