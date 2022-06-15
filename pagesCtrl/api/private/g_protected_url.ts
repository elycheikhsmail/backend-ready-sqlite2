import { Context, Status } from "oak";
import { getTokenState, validationAuthstate } from "./helper.ts";
// deno-lint-ignore require-await
export async function fn(ctx: Context) {
  const token =
    ctx.request.headers.get("authorization")?.split("bearer ")?.[1] || "";
   
  const token_state = getTokenState(token);
  
  switch (token_state.user_validation) {
    case validationAuthstate.token_valide:
      ctx.response.status = Status.OK;
      // username must returned by validation step
      ctx.response.body = {
        username: token_state.username,
      };
      ctx.response.headers.append(
        "content-type",
        "application/json",
      );
      break;

    default:
      ctx.response.status = Status.Unauthorized;
      ctx.response.body = {
        msg: "protected",
      };
      break;
  }
}
