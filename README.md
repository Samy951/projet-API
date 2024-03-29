# Projet API - Génération et Gestion des PDF

Ce projet consiste en une application permettant de générer des certificats médicaux au format PDF et de gérer l'historique de ces documents.

## Technologies utilisées

### Backend :
- Node.js avec Express.js
- PostgreSQL pour la base de données
- PDFKit pour la génération des PDF
- dotenv pour la gestion des variables d'environnement

### Frontend :
- React.js pour l'interface utilisateur
- Fetch API pour les requêtes HTTP vers l'API
- Tailwind CSS pour le style

## Fonctionnalités

### Backend
- Génération de certificats médicaux au format PDF avec les informations spécifiées par l'utilisateur.
- Stockage des informations des PDF générés dans une base de données PostgreSQL.
- API RESTful pour la manipulation des PDF (génération, récupération de l'historique, suppression).

### Frontend
- Interface utilisateur simple pour la génération et la gestion des certificats médicaux.

## Configuration

### Backend

1. Clonez ce dépôt sur votre machine.
2. Installez les dépendances avec `npm install`.
3. Configurez les variables d'environnement dans un fichier `.env` en vous basant sur le fichier `.env.example`.
4. Assurez-vous que PostgreSQL est installé sur votre machine et configurez les informations de connexion dans le fichier `.env`.
5. Lancez le serveur avec `npm start`.

### Frontend

1. Naviguez vers le répertoire `frontend`.
2. Installez les dépendances avec `npm install`.
3. Démarrez l'application avec `npm start`.

## Utilisation

- Accédez à l'application frontend via votre navigateur à l'adresse [http://localhost:3000](http://localhost:3000).
- Remplissez le formulaire pour générer un nouveau certificat médical.

