import * as faunadb from "faunadb";

export function getFaunaError(error) {
  const { code, description } = error.requestResult.responseContent.errors[0];
  let status;

  switch (code) {
    case "instance not found":
      status = 404;
      break;
    case "instance not unique":
      status = 409;
      break;
    case "permission denied":
      status = 403;
      break;
    case "unauthorized":
    case "authentication failed":
      status = 401;
      break;
    default:
      status = 500;
  }

  return { code, description, status };
}

// const {
//   Create,
//   Collection,
//   Match,
//   Index,
//   Get,
//   Ref,
//   Paginate,
//   Sum,
//   Delete,
//   Add,
//   Select,
//   Let,
//   Var,
//   Update,
// } = faunadb.query;

const configureFauna = async (context) => {
  const client = new faunadb.Client({
    secret: context.env.FAUNA_SECRET,
    domain: "db.us.fauna.com",
  });
  context.data.client = client;
  return await context.next();
};

const errorHandler = async ({ next }) => {
  try {
    return await next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
};

export const onRequest = [errorHandler, configureFauna];
