import * as db from "faunadb";

export async function onRequest(context) {
  // Contents of context object
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;

  const q = db.query;

  const all = await context.data.client.query(
    q.Map(
      q.Paginate(q.Match(q.Index("search-links"))),
      q.Lambda("X", q.Get(q.Var("X")))
    )
  );

  return new Response(JSON.stringify(all));
}
