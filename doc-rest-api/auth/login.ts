let todoUrl = "http://localhost:8080";
if (Deno) {
  const u = Deno.env.get("OAK_SQLITE_BASE_URL");
  if (u) todoUrl = u;
}

export async function login(username: string, password: string) {
  const response = await fetch(todoUrl + "/auth/login", {
    method: "POST",
    body: JSON.stringify(
      {
        username,
        password,
      },
    ),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }); 
  const jsonData = await response.json(); 
  return { response, jsonData };
}

const { response, jsonData } = await login("sidi", "1234"); //as todoInDb[]
 
// deno run --allow-net --allow-env login.ts
