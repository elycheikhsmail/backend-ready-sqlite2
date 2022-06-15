import { Context, Status } from "oak";
import { DB } from "https://deno.land/x/sqlite@v3.4.0/mod.ts";
import {
  get_state_from_result,
  get_token_row,
  validationState,
} from "./p_login_h.ts";
import {
  count_query_text,
  insertQuery_text,
  selectQuery_text,
} from "./p_login_constate.ts";
//

// deno-lint-ignore require-await
export async function fn(ctx: Context) {
  // extract data from request
  let did_we_recive_data = false;
  let username = "";
  let password = "";
  let error_msg = "";
  let user_id = -1;
  const bodyDataPromise = ctx.request.body({ type: "json" });
  await bodyDataPromise.value.then(
    async (data) => {
      username = data.username;
      password = data.password;
      did_we_recive_data = true;
    },
  ).catch(
    () => {
      ctx.response.status = Status.BadRequest;
      ctx.response.body = {
        message: "invalid json",
      };
    },
  );
  // work with incoming data
  if (did_we_recive_data) {
  }
  try {
    const db = new DB("mydb.db", { mode: "read" });
    const countQuery = db.prepareQuery<[number]>(count_query_text);
    const [count] = countQuery.one({
      usernameInput: username,
    });
    countQuery.finalize(); 
    if (count == 0) {
      const selectQuery = db.prepareQuery<[number, string, string]>(
        selectQuery_text,
      );
      const results = selectQuery.all({ usernameInput: username });
      if (results.length > 0) {
        user_id = results[0][0];
      }
      //
      error_msg = get_state_from_result(
        password,
        results,
      ).user_validation; 
      selectQuery.finalize();
    } else {
      error_msg = validationState.currently_login
      //validationState.currently_login;
      //"user is currenlty login";
    }
    db.close();
  } catch (error) {
    console.log(error);
    ctx.response.status = Status.ServiceUnavailable;
    ctx.response.body = {
      message: "failed to connect to db",
    };
  }
  // treate each case
  switch (error_msg) {
    case validationState.all_is_ok:
      const token_row = get_token_row(user_id);
      try {
        const db = new DB("mydb.db");
        db.query(
          insertQuery_text,
          token_row,
        );
        db.close();
        ctx.response.status = Status.OK;
        ctx.response.body = {
          token: token_row[1],
        };
      } catch (error) {
        console.log(error); 
        ctx.response.status = Status.Unauthorized;
        ctx.response.body = {
          message: "invalid password",
        };
      }

      break;
    case validationState.invalid_password: 
      ctx.response.status = Status.Unauthorized;
      ctx.response.body = {
        message: "invalid password",
      };
      break;

    case validationState.invalid_username: 
      ctx.response.status = Status.Unauthorized;
      ctx.response.body = {
        message: "invalid invalid username",
      };
      break;

    case validationState.currently_login: 
      ctx.response.status = Status.Unauthorized;
      //ctx.response.status = Status.Unauthorized;
      ctx.response.body = {
        message: "currently login",
      };
      break;

    default:
      break;
  }
}
