// when anony user request it will respond with 401 status
// content {}
// deno test --allow-net --location http://localhost:3000  pagesCtrl/api/private/g_protected_url_case1.test.ts

import { assertEquals } from "https://deno.land/std@0.142.0/testing/asserts.ts";

Deno.test(
  "anonymus user try protected resource",
  async () => {
    //  /api/private/protected_url
    const response = await fetch("/api/private/protected_url", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
 
    const jsonData = await response.text(); 
    assertEquals(response.status, 401);
  },
);
