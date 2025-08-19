#!/bin/bash

echo "🚀 DÉMARRAGE DU BENCHMARK BUN VS NODE.JS"
echo "========================================="

# Fonction pour nettoyer les processus à la sortie
cleanup() {
    echo ""
    echo "🧹 Nettoyage des processus..."
    pkill -f "bun run index.ts"
    pkill -f "node index.js"
    exit
}

# Configurer le nettoyage à la sortie
trap cleanup EXIT INT TERM

# Démarrer l'API Bun en arrière-plan
echo "🔥 Démarrage de l'API Bun (port 3000)..."
cd bun-api
bun run index.ts &
BUN_PID=$!
cd ..

# Démarrer l'API Node.js en arrière-plan
echo "🟢 Démarrage de l'API Node.js (port 3001)..."
cd node-api  
node index.js &
NODE_PID=$!
cd ..

# Attendre que les serveurs se stabilisent
echo "⏳ Attente de 3 secondes pour que les serveurs se stabilisent..."
sleep 3

# Tester les APIs
echo ""
echo "🧪 Test des APIs..."
./test-apis.sh

# Attendre avant le benchmark
echo ""
echo "⏳ Préparation du benchmark (2 secondes)..."
sleep 2

# Lancer le benchmark
echo ""
echo "📊 LANCEMENT DU BENCHMARK..."
echo "============================="
node benchmark.js

echo ""
echo "✅ Benchmark terminé ! Appuyez sur Ctrl+C pour arrêter les serveurs."
wait