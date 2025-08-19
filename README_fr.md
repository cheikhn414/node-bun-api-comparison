# 🚀 Comparaison de Performance: Bun vs Node.js

Ce projet compare les performances entre **Bun** et **Node.js** avec deux APIs REST identiques.

[![Bun](https://img.shields.io/badge/Construit%20avec-Bun-black?logo=bun)](https://bun.sh)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com)
[![Licence MIT](https://img.shields.io/badge/Licence-MIT-green.svg)](LICENSE)

## 📁 Structure du Projet

```
node-bun-api-comparison/
├── bun-api/           # API construite avec Bun
│   ├── package.json
│   └── index.ts
├── node-api/          # API construite avec Node.js + Express  
│   ├── package.json
│   └── index.js
├── benchmark.js       # Script de benchmark de performance
├── test-apis.sh       # Script de test des APIs
├── start-benchmark.sh # Exécuteur de benchmark automatisé
├── README.md          # Documentation en anglais
├── README_fr.md       # Documentation en français
└── LICENSE           # Licence MIT
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
# Benchmark manuel
node benchmark.js

# Benchmark automatisé (démarre les deux serveurs et lance le benchmark)
bash start-benchmark.sh

# Tester les endpoints des APIs
bash test-apis.sh
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

- **Bun**: Runtime JavaScript moderne avec serveur HTTP intégré
- **Node.js**: Runtime JavaScript traditionnel
- **Express**: Framework web pour Node.js
- **HTTP natif**: Pour les tests de performance
- **TypeScript**: Pour l'implémentation de l'API Bun

## 📊 Prérequis

- **Bun** >= 1.0.0 (pour bun-api)
- **Node.js** >= 16.0.0 (pour node-api)
- **npm** (pour les dépendances Node.js)

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez suivre ces étapes :

1. Fork le repository
2. Créez une branche de fonctionnalité (`git checkout -b feature/amelioration`)
3. Commitez vos changements (`git commit -m 'Ajouter amélioration de performance'`)
4. Poussez vers la branche (`git push origin feature/amelioration`)
5. Ouvrez une Pull Request

## 🐛 Issues & Support

Si vous rencontrez des bugs ou avez des suggestions pour des benchmarks supplémentaires, veuillez [ouvrir une issue](../../issues) sur GitHub.

## 🔗 Ressources Connexes

- [Documentation Bun](https://bun.sh/docs)
- [Guide de Performance Node.js](https://nodejs.org/en/docs/guides/simple-profiling)
- [Documentation Express.js](https://expressjs.com)