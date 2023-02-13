const app = require('../app');
const router = app.Router();
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const expressValidator = require('express-validator');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceController = require('../controllers/sauce');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

router.use(cors());
router.use(helmet());
router.use(expressValidator());

router.get('/sauces', auth, sauceController.readAllSauces);
router.get('/sauces/:id', auth, sauceController.readOneSauce);
router.post('/sauces', auth, multer, sauceController.createSauce);
router.post('/sauces/:id/like', auth, sauceController.likeSauce);
router.put('/sauces/:id', auth, multer, sauceController.updateSauce);
router.delete('/sauces/:id', auth, sauceController.deleteSauce);

module.exports = router;


// Ce code est le fichier router sauce.js et montre comment utiliser l'instance 
// d'application express qui a été exportée dans le fichier app.js dans le fichier 
// sauce.js. 

// Au lieu de faire un require de la bibliothèque express, je fais un require 
// du fichier app.js qui contient l'instance d'application express. Cela signifie 
// que je peux utiliser les mêmes instances et configurations définies dans
// app.js dans le fichier sauce.js.  Cela simplifie le code et permet de ne pas avoir 
// à importer les bibliothèques inutiles.

// Ensuite, j'utlise la méthode Router() de l'instance d'application express 
// pour créer le routeur qui sera utilisé pour gérer les routes pour les sauces. 
// Je peux alors ajouter des middlewares et des contrôleurs de route de la même 
// manière que je ferais avec une instance d'application express standard. 

// En utilisant cette approche, je peux maintenir une seule instance d'application 
// express pour tout le projet, ce qui peut faciliter la maintenance et améliorer 
// la lisibilité du code. 

// Voici les étapes détaillées :

    // Ajout de la bibliothèque 'cors': Cette bibliothèque permet de gérer les 
    // politiques de cross-origin resource sharing (CORS), qui définissent comment 
    // les ressources peuvent être partagées entre différents domaines.

    // Ajout de la bibliothèque 'express-rate-limit': Cette bibliothèque permet de 
    // limiter le nombre de requêtes qui peuvent être envoyées à l'application dans 
    // un certain délai. Cela aide à protéger le serveur contre les attaques de déni 
    // de service distribué (DDoS).

    // Ajout de la bibliothèque 'helmet': Cette bibliothèque ajoute des en-têtes HTTP 
    // sécurisés aux réponses pour renforcer la sécurité.

    // Ajout de la bibliothèque 'express-validator': Cette bibliothèque permet de 
    // valider les entrées utilisateur afin d'éviter les attaques par injection SQL ou 
    // les attaques par script.

    // Utilisation de 'cors' dans le routeur: Cela permet d'appliquer les politiques CORS 
    // à l'ensemble des routes définies dans ce fichier.

    // Utilisation de 'helmet' dans le routeur: Cela permet d'ajouter les en-têtes HTTP 
    // sécurisés à l'ensemble des réponses renvoyées pour ces routes.

    // Utilisation de 'express-validator' dans le routeur: Cela permet de valider les entrées 
    // utilisateur pour l'ensemble des routes définies dans ce fichier.

    // Utilisation de 'rate-limit' pour limiter les requêtes à la route '/sauces': Cela permet 
    // de limiter le nombre de requêtes qui peuvent être envoyées à cette route dans un délai de 
    // 15 minutes.

    // En gros, cela permet simplement d'optimiser la gestion des fichiers et de la structure de l'application, 
    // ce qui peut améliorer les performances et la maintenabilité du code. En utilisant une instance 
    // d'application partagée, je peux centraliser la configuration et les middlewares, ce qui peut 
   //  simplifier le code et éviter la duplication de code inutile.    