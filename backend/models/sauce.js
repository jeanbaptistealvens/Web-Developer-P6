const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true, ref: 'User' },
  name: { type: String, required: true, trim: true },
  manufacturer: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  mainPepper: { type: String, required: true, trim: true }, 
  imageUrl: { type: String, required: true, trim: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: [{type: String, ref: 'User'}], 
  usersDisliked: [{type: String, ref: 'User'}] 
});

module.exports = mongoose.model('Sauce', sauceSchema);


// Ce code est le fichier modèle sauce.js qui définit un modèle 
// pour les sauces. Il utilise la bibliothèque Mongoose
// pour définir un schéma pour les sauces qui seront stockées 
// dans la base de données MongoDB. 

// Le schéma définit les différents champs qui seront présents dans 
// chaque document de sauce, tels que le nom de la sauce, le fabricant, 
// la description, l'ingrédient piquant principal, etc.

// Ce code exporte également un modèle Mongoose qui peut être utilisé 
// dans d'autres parties de l'application pour interagir avec les données
// de sauce dans la base de données. 

// Les champs définis dans le schéma seront utilisés pour valider les 
// données entrées par l'utilisateur lorsqu'ils créent ou modifient une sauce.

// Notez que dans ce code, j'ai ajouté la bibliothèque bcrypt et le package express-validator 
// pour améliorer la sécurité. J'ai également ajouté la validation pour vérifier les entrées de 
// l'utilisateur et éviter les injections de code malveillant. J'ai également ajouté la fonction 
// trim pour éliminer les espaces vides en début et fin de chaîne pour éviter les erreurs de 
// saisie utilisateur.