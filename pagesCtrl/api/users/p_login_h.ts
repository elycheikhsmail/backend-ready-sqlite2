export enum validationState {
  all_is_ok = "all is ok",
  invalid_password = "invalid password",
  invalid_username = "invalid username",
  currently_login = "user is currently login", // in cookies mode
}

interface IUserAuth {
  id: number;
  username: string;
  user_validation: string;
}
const default_user: IUserAuth = {
  id: -1,
  username: "",
  user_validation: "",
};
export function get_state_from_result(
  password: string,
  results: [number, string, string][],
) {
  let error_msg = "";
  if (results.length > 0) {
    const password_in_db = results[0][1]; 
    if (password == password_in_db) {
      error_msg = validationState.all_is_ok;
      default_user.id = results[0][0];
      default_user.username = results[0][2];
      //"all is ok";
    } else {
      error_msg = validationState.invalid_password;
      //"invalid password";
    }
  } else {
    error_msg = validationState.invalid_username;
    //"invalid username";
  }
  default_user.user_validation = error_msg; 
  return default_user;
  //error_msg;
}

export function get_token_row(
  user_id: number,
): [number, string, string, number] {
  const hashed_token = crypto.randomUUID();
  const date_exp = "12";
  const is_active = 1;
  return [user_id, hashed_token, date_exp, is_active];
}
