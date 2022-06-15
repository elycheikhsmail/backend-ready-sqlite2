import { Context } from "oak";
// deno-lint-ignore require-await
export async function fn(ctx: Context) {
  ctx.response.body =
    "<h1>  ./pagesCtrl/private/objects/objectname/p_add.ts </h1>";
  ctx.response.headers.append(
    "content-type",
    "text/html",
  );
}
