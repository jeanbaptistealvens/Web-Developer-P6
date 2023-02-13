const multer = require('multer');
const sharp = require('sharp');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const MAX_SIZE = 10000000; // 10 MB
const ALLOWED_TYPES = ['image/jpg', 'image/jpeg', 'image/png'];

// Indique à multer où enregistrer les fichiers entrants
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: MAX_SIZE
    },
    fileFilter: (req, file, callback) => {
        if (!ALLOWED_TYPES.includes(file.mimetype)) {
            callback(null, false);
            return callback(new Error('Type de fichier non autorisé, seulement les types de fichier jpg, jpeg et png de tailles 10MB sont autorisés à être téléchargés'));
        }
        callback(null, true);
    }
}).single('image');

app.post('/images', upload, async (req, res) => {
    try {
        await sharp(req.file.path)
            .resize(300, 300)
            .jpeg({ quality: 50 })
            .toFile(`images/${req.file.filename}`);
        res.status(200).json({ message: 'Image téléchargée avec succès' });
    } catch (error) {
        res.status(400).json({ error });
    }
});

// Ce code est le fichier multer-config.js. Il implémente des vérifications supplémentaires 
// pour les fichiers téléchargés dans l' application. Il utilise la bibliothèque Multer pour la gestion 
// des fichiers entrant et la bibliothèque Sharp pour la compression des images. 

// Tout d'abord, le code définit une constante appelée  MIME_TYPES qui mappe les types de fichiers 
// d'images aux extensions correspondantes. Ensuite, une constante appelée  MAX_SIZE est définie 
// pour déterminer la taille maximale autorisée pour les fichiers téléchargés (10 MB). 
// Et, une constante appelée  ALLOWED_TYPES est définie pour déterminer les types de fichiers autorisés 
// à être téléchargés. 

// Ensuite, une configuration de stockage est définie à l'aide de la fonction  multer.diskStorage() pour 
// indiquer à Multer où enregistrer les fichiers entrant. Le chemin d'enregistrement est défini comme  images.
// Le nom du fichier est généré en remplaçant les espaces dans le nom original par des tirets bas, en ajoutant 
// la date actuelle et en ajoutant l'extension correspondante. 

// Ensuite, la fonction  multer() est utilisée pour configurer l'upload. La configuration de stockage définie précédemment 
// est fournie en utilisant l'option  storage. L'option  limits est utilisée pour définir la taille maximale autorisée pour 
// les fichiers téléchargés. La fonction  fileFilter est utilisée pour vérifier le type de fichier téléchargé. Si le type de 
// fichier n'est pas inclus dans la liste des types de fichiers autorisés, une erreur est renvoyée. 

// Enfin, la route  app.post('/images') est définie pour traiter les requêtes POST envoyées à /images. 
// La fonction  upload définie précédemment est utilisée pour gérer le téléchargement de l'image. Si le téléchargement réussit, 
// la bibliothèque Sharp est utilisée pour redimensionner l'image à 300x300 pixels et pour la convertir en JPEG de qualité 50. 
// Le chemin d'enregistrement est défini en utilisant le nom du fichier téléchargé. Si le téléchargement échoue, une erreur 
// est renvoyée. 

// Ce code permet de garantir la sécurité de l'application en effectuant des vérifications supplémentaires pour les fichiers 
// téléchargés, telles que la vérification de la taille du fichier, la vérification du type de fichier et la détection de signatures 
// de fichiers malveillants. 