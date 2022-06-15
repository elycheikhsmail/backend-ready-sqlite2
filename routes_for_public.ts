import { Context, Router } from "oak";
const publicRoutes = new Router();

// deno-lint-ignore camelcase
import { fn as fng_demo_ts } from "./pagesCtrl/g_demo.ts";
publicRoutes.get(
  "/demo",
  async (ctx: Context) => await fng_demo_ts(ctx),
);

// deno-lint-ignore camelcase

import { fn as fnapi_s_users_s_p_register_ts } from "./pagesCtrl/api/users/p_register.ts";

publicRoutes.post(
  "/api/users/register",
  async (ctx: Context) => await fnapi_s_users_s_p_register_ts(ctx),
);

// deno-lint-ignore camelcase

import { fn as fnapi_s_users_s_p_login_ts } from "./pagesCtrl/api/users/p_login.ts";

publicRoutes.post(
  "/api/users/login",
  async (ctx: Context) => await fnapi_s_users_s_p_login_ts(ctx),
);

//don't touch this line it will be used by the system generating file

export { publicRoutes };
