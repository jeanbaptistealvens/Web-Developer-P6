const app = require('../app'); // Importation de l'instance d'application express qui a été définie dans le fichier app.js
const router = express.Router(); // Initialisation d'un nouveau routeur express

const userController = require('../controllers/user'); // Importation du contrôleur de l'utilisateur qui contient les fonctions pour les opérations d'inscription et de connexion

app.use('/api/auth', router); // Utilisation du routeur pour gérer les requêtes à l'URL "/api/auth"

router.post('/signup', userController.signup); // Route pour l'inscription de l'utilisateur qui utilise la fonction "signup" définie dans le contrôleur de l'utilisateur
router.post('/login', userController.login); // Route pour la connexion de l'utilisateur qui utilise la fonction "login" définie dans le contrôleur de l'utilisateur

module.exports = router; // Export du routeur pour être utilisé par d'autres fichiers


// Ce code est le fichier user.js qui crée un routeur express qui gère les requêtes à l'URL "/api/auth". 
// Il importe d'abord le module principal de l'application, puis crée une nouvelle instance 
// de Routeur pour gérer  les demandes utilisateur. Ensuite, il importe le module de contrôleur 
// utilisateur qui contient les fonctions de traitement pour les demandes de l'utilisateur.

// Le Routeur utilisateur est ensuite monté à l'emplacement "/api/auth" de 
// l'application principale. Deux routes sont définies pour gérer les demandes 
// POST à "/signup" et "/login". Enfin, l'instance de Routeur utilisateur est 
// exportée pour être utilisée par d'autres fichiers.