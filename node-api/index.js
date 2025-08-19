// API REST avec Node.js et Express
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Base de données en mémoire
let users = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 35 }
];

let nextId = 4;

// GET /users - Récupérer tous les utilisateurs
app.get('/users', (req, res) => {
  res.json(users);
});

// GET /users/:id - Récupérer un utilisateur par ID
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }
  
  res.json(user);
});

// POST /users - Créer un nouvel utilisateur
app.post('/users', (req, res) => {
  const { name, email, age } = req.body;
  
  if (!name || !email || !age) {
    return res.status(400).json({ error: "Champs requis: name, email, age" });
  }

  const newUser = {
    id: nextId++,
    name,
    email,
    age,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id - Mettre à jour un utilisateur
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }

  const { name, email, age } = req.body;
  
  users[userIndex] = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    email: email || users[userIndex].email,
    age: age || users[userIndex].age,
  };
  
  res.json(users[userIndex]);
});

// DELETE /users/:id - Supprimer un utilisateur
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  res.json(deletedUser);
});

// GET /health - Point de contrôle de santé
app.get('/health', (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erreur serveur interne" });
});

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

app.listen(PORT, () => {
  console.log(`🚀 API Node.js démarrée sur http://localhost:${PORT}`);
  console.log("Endpoints disponibles:");
  console.log("- GET /users - Récupérer tous les utilisateurs");
  console.log("- GET /users/:id - Récupérer un utilisateur");
  console.log("- POST /users - Créer un utilisateur");
  console.log("- PUT /users/:id - Mettre à jour un utilisateur");
  console.log("- DELETE /users/:id - Supprimer un utilisateur");
  console.log("- GET /health - Vérifier l'état du serveur");
});