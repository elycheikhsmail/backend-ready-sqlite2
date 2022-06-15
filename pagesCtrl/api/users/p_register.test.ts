// deno test --allow-net --location http://localhost:3000  pagesCtrl/api/users/p_register.test.ts

import { assertEquals } from "https://deno.land/std@0.142.0/testing/asserts.ts";
Deno.test(
  "register",
  async () => {
    const response = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify(
        {
          username: "sidi",
          password: "1234",
        },
      ),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    //console.log(response)
    const jsonData = await response.json();
    assertEquals(response.status, 201);
    assertEquals(jsonData.username, "sidi");
  },
);
