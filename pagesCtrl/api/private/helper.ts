import { v4 } from "https://deno.land/std@0.140.0/uuid/mod.ts";
import { DB } from "https://deno.land/x/sqlite@v3.4.0/mod.ts";
export enum validationAuthstate {
  token_empty,
  token_invalid,
  token_not_in_db,
  //token_expire,
  token_valide,
}

interface IUserAuth {
  id: number;
  username: string;
  user_validation: number;
}
const default_user: IUserAuth = {
  id: -1,
  username: "",
  user_validation: -1,
};
export function getTokenState(token: string): IUserAuth {
  let validationState = -1;
 
  if (!token) { 
    validationState = validationAuthstate.token_invalid;
  }
  if (token) { 
    const is_uuid_valid = v4.validate(token); 
    if (!is_uuid_valid) {
      validationState = validationAuthstate.token_invalid;
    }
    // is token in request db for given token
    if (is_uuid_valid) {
      try {
        const db = new DB("mydb.db", { mode: "read" });

        const countQuery = db.prepareQuery<
          [number, string, string, number, number, string, string]
        >(
          `
        SELECT *
        FROM users
        INNER JOIN tokens ON users.id = tokens.user_id
        WHERE tokens.is_active = 1 
        AND tokens.hashed_token = :hashed_token
        `,
        );

        const results = countQuery.all({
          hashed_token: token,
        }); 
        if (results.length > 0) {
          const [
            id,
            username,
            password,
            id_tokens,
            user_id,
            hashed_token,
            date_exp,
          ] = results[0];
 
          default_user.id = id;
          default_user.username = username;
          // 
          validationState = validationAuthstate.token_valide;
          countQuery.finalize();
          db.close();
        }
      } catch (error) {
        console.log(error);
        validationState = validationAuthstate.token_not_in_db;
      }
    }
  }
  //validationState;
  default_user.user_validation = validationState; 
  return default_user;
}
