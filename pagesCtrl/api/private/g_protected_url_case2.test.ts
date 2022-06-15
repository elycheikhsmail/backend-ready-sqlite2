// when authentificate user
// respose status must be ok 200
// constent must be json {username:"sidi"}


import { assertEquals } from "https://deno.land/std@0.142.0/testing/asserts.ts";
import { DB } from "https://deno.land/x/sqlite@v3.4.0/mod.ts";

const selectQuery_text = `SELECT id,token 
  FROM tokens 
  LIMIT 1 `;

Deno.test(
  "authentificate user try access protected ressource",
  async () => {
    const db = new DB("myborowserdb.db" , { mode: "read" });
    const selectQuery = db.prepareQuery<[number, string]>(selectQuery_text);
    const results = selectQuery.all();
    selectQuery.finalize()
    db.close()
    if (results.length > 0) {
      const token = results[0][1]; 
      const response = await fetch("/api/private/protected_url", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "authorization": `bearer ${token}`,
        },
      });
 
      const jsonData = await response.json(); 
      assertEquals(response.status, 200);
      assertEquals(jsonData.username,"sidi")
    } else {
      assertEquals(1, 2);
    }
  },
);
