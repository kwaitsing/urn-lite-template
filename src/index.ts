import { Elysia, urnLogger } from "urn-development-pack";

const app = new Elysia()
  .use(urnLogger({}))
  .onAfterHandle(({ responseValue, set, path }) => {
    if (responseValue instanceof Response) return responseValue // respectful exit
    if (!set.status) set.status = 200
    return {
      data: responseValue
    }
  })
  .onError(({ error, set, path }) => {
    const status =
      //@ts-expect-error error is a compound
      typeof error.status === 'number'
        //@ts-expect-error
        ? (error.status as number)
        : (set.status ?? 500)

    set.status = status
    if (typeof error === 'object' && error !== null) {
      return { error: error };
    }

    return {
      error: String(error)
    }
  })
  // Load your Controller Instance as following

  // Final Ignition
  .listen(3000);

console.log(
  `App is running at ${app.server?.hostname}:${app.server?.port}`
);
