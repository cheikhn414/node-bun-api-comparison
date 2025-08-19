# 🚀 Performance Comparison: Bun vs Node.js

This project compares performance between **Bun** and **Node.js** with two identical REST APIs.

[![Bun](https://img.shields.io/badge/Built%20with-Bun-black?logo=bun)](https://bun.sh)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📁 Project Structure

```
node-bun-api-comparison/
├── bun-api/           # API built with Bun
│   ├── package.json
│   └── index.ts
├── node-api/          # API built with Node.js + Express  
│   ├── package.json
│   └── index.js
├── benchmark.js       # Performance benchmark script
├── test-apis.sh       # API testing script
├── start-benchmark.sh # Automated benchmark runner
├── README.md          # English documentation
├── README_fr.md       # French documentation
└── LICENSE           # MIT License
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
# Manual benchmark
node benchmark.js

# Automated benchmark (starts both servers and runs benchmark)
bash start-benchmark.sh

# Test API endpoints
bash test-apis.sh
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

- **Bun**: Modern JavaScript runtime with built-in HTTP server
- **Node.js**: Traditional JavaScript runtime  
- **Express**: Web framework for Node.js
- **Native HTTP**: For performance testing
- **TypeScript**: For Bun API implementation

## 📊 Requirements

- **Bun** >= 1.0.0 (for bun-api)
- **Node.js** >= 16.0.0 (for node-api)
- **npm** (for Node.js dependencies)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add performance improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 🐛 Issues & Support

If you encounter any bugs or have suggestions for additional benchmarks, please [open an issue](../../issues) on GitHub.

## 🔗 Related Resources

- [Bun Documentation](https://bun.sh/docs)
- [Node.js Performance Guide](https://nodejs.org/en/docs/guides/simple-profiling)
- [Express.js Documentation](https://expressjs.com)