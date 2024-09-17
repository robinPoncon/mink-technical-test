# Mink Technical Test

Ce projet est une application Symfony/React destinée à des fins de test technique. Suivez les instructions ci-dessous pour installer et configurer l'application sur votre machine locale.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre machine :

-   [PHP 8.x](https://www.php.net/downloads.php)
-   [Composer](https://getcomposer.org/)
-   [MySQL](https://www.mysql.com/) ou tout autre SGBD compatible
-   [Node.js et npm](https://nodejs.org/)
-   [Symfony CLI](https://symfony.com/download)

## Installation

1. **Cloner le dépôt** :

    ```bash
    git clone https://github.com/robinPoncon/mink-technical-test.git
    ```

2. **Aller dans le dossier du projet créé** :

    ```bash
    cd mink-technical-test
    ```

3. **Créer un fichier .env à la racine du projet** :

    ```bash
    touch .env
    ```

4. **Configurer le fichier .env avec ces variables** :

    ```bash
    DATABASE_URL=mysql://username:password@127.0.0.1:3306/dbname
    APP_ENV=dev
    APP_SECRET=some_secret_key
    MESSENGER_TRANSPORT_DSN=doctrine://default?auto_setup=0
    ```

    Remplacer username, password et dbname par vos propres informations de base de données.

5. **Installer les dépendances PHP via Composer** :

    ```bash
    composer install
    ```

6. **Installer les dépendances JavaScript via npm** :

    ```bash
    npm install
    ```

7. **Compiler les assets front-end** :

    ```bash
    npm run build
    ```

## Configuration de la base de données

8. **Créer la base de donnée** :

    ```bash
    php bin/console doctrine:database:create
    ```

9. **Exécuter les migrations pour mettre à jour le schéma de la base de données** :

    ```bash
    php bin/console doctrine:migrations:migrate
    ```

10. **Charger les fixtures pour peupler la base de données avec des données de test** :

    ```bash
    php bin/console doctrine:fixtures:load
    ```

## Création d'un utilisateur administrateur

11. **Créez un utilisateur administrateur avec les informations suivantes** :

-   Email : admin@test.com
-   Mot de passe : password123
-   Nom d'utilisateur : Admin
-   Rôle : ROLE_ADMIN

12. **Exemple** :

    ```bash
    php bin/console app:create-user admin@test.com password123 Admin --role=ROLE_ADMIN
    ```

## Démarrage du serveur

13. **Lancer le serveur Symfony en arrière-plan** :

    ```bash
    symfony serve -d
    ```

14. **Tester le projet en accédant à l'adresse suivante** :

    ```bash
    http://127.0.0.1:8000
    ```
