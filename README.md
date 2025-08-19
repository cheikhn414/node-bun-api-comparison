# 🚀 Performance Comparison: Bun vs Node.js

This project compares performance between **Bun** and **Node.js** with two identical REST APIs.

## 📁 Project Structure

```
api-comparison/
├── bun-api/           # API with Bun
│   ├── package.json
│   └── index.ts
├── node-api/          # API with Node.js + Express  
│   ├── package.json
│   └── index.js
├── benchmark.js       # Benchmark script
└── README.md
```

## 🛠️ Installation and Setup

### 1. Bun API (Port 3000)
```bash
cd bun-api
bun install
bun run start
```

### 2. Node.js API (Port 3001)  
```bash
cd node-api
npm install
npm start
```

### 3. Run Benchmark
```bash
# In api-comparison folder
node benchmark.js
```

## 🔌 Available Endpoints

All APIs expose the same endpoints:

- `GET /health` - Health check
- `GET /users` - List all users
- `GET /users/:id` - Get a user
- `POST /users` - Create a user
- `PUT /users/:id` - Update a user  
- `DELETE /users/:id` - Delete a user

### Usage examples:

```bash
# Health test
curl http://localhost:3000/health
curl http://localhost:3001/health

# Get all users
curl http://localhost:3000/users
curl http://localhost:3001/users

# Create a user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"David","email":"david@example.com","age":28}'
```

## 📊 Benchmark

The `benchmark.js` script tests performance with:
- 1000 concurrent requests per endpoint
- Response time measurement
- Requests per second calculation
- Direct performance comparison

### Expected Results

Generally, Bun shows superior performance thanks to:
- ✅ Faster JavaScript runtime
- ✅ Optimized HTTP server  
- ✅ Less overhead than Express
- ✅ Better memory management

## 🚦 Quick Usage

```bash
# Terminal 1: Start Bun
cd bun-api && bun run start

# Terminal 2: Start Node.js  
cd node-api && npm install && npm start

# Terminal 3: Run benchmark
node benchmark.js
```

## 🔧 Technologies Used

- **Bun**: Modern JavaScript runtime
- **Node.js**: Traditional JavaScript runtime
- **Express**: Web framework for Node.js
- **Native HTTP**: For performance testing