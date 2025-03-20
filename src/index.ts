import { Elysia, urnLogger } from "urn-development-pack";

const app = new Elysia()
  .use(urnLogger({}))
  .mapResponse(({ response, set, path, error }) => {
    if (path.includes('/swagger')) return;
    return new Response(
      JSON.stringify({
        status: set.status,
        ...(Number(set.status) < 400 ? { data: response } : { msg: `${error}` })
      }),
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
    )
  })
  .guard({
    // Your vaildation here
  }, (app) =>
    app
    // Load your controllers below
  )
  // Routes that no vaildation process is required
  ;

console.log(
  `App is running at ${app.server?.hostname}:${app.server?.port}`
);
