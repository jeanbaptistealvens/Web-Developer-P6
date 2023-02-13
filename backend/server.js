require("dotenv").config();
const fs = require('fs');
const http = require('http');
const express = require('./app');
const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0 && port <= 65535) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.SERVER_PORT);
if (!port) {
  console.error(`Numéro de port invalide : ${process.env.SERVER_PORT}`);
  process.exit(1);
}
express.set('port', port);
const options = {
  key: fs.readFileSync(process.env.SERVER_KEY),
  cert: fs.readFileSync(process.env.SERVER_CERT),
};
const server = https.createServer(options, express);
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' nécessite des privilèges élevés.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' déja en cours d\'utilisation.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Écoute sur ' + bind);
});
process.on('uncaughtException', (error) => {
  console.error('Exception non interceptée:', error);
  process.exit(1);
});
process.on('unhandledRejection', (error) => {
  console.error('Rejet non géré :', error);
  process.exit(1);
});
server.listen(port);


// Ce code est le script Node.js qui démarre un serveur web en utilisant le module http de Node.js. 
// Il utilise également le module express pour définir les routes et les middlewares de l'application.

// Voici les étapes détaillées :

    // 1. Importation des modules nécessaires : le script importe les modules dotenv, fs, http et app grâce 
    // à la fonction require().

    // 2. Normalisation du numéro de port : la fonction normalizePort prend un argument val qui est censé 
    // être le numéro de port. Elle vérifie que ce nombre est valide et dans un intervalle valide 
    // (0-65535), puis le retourne si c'est le cas.

    // 3. Récupération et validation du numéro de port : le numéro de port est récupéré à partir de 
    // l'environnement avec la valeur process.env.SERVER_PORT. La fonction normalizePort est appelée 
    // pour valider ce numéro de port. Si le numéro de port n'est pas valide, une erreur est affichée 
    // et le processus est terminé.

    // 4. Configuration du serveur : le serveur est créé en appelant la fonction http.createServer et en 
    // passant app (qui est l'application Express) en tant qu'argument.

    // 5. Gestion des erreurs de serveur : la fonction errorHandler est appelée en cas d'erreur pour gérer 
    // les erreurs qui peuvent survenir lors de l'écoute des requêtes.

    // 6. Écoute du serveur : le serveur écoute les requêtes sur le port spécifié avec la méthode server.listen.

    // 7. Traitement des erreurs non interceptées et des rejets non gérés : les erreurs non interceptées 
    // et les rejets non gérés sont capturés avec les événements uncaughtException et unhandledRejection, 
    // respectivement. Les erreurs sont affichées et le processus est terminé.

// En gros, ce script configure et démarre un serveur web en utilisant le module express, gère les erreurs 
// potentielles et capture les erreurs non interceptées pour assurer une meilleure stabilité de l'application.