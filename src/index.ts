import { Elysia, Logestic } from "urn-development-pack";

const app = new Elysia()
  .onError(({ error, set }) => {
    if (set.status === 500) {
      return `${error}`
    }
    return {
      //@ts-ignore
      status: error.status,
      msg: `${error}`
    }
  })
  .mapResponse(({ response, set, path }) => {
    if (path.includes('/swagger')) return;
    return new Response(
      JSON.stringify({
        status: set.status,
        ...(set.status !== 500 ? { data: response } : { msg: response })
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
      .use(Logestic.preset('fancy'))
      // Load your controllers below
  )
  // Routes that no vaildation process is required
  ;

console.log(
  `App is running at ${app.server?.hostname}:${app.server?.port}`
);
