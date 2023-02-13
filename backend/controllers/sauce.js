// Importe le modèle de sauce et des bibliothèques nécessaires
const Sauce = require("../models/sauce"); // Importe le modèle de sauce
const fs = require("fs"); // Importe la bibliothèque 'fs' (file system) pour manipuler les fichiers
const path = require("path"); // Importe la bibliothèque 'path' pour manipuler les chemins de fichiers
const { validationResult } = require("express-validator");

// Récupère toutes les sauces enregistrées
exports.readAllSauces = async (req, res) => {
  try {
    const allSauces = await Sauce.find(); // Trouve toutes les sauces dans la base de données
    allSauces.forEach((sauce) => {
      sauce.imageUrl = `${req.protocol}://${req.get("host")}${sauce.imageUrl}`; // Ajoute l'URL complète de l'image à chaque sauce
    });
    res.status(200).json(allSauces); // Retourne toutes les sauces trouvées dans le format JSON
  } catch (error) {
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération de toutes les sauces" }); // Retourne une erreur en cas d'échec
  }
};

// Récupère une sauce enregistrée
exports.readOneSauce = async (req, res) => {
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id }); // Trouve la sauce correspondant à l'ID passé en paramètre
    if (!sauce) {
      return res.status(404).json({ error: "Sauce non trouvée" }); // Retourne une erreur si la sauce n'a pas été trouvée
    }
    sauce.imageUrl = `${req.protocol}://${req.get("host")}${sauce.imageUrl}`; // Ajoute l'URL complète de l'image à la sauce
    res.status(200).json(sauce); // Retourne la sauce trouvée dans le format JSON
  } catch (error) {
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération de la sauce" }); // Retourne une erreur en cas d'échec
  }
};

// Crée une nouvelle sauce
exports.createSauce = async (req, res) => {
  const errors = validationResult(req);  // Vérifie des erreurs de validation
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Retourne un tableau d'erreur si des erreurs sont présentes
  }
  try {
    const sauceObject = req.body; // Crée un objet sauce à partir des données reçues dans la requête
    const sauce = new Sauce({ //Crée une nouvelle instance de modèle de sauce en utilisant les données reçues et l'ID de l'utilisateur connecté
      ...sauceObject,
      userId: req.auth.userId, // Ajoute l'ID de l'utilisateur à l'objet de la sauce
      imageUrl: `/images/${req.file.filename}`, // Ajoute l'URL de l'image à l'objet de la sauce

    });
    await sauce.save(); // Enregistre la nouvelle sauce dans la base de données
    res.status(201).json(sauce); // Retourne la nouvelle sauce enregistrée dans le format JSON
  } catch (error) {
    res.status(400).json({ error: "Une erreur s'est produite lors de la création de la sauce" }); // Retourne une erreur en cas d'échec
  }
};

// Met à jour une sauce existante
exports.updateSauce = async (req, res) => {
  const errors = validationResult(req); // Vérifie des erreurs de validation
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Retourne un tableau d'erreur si des erreurs sont présentes
  }
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id }); // Trouve la sauce correspondant à l'ID passé en paramètre
    if (!sauce) {
      return res.status(404).json({ error: "La sauce n'a pas été trouvée" }); // Retourne une erreur si la sauce n'a pas été trouvée
    }
    if (sauce.userId.toString() !== req.auth.userId) {
      return res.status(401).json({ error: "Vous n'avez pas les autorisations nécessaires pour mettre à jour la sauce" }); // Retourne une erreur si l'utilisateur n'a pas les autorisations nécessaires pour mettre à jour la sauce
    }
    const sauceObject = req.file // Crée un objet sauce à partir des données reçues dans la requête, si une image est fournie
      ? {
        ...req.body,
        imageUrl: `/images/${req.file.filename}` // Ajoute l'URL de l'image à l'objet de la sauce si un fichier image a été transmis avec la requête
      }
      : { ...req.body }; // Sinon, utilise simplement les données de la sauce telles quelles

    await Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }); // Met à jour la sauce dans la base de données
    const updatedSauce = await Sauce.findOne({ _id: req.params.id }); // Récupère la sauce mise à jour
    res.status(200).json(updatedSauce); // Retourne la sauce mise à jour dans le format JSON
  } catch (error) {
    res.status(400).json({ error }); // Retourne une erreur en cas d'échec
  }
};

// Ce code implémente un ensemble de fonctions pour gérer les sauces. Il utilise le framework Express de Node.js pour créer 
// un serveur HTTP et traiter les requêtes des utilisateurs.

// Les fonctions implémentées sont les suivantes :

// readAllSauces : Cette fonction permet de récupérer toutes les sauces enregistrées dans la base de données. Elle utilise la méthode find du modèle 
// Sauce pour trouver toutes les sauces et ajoute l'URL complète de l'image à chaque sauce. Enfin, elle retourne les sauces trouvées dans le format JSON.

// readOneSauce : Cette fonction permet de récupérer une sauce enregistrée en utilisant son ID. Elle utilise la méthode findOne du modèle Sauce pour 
// trouver la sauce correspondant à l'ID passé en paramètre. Ensuite, elle ajoute l'URL complète de l'image à la sauce et retourne la sauce trouvée dans 
// le format JSON.

// createSauce : Cette fonction permet de créer une nouvelle sauce en enregistrant les données de la sauce passées dans le corps de la requête. 
// Elle transforme les données en objet JavaScript, ajoute l'ID de l'utilisateur et l'URL de l'image à l'objet de la sauce, puis enregistre la nouvelle
// sauce dans la base de données en utilisant la méthode save du modèle Sauce. Enfin, elle retourne la nouvelle sauce enregistrée dans le format JSON.

// updateSauce : Cette fonction permet de mettre à jour une sauce existante en utilisant son ID. Elle utilise la méthode findOne du modèle Sauce pour 
// trouver la sauce correspondant à l'ID passé en paramètre et vérifie que l'utilisateur a les autorisations nécessaires pour mettre à jour la sauce. 
// Ensuite, elle transforme les données de la sauce en objet JavaScript et ajoute l'URL de l'image si un fichier image a été transmis avec la requête. 
// Enfin, elle met à jour la sauce dans la base de données en utilisant la méthode updateOne du modèle Sauce et retourne la sauce mise à jour dans le 
// format JSON.

// Toutes ces fonctionnalités comprennent des contrôles de validation pour vérifier que les données reçues sont valides et des contrôles d'erreur pour 
// gérer les erreurs potentielles lors de l'exécution des opérations de base de données