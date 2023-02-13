const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const path = require('path');
const hateoasLinker = require('express-hateoas-links');

const saucesRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');


mongoose.connect('mongodb+srv://JEAN-BAPTISTE-Alvens:s46frGbw2S9Taa@atlascluster.qg56vpj.mongodb.net/?retryWrites=true&w=majority', 
{ useNewUrlParser: true, 
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(bodyParser.json());
app.use(mongoSanitize());
app.use(hateoasLinker);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 6,
  standardHeaders: true,
  legacyHeaders: false,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 100,
  delayMs: 500,
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', authLimiter, userRoutes);
app.use('/api/sauces', limiter, speedLimiter, saucesRoutes);

module.exports = app;


// Ce code est le fichier app.js qui sert de point d'entrée pour l'application Express. 
// Il définit les configurations et les middlewares pour l'application.

// Voici les étapes détaillées :

    // 1. D'abord, il importe les bibliothèques nécessaires pour l'application, y compris express, 
    // helmet, cors, body-parser, mongoose, mongo-sanitize, rate-limit, slow-down, path et 
    // hateoas-links.

    // 2. Ensuite, il importe les routes de l'application depuis les fichiers saucesRoutes et 
    // userRoutes.

    // 3. Ensuite, il se connecte à la base de données MongoDB en utilisant la bibliothèque mongoose 
    // et configure les paramètres de connexion.

    // 4. Ensuite, il crée une instance d'application Express et configure les middlewares. 
    // Il utilise cors pour gérer les demandes Cross-Origin et helmet pour renforcer 
    // la sécurité HTTP. Il utilise body-parser pour extraire les données JSON des demandes HTTP et 
    // mongo-sanitize pour nettoyer les données sensibles. Il utilise hateoas-links pour ajouter des 
    // liens HATEOAS aux réponses HTTP.

    // 5. Ensuite, il définit deux limiteurs de vitesse pour les demandes HTTP: authLimiter et limiter. 
    // authLimiter est utilisé pour limiter le nombre de demandes de connexion et d'inscription, 
    // tandis que limiter est utilisé pour limiter le nombre de demandes pour les autres itinéraires. 
    // Il utilise également la bibliothèque slow-down pour ralentir les requêtes après un certain nombre 
    // et pour limiter la vitesse des requêtes.

    // 6. Enfin, il définit les itinéraires pour l'application en utilisant les routes importées et 
    // les middlewares définis précédemment. Il utilise /images pour servir les images statiques, 
    // /api/auth pour les demandes de connexion et d'inscription, et /api pour les demandes pour 
    // les sauces.

    // 7. Le code exporte ensuite l'instance d'application express pour être utilisée par d'autres fichiers.