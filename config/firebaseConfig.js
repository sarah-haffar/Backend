const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const serviceAccountPath = path.resolve(__dirname, 'firebase-service-account.json');

let serviceAccount;
if (fs.existsSync(serviceAccountPath)) {
  serviceAccount = require(serviceAccountPath);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

} else {
  console.warn('⚠️ firebase-service-account.json not found, Firebase admin not initialized.');
  // Optionnellement, initialiser avec une autre méthode, ou ne rien faire
  // admin.initializeApp(); // si tu veux une initialisation par défaut
}

module.exports = admin;
