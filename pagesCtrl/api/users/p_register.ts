import { Context, Status } from "oak";
import { DB } from "https://deno.land/x/sqlite@v3.4.0/mod.ts";

// deno-lint-ignore require-await
export async function fn(ctx: Context) {
  const bodyDataPromise = ctx.request.body({ type: "json" });
  await bodyDataPromise.value.then(
    (data) => {
      try { 
        const db = new DB("mydb.db");
        db.query(
          "INSERT INTO users (username, password) VALUES (?,?)",
          [data.username, data.password],
        );

        db.close();
        ctx.response.status = Status.Created;
        ctx.response.body = {
          id: 1,
          username: data.username,
        };
      } catch (error) {
        ctx.response.status = Status.ServiceUnavailable;
        ctx.response.body = {
          message: "failed to connect to db",
        };
      }
    },
  ).catch(
    () => {
      ctx.response.status = Status.BadRequest;
      ctx.response.body = {
        message: "invalid json",
      };
    },
  );
}
