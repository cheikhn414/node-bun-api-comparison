// API REST avec Bun
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Base de données en mémoire
let users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 35 }
];

let nextId = 4;

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;

    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // GET /users - Récupérer tous les utilisateurs
      if (path === "/users" && method === "GET") {
        return new Response(JSON.stringify(users), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // GET /users/:id - Récupérer un utilisateur par ID
      if (path.match(/^\/users\/\d+$/) && method === "GET") {
        const id = parseInt(path.split("/")[2]);
        const user = users.find(u => u.id === id);
        
        if (!user) {
          return new Response(JSON.stringify({ error: "Utilisateur non trouvé" }), {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        
        return new Response(JSON.stringify(user), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // POST /users - Créer un nouvel utilisateur
      if (path === "/users" && method === "POST") {
        const body = await req.json();
        
        if (!body.name || !body.email || !body.age) {
          return new Response(JSON.stringify({ error: "Champs requis: name, email, age" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const newUser: User = {
          id: nextId++,
          name: body.name,
          email: body.email,
          age: body.age,
        };

        users.push(newUser);
        
        return new Response(JSON.stringify(newUser), {
          status: 201,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // PUT /users/:id - Mettre à jour un utilisateur
      if (path.match(/^\/users\/\d+$/) && method === "PUT") {
        const id = parseInt(path.split("/")[2]);
        const userIndex = users.findIndex(u => u.id === id);
        
        if (userIndex === -1) {
          return new Response(JSON.stringify({ error: "Utilisateur non trouvé" }), {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const body = await req.json();
        
        users[userIndex] = {
          ...users[userIndex],
          name: body.name || users[userIndex].name,
          email: body.email || users[userIndex].email,
          age: body.age || users[userIndex].age,
        };
        
        return new Response(JSON.stringify(users[userIndex]), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // DELETE /users/:id - Supprimer un utilisateur
      if (path.match(/^\/users\/\d+$/) && method === "DELETE") {
        const id = parseInt(path.split("/")[2]);
        const userIndex = users.findIndex(u => u.id === id);
        
        if (userIndex === -1) {
          return new Response(JSON.stringify({ error: "Utilisateur non trouvé" }), {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const deletedUser = users.splice(userIndex, 1)[0];
        
        return new Response(JSON.stringify(deletedUser), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // GET /health - Point de contrôle de santé
      if (path === "/health" && method === "GET") {
        return new Response(JSON.stringify({ status: "OK", timestamp: new Date().toISOString() }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Route non trouvée
      return new Response(JSON.stringify({ error: "Route non trouvée" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: "Erreur serveur interne" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
});

console.log(`🚀 API Bun démarrée sur http://localhost:${server.port}`);
console.log("Endpoints disponibles:");
console.log("- GET /users - Récupérer tous les utilisateurs");
console.log("- GET /users/:id - Récupérer un utilisateur");
console.log("- POST /users - Créer un utilisateur");
console.log("- PUT /users/:id - Mettre à jour un utilisateur");
console.log("- DELETE /users/:id - Supprimer un utilisateur");
console.log("- GET /health - Vérifier l'état du serveur");