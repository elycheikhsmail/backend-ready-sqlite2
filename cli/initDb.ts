import { DB } from "https://deno.land/x/sqlite@v3.4.0/mod.ts";

export function createTables() {
  const db = new DB("mydb.db");
  let sql_table_objects = `
        CREATE TABLE IF NOT EXISTS objects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ObjectName TEXT,
            ItemValue  TEXT,
            OwnerId  Int
          ); 
        `;
  let sql_table_users = `
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            password  TEXT
          );
        `;
  let sql_table_tokens = `
        CREATE TABLE IF NOT EXISTS tokens (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id TEXT,
          hashed_token  TEXT,
          date_exp TEXT,
          is_active int
        );
      `;
  db.query(sql_table_objects);
  db.query(sql_table_users);
  db.query(sql_table_tokens);
}

export function createBrowserTables() {
  // une base des donnees imaginaire
  const db = new DB("myborowserdb.db");

  let sql_table_tokens = `
        CREATE TABLE IF NOT EXISTS tokens (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          token  TEXT
        );
      `;
  db.query(sql_table_tokens);
}
export function login(usernameInput: string) {
  const db = new DB("mydb.db");
  const selectQuery = db.prepareQuery<[string, string]>(
    "SELECT username,password FROM users WHERE username = :usernameInput LIMIT 1 ",
  );
  let is_user_in_db = false;
  for (const [username, password] of selectQuery.iter({ usernameInput })) {
    console.log(username, password);
    is_user_in_db = true;
  }
  if (!is_user_in_db) {
    console.log("user is not in db");
  }
}

export function storeTokenTest() {
  const user_id = 1;
  const hashed_token = "hashed token";
  const date_exp = "12";
  const is_active = 1;
  const db = new DB("mydb.db");
  db.query(
    "INSERT INTO tokens (user_id, hashed_token, date_exp,is_active) VALUES (?,?,?,?)",
    [user_id, hashed_token, date_exp, is_active],
  );

  db.close();
}

// sql request join by id users and tokens tabls where name =  name in users
// table
export function join_users_tokens() {
  const db = new DB("mydb.db");
  const countQuery = db.prepareQuery<[number]>(
    `
    SELECT COUNT(*) 
    FROM users
    INNER JOIN tokens ON users.id = tokens.user_id
    WHERE tokens.is_active = 1 AND users.username = :usernameInput
    
    `,
  );

  const [count] = countQuery.one({ usernameInput: "sidii" });
  console.log({ count });
}

export function select_token() {
  const db = new DB("mydb.db");
  const countQuery = db.prepareQuery<[string]>(
    `
    SELECT   hashed_token,user_id
    FROM tokens 
    WHERE user_id = :user_id
    
    `,
  );
  const [token] = countQuery.one({ user_id: 1 });
  console.log({ token });
  db.close();
}
