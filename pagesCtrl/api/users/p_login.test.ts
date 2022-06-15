// deno test --allow-net --location http://localhost:3000  pagesCtrl/api/users/p_login.test.ts

import { assertEquals } from "https://deno.land/std@0.142.0/testing/asserts.ts";
import { v4 } from "https://deno.land/std@0.140.0/uuid/mod.ts";

import { DB } from "https://deno.land/x/sqlite@v3.4.0/mod.ts";

Deno.test(
  "login valid user",
  async () => {
    // const token = Deno.env.get("TOKEN_ENV_VAR")||""
    const response = await fetch("/api/users/login", {
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
 
    const jsonData = await response.json();
    assertEquals(response.status, 200);
    const t = jsonData.token; 
    const isValid = v4.validate(t); 
    if (isValid) { 
      try {
        const db = new DB("myborowserdb.db");
        db.query(
          "INSERT INTO tokens (token) VALUES (?)",
          [t],
        );
        db.close()
      } catch (error) {
        console.log(error);
      }
    }
    assertEquals(isValid, true);
  },
);

Deno.test(
  "login invalid username",
  async () => {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify(
        {
          username: "sidi22",
          password: "1234",
        },
      ),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }); 
    const jsonData = await response.text();
    assertEquals(response.status, 401);
  },
);

Deno.test(
  "login invalid password user",
  async () => {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify(
        {
          username: "sidi",
          password: "123456",
        },
      ),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
 
    const jsonData = await response.text();
    assertEquals(response.status, 401);
  },
);
