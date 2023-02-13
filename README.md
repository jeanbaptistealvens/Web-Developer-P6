# Déployement backend
Ouvrir le terminal intégré vs code du banckend et employer la commande 'nodemon' pour prendre en charge les modifications auto. Pas la peine d’installer toutes les packages, ils sont installés, vous pouvez les voir dans nod_modules et référenciés dans le package.json du dossier du backend. Sinon, installer les packages manquants.

    N'oubliez pas de modifier à la ligne mongoose.connect('votre URI de connexion à votre basse de données MongoDB'... 
    dans le ficheir app.js.

    N'oubliez pas de définir votre 'URI de connexion à une base de données MongoDB', 'votre chaîne secrète pour signer les jetons JWT',
    'votre clé de chiffrement' et 'votre vecteur d'initialisation', pas la peine de définir le port_serveur, il est enseigné par défault dans le fichier '.env'.

# Déployement frontend
Ouvrir le terminal intégré vs code dans le frontend et employer la commande 'npm run start'.