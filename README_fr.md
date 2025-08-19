# 🚀 Comparaison de Performance: Bun vs Node.js

Ce projet compare les performances entre **Bun** et **Node.js** avec deux APIs REST identiques.

## 📁 Structure du Projet

```
api-comparison/
├── bun-api/           # API avec Bun
│   ├── package.json
│   └── index.ts
├── node-api/          # API avec Node.js + Express  
│   ├── package.json
│   └── index.js
├── benchmark.js       # Script de benchmark
└── README.md
```

## 🛠️ Installation et Démarrage

### 1. API Bun (Port 3000)
```bash
cd bun-api
bun install
bun run start
```

### 2. API Node.js (Port 3001)  
```bash
cd node-api
npm install
npm start
```

### 3. Lancer le Benchmark
```bash
# Dans le dossier api-comparison
node benchmark.js
```

## 🔌 Endpoints Disponibles

Toutes les APIs exposent les mêmes endpoints :

- `GET /health` - Vérification de santé
- `GET /users` - Liste tous les utilisateurs
- `GET /users/:id` - Récupère un utilisateur
- `POST /users` - Crée un utilisateur
- `PUT /users/:id` - Met à jour un utilisateur  
- `DELETE /users/:id` - Supprime un utilisateur

### Exemple d'utilisation :

```bash
# Test santé
curl http://localhost:3000/health
curl http://localhost:3001/health

# Récupérer tous les utilisateurs
curl http://localhost:3000/users
curl http://localhost:3001/users

# Créer un utilisateur
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"David","email":"david@example.com","age":28}'
```

## 📊 Benchmark

Le script `benchmark.js` teste les performances avec :
- 1000 requêtes simultanées par endpoint
- Mesure du temps de réponse
- Calcul des requêtes par seconde
- Comparaison directe des performances

### Résultats Attendus

Généralement, Bun montre des performances supérieures grâce à :
- ✅ Runtime JavaScript plus rapide
- ✅ Serveur HTTP optimisé  
- ✅ Moins d'overhead que Express
- ✅ Meilleure gestion de la mémoire

## 🚦 Usage Rapide

```bash
# Terminal 1: Démarrer Bun
cd bun-api && bun run start

# Terminal 2: Démarrer Node.js  
cd node-api && npm install && npm start

# Terminal 3: Lancer le benchmark
node benchmark.js
```

## 🔧 Technologies Utilisées

- **Bun**: Runtime JavaScript moderne
- **Node.js**: Runtime JavaScript traditionnel
- **Express**: Framework web pour Node.js
- **HTTP natif**: Pour les tests de performance