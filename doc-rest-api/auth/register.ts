export async function register(username: string, password: string) {
  const response = await fetch("/auth/register", {
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

// deno run --allow-net --allow-env login.ts

const { response, jsonData } = await register("sidi", "1234"); //as todoInDb[]
 