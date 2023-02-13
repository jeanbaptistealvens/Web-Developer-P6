const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'email ou mot de passe incorrect' });
        }
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, { message: 'email ou mot de passe incorrect' });
            }
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
            return done(null, user, {token: token});
          });
      })
      .catch(err => done(err));
  }));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});


// Ce code implémente une stratégie d'authentification locale en utilisant le module Node.js "Passport". 
// La stratégie d'authentification locale est une façon d'authentifier les utilisateurs en utilisant leur email et leur mot de passe. 

//  Dans ce code, les bibliothèques suivantes sont importées : 

     //  "passport": cette bibliothèque est utilisée pour implémenter des stratégies d'authentification pour une application Node.js. 
     // "passport-local": cette bibliothèque est utilisée pour implémenter une stratégie d'authentification locale. 
     // "bcrypt": cette bibliothèque est utilisée pour crypter les mots de passe des utilisateurs de manière sécurisée. 
     // "jsonwebtoken": cette bibliothèque est utilisée pour générer un jeton JWT (JSON Web Token) qui peut être utilisé pour authentifier
     //  les utilisateurs pour des requêtes subséquentes. 
     // "User": ce modèle représente un utilisateur enregistré dans la base de données. 

//  Le code définit ensuite une nouvelle instance de la stratégie d'authentification locale en utilisant la méthode "passport.use()". 
//  La stratégie d'authentification est configurée pour utiliser "email" comme nom d'utilisateur et "mot de passe" comme champ de mot 
//  de passe. Lorsqu'un utilisateur soumet une demande de connexion, le middleware "passport" appelle la stratégie d'authentification 
//  locale et passe les valeurs d'email et de mot de passe. 

//  La stratégie d'authentification locale effectue alors une requête à la base de données pour trouver un utilisateur avec l'email 
//  spécifié. Si un utilisateur est trouvé, la bibliothèque "bcrypt" est utilisée pour comparer le mot de passe soumis à celui 
//  qui est stocké dans la base de données. Si le mot de passe correspond, un jeton JWT est généré et associé à l'utilisateur. 
//  Ce jeton peut être utilisé pour authentifier les requêtes subséquentes de l'utilisateur. 

//  Enfin, les méthodes "passport.serializeUser()" et "passport.deserializeUser()" sont utilisées pour sérialiser et désérialiser 
//  les utilisateurs pour le stockage dans la session. Cela permet de maintenir l'authentification de l'utilisateur pour des requêtes 
//  subséquentes sans avoir à stocker les informations d'authentification complètes dans la session. 

// A noté que :

// J'ai utilisé un package plus complexe, appelé passport.js par rapport à d'autres normes de package de sécurité pour gérer 
// l'authentification. Il utilise une stratégie d'authentification locale pour vérifier les informations d'identification de 
// l'utilisateur en utilisant bcrypt pour comparer le mot de passe entré à celui stocké dans la base de données.
//  Passport.js offre également des fonctions pour serialiser et déserialiser les utilisateurs pour une utilisation 
//  ultérieure dans l'application. 