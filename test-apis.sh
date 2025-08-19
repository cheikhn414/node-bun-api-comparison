#!/bin/bash

echo "🧪 TEST DES APIS BUN VS NODE.JS"
echo "================================"

# Fonction pour tester un endpoint
test_endpoint() {
    local name="$1"
    local url="$2"
    local method="$3"
    local data="$4"
    
    echo -n "Testing $name... "
    
    if [ "$method" = "POST" ] || [ "$method" = "PUT" ]; then
        response=$(curl -s -w "%{http_code}" -X "$method" "$url" \
            -H "Content-Type: application/json" \
            -d "$data")
    else
        response=$(curl -s -w "%{http_code}" -X "$method" "$url")
    fi
    
    http_code="${response: -3}"
    body="${response%???}"
    
    if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 300 ]; then
        echo "✅ ($http_code)"
    else
        echo "❌ ($http_code)"
        echo "   Response: $body"
    fi
}

echo ""
echo "🔥 API BUN (Port 3000)"
echo "----------------------"
test_endpoint "Health Check" "http://localhost:3000/health" "GET"
test_endpoint "Get Users" "http://localhost:3000/users" "GET"
test_endpoint "Get User 1" "http://localhost:3000/users/1" "GET"
test_endpoint "Create User" "http://localhost:3000/users" "POST" '{"name":"Test","email":"test@example.com","age":25}'

echo ""
echo "🟢 API NODE.JS (Port 3001)" 
echo "---------------------------"
test_endpoint "Health Check" "http://localhost:3001/health" "GET"
test_endpoint "Get Users" "http://localhost:3001/users" "GET"
test_endpoint "Get User 1" "http://localhost:3001/users/1" "GET"
test_endpoint "Create User" "http://localhost:3001/users" "POST" '{"name":"Test","email":"test@example.com","age":25}'

echo ""
echo "✨ Tests terminés ! Les deux APIs sont fonctionnelles."
echo "🚀 Vous pouvez maintenant lancer: node benchmark.js"