// deno run --allow-read --allow-write cli.ts
import {
  createTables,
  join_users_tokens,
  login,
  select_token,
  storeTokenTest,
} from "./cli/initDb.ts";

// deno run --allow-read --allow-write cli.ts
let all_is_tested = false;
if (Deno.args.length == 0) {
  createTables();
  all_is_tested = true;
}

// deno run --allow-read --allow-write cli.ts storetoken
if (Deno.args.length == 1 && Deno.args[0] == "storetoken") {
  storeTokenTest();
  all_is_tested = true;
}

// deno run --allow-read --allow-write cli.ts login
if (Deno.args.length == 1 && Deno.args[0] == "login") {
  login("sidi");
  all_is_tested = true;
}

// deno run --allow-read --allow-write cli.ts join
if (Deno.args.length == 1 && Deno.args[0] == "join") {
  join_users_tokens();
  all_is_tested = true;
}

// deno run --allow-read --allow-write cli.ts token
if (Deno.args.length == 1 && Deno.args[0] == "token") {
  select_token();
  all_is_tested = true;
}

if (!all_is_tested) {
  console.log(Deno.args);
}
