export class UserValidation {
  is_user_name_in_db: boolean;
  is_password_valid: boolean;

  constructor() {
    this.is_user_name_in_db = false;
    this.is_password_valid = false;
  }
  set_is_user_name_in_db(state: boolean) {
    this.is_user_name_in_db = state;
  }
  set_is_password_valid(state: boolean) {
    this.is_password_valid = state;
  }
  setDefaultState() {
    this.set_is_password_valid(false);
    this.set_is_password_valid(false);
  }
  isValid() {
    const errors_array: string[] = [];
    if (!this.is_user_name_in_db) {
      errors_array.push("invalid user name");
    }

    if (!this.is_password_valid) {
      errors_array.push("invalid password");
    }
    if (errors_array.length > 0) {
      console.log(errors_array);
      return false;
    } else {
      return true;
    }
  }
}
