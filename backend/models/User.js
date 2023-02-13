const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
const { check, validationResult } = require('express-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10, (error, hash) => {
    this.password = hash;
    next();
  });
});

userSchema.plugin(uniqueValidator);

const validateSignup = [
  check('email')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('L\'e-mail est requis'),
  check('password')
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères')
];

module.exports = mongoose.model('User', userSchema);
module.exports.validateSignup = validateSignup;


// Ce code est le fichier modèle user.js qui définit un modèle Mongoose 
// pour les utilisateurs. Il utilise la bibliothèque mongoose pour créer un 
// schéma de données pour les utilisateurs, qui comporte deux propriétés: 
// email et password. 

// La propriété email est définie comme étant une chaîne de caractères 
// requise et unique, tandis que la propriété password est définie comme 
// étant une chaîne de caractères requise.

// Le plug-in mongoose-unique-validator est utilisé pour vérifier l'unicité 
// de l'email. Le modèle User est ensuite créé en utilisant mongoose.model 
// et en lui passant en premier argument le nom du modèle, et en second argument 
// le schéma défini. Le modèle est enfin exporté en utilisant module.exports.