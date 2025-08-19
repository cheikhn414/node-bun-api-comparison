// Script de benchmark pour comparer Bun et Node.js
const http = require('http');

async function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (data) {
      const postData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          data: responseData,
          headers: res.headers
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function runBenchmark(url, testName, numRequests = 1000) {
  console.log(`\n🧪 Test: ${testName}`);
  console.log(`🎯 URL: ${url}`);
  console.log(`📊 Nombre de requêtes: ${numRequests}`);
  
  const startTime = Date.now();
  const promises = [];
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < numRequests; i++) {
    promises.push(
      makeRequest(url)
        .then(() => successCount++)
        .catch(() => errorCount++)
    );
  }

  await Promise.all(promises);
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  const requestsPerSecond = (numRequests / duration) * 1000;

  console.log(`⏱️  Durée: ${duration}ms`);
  console.log(`✅ Succès: ${successCount}`);
  console.log(`❌ Erreurs: ${errorCount}`);
  console.log(`🚀 Requêtes/seconde: ${requestsPerSecond.toFixed(2)}`);
  
  return {
    duration,
    successCount,
    errorCount,
    requestsPerSecond
  };
}

async function runFullBenchmark() {
  console.log('🔥 BENCHMARK COMPLET - BUN VS NODE.JS\n');
  console.log('=' .repeat(50));

  const numRequests = 1000;
  
  // Test GET simple
  console.log('\n📈 TEST 1: GET /health');
  const bunHealthResults = await runBenchmark('http://localhost:3000/health', 'Bun - Health Check', numRequests);
  const nodeHealthResults = await runBenchmark('http://localhost:3001/health', 'Node.js - Health Check', numRequests);

  // Test GET avec données
  console.log('\n📈 TEST 2: GET /users');
  const bunUsersResults = await runBenchmark('http://localhost:3000/users', 'Bun - Get Users', numRequests);
  const nodeUsersResults = await runBenchmark('http://localhost:3001/users', 'Node.js - Get Users', numRequests);

  // Résumé comparatif
  console.log('\n' + '=' .repeat(50));
  console.log('📊 RÉSUMÉ COMPARATIF');
  console.log('=' .repeat(50));

  console.log('\n🏥 Health Check:');
  console.log(`Bun:     ${bunHealthResults.requestsPerSecond.toFixed(2)} req/s (${bunHealthResults.duration}ms)`);
  console.log(`Node.js: ${nodeHealthResults.requestsPerSecond.toFixed(2)} req/s (${nodeHealthResults.duration}ms)`);
  const healthImprovement = ((bunHealthResults.requestsPerSecond - nodeHealthResults.requestsPerSecond) / nodeHealthResults.requestsPerSecond * 100);
  console.log(`📈 Amélioration Bun: ${healthImprovement > 0 ? '+' : ''}${healthImprovement.toFixed(1)}%`);

  console.log('\n👥 Get Users:');
  console.log(`Bun:     ${bunUsersResults.requestsPerSecond.toFixed(2)} req/s (${bunUsersResults.duration}ms)`);
  console.log(`Node.js: ${nodeUsersResults.requestsPerSecond.toFixed(2)} req/s (${nodeUsersResults.duration}ms)`);
  const usersImprovement = ((bunUsersResults.requestsPerSecond - nodeUsersResults.requestsPerSecond) / nodeUsersResults.requestsPerSecond * 100);
  console.log(`📈 Amélioration Bun: ${usersImprovement > 0 ? '+' : ''}${usersImprovement.toFixed(1)}%`);

  console.log('\n🏆 GAGNANT GLOBAL:');
  const avgBunPerf = (bunHealthResults.requestsPerSecond + bunUsersResults.requestsPerSecond) / 2;
  const avgNodePerf = (nodeHealthResults.requestsPerSecond + nodeUsersResults.requestsPerSecond) / 2;
  const overallImprovement = ((avgBunPerf - avgNodePerf) / avgNodePerf * 100);
  
  if (overallImprovement > 0) {
    console.log(`🥇 Bun est ${overallImprovement.toFixed(1)}% plus rapide en moyenne !`);
  } else {
    console.log(`🥇 Node.js est ${Math.abs(overallImprovement).toFixed(1)}% plus rapide en moyenne !`);
  }
  
  console.log('\n' + '=' .repeat(50));
}

// Fonction pour tester si les serveurs sont démarrés
async function checkServers() {
  try {
    await makeRequest('http://localhost:3000/health');
    console.log('✅ Serveur Bun (port 3000) est accessible');
  } catch (err) {
    console.log('❌ Serveur Bun (port 3000) n\'est pas accessible');
    console.log('   Démarrez-le avec: cd bun-api && bun run index.ts');
    return false;
  }

  try {
    await makeRequest('http://localhost:3001/health');
    console.log('✅ Serveur Node.js (port 3001) est accessible');
  } catch (err) {
    console.log('❌ Serveur Node.js (port 3001) n\'est pas accessible');
    console.log('   Démarrez-le avec: cd node-api && npm install && npm start');
    return false;
  }

  return true;
}

async function main() {
  console.log('🔍 Vérification des serveurs...');
  
  const serversReady = await checkServers();
  if (!serversReady) {
    console.log('\n⚠️  Veuillez démarrer les deux serveurs avant de lancer le benchmark.');
    return;
  }

  console.log('\n⏳ Attente de 2 secondes pour que les serveurs se stabilisent...');
  await new Promise(resolve => setTimeout(resolve, 2000));

  await runFullBenchmark();
}

if (require.main === module) {
  main().catch(console.error);
}