require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Récupération du token dans les en-têtes de la requête
    const token = req.headers.authorization.split(" ")[1];

    // Vérification de la validité du token
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET, { algorithms: ['HS256'] });

    // Vérification du temps de vie du token
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.iat > currentTime) {
      throw new Error("Token expiré");
    }

    // Récupération de l'identifiant de l'utilisateur
    const userId = decodedToken.userId;

    // Ajout de l'identifiant de l'utilisateur à l'objet req pour pouvoir être utilisé dans les contrôleurs
    req.auth = {
      userId: userId,
    };

    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};

// Ce code est le fichier un middleware d'authentification auth.js qui utilise JSON Web Tokens (JWT). 
// Il est implémenté en utilisant le module "jsonwebtoken".

// La fonction exportée de ce middleware vérifie si le client a envoyé un jeton d'authentification valide 
// dans les en-têtes de sa requête HTTP. Pour ce faire, elle extrait le jeton de l'en-tête "Authorization", 
// puis le vérifie en utilisant la méthode "verify" de "jsonwebtoken". Si le jeton est valide, la fonction 
// extrait l'identifiant de l'utilisateur du jeton décodé et l'ajoute à l'objet de requête sous la clé "auth".

// Si le jeton est invalide, le middleware envoie une réponse HTTP 401 avec un corps JSON contenant l'erreur levée.
// Cela signifie que l'utilisateur n'est pas autorisé à accéder à la ressource protégée par ce middleware.

// Notez que ce code utilise une clé secrète pour crypter et décrypter les jetons JWT. Cette clé est définie 
// dans le fichier ".env" est accessible via "process.env.JWT_TOKEN_SECRET". Cela permet de changer facilement 
// la clé secrète sans avoir à recompiler le code, ce qui est important pour la sécurité.
