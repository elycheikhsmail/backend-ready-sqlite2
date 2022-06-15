// user try to access protected ressource with random token 
// uuid valid, 1234, empty string


import { assertEquals } from "https://deno.land/std@0.142.0/testing/asserts.ts";
 Deno.test(
  "authentificate user try access protected ressource",
  async () => {
      let token = "1234"
      const response = await fetch("/api/private/protected_url", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "authorization": `bearer ${token}`,
        },
      });
 
      const jsonData = await response.text(); 
      assertEquals(response.status, 401); 
    }
    
 
);
