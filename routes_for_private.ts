import { Context, Router } from "oak";
const privateRoutes = new Router();

// deno-lint-ignore camelcase
import { fn as fnprivate_s_objects_s_objectname_s_p_add_ts } from "./pagesCtrl/api/private/objects/objectname/p_add.ts";
privateRoutes.post(
  "/api/private/objects/objectname/add",
  async (ctx: Context) =>
    await fnprivate_s_objects_s_objectname_s_p_add_ts(ctx),
);

// deno-lint-ignore camelcase
import { fn as fnapi_s_private_s_g_protected_url_ts } from "./pagesCtrl/api/private/g_protected_url.ts";
privateRoutes.get(
  "/api/private/protected_url",
  async (ctx: Context) => await fnapi_s_private_s_g_protected_url_ts(ctx),
);

//don't touch this line it will be used by the system generating file

export { privateRoutes };
