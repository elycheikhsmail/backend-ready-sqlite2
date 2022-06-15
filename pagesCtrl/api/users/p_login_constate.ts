export const count_query_text = `
SELECT COUNT(*) 
FROM users
INNER JOIN tokens ON users.id = tokens.user_id
WHERE tokens.is_active = 1 AND users.username = :usernameInput
`;

export const selectQuery_text =
  "SELECT id,password,username FROM users WHERE username = :usernameInput LIMIT 1 ";
export const insertQuery_text =
  "INSERT INTO tokens (user_id, hashed_token, date_exp,is_active) VALUES (?,?,?,?)";
