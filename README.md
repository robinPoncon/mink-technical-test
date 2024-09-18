# Mink Technical Test

This project is a Symfony/React application intended for technical testing purposes. Follow the instructions below to install and configure the application on your local machine.

## Requirements

Before you start, make sure you have installed the following tools on your machine :

-   [PHP 8.x](https://www.php.net/downloads.php)
-   [Composer](https://getcomposer.org/)
-   [MySQL](https://www.mysql.com/) or any other compatible DBMS
-   [Node.js et npm](https://nodejs.org/)
-   [Symfony CLI](https://symfony.com/download)

## Installation

1. **Clone the repository** :

    ```bash
    git clone https://github.com/robinPoncon/mink-technical-test.git
    ```

2. **Go to the project folder** :

    ```bash
    cd mink-technical-test
    ```

3. **Create an .env file at the root of the project** :

    ```bash
    touch .env
    ```

4. **Configure the .env file with these variables** :

    ```bash
    DATABASE_URL=mysql://username:password@127.0.0.1:3306/dbname
    APP_ENV=dev
    APP_SECRET=some_secret_key
    MESSENGER_TRANSPORT_DSN=doctrine://default?auto_setup=0
    ```

    Replace username, password and dbname with your own database information.

5. **Installing PHP dependencies via Composer** :

    ```bash
    composer install
    ```

6. **Installing JavaScript dependencies via npm** :

    ```bash
    npm install
    ```

7. **Compiling front-end assets** :

    ```bash
    npm run build
    ```

## Database configuration

8. **Creating the database** :

    ```bash
    php bin/console doctrine:database:create
    ```

9. **Perform migrations to update the database schema** :

    ```bash
    php bin/console doctrine:migrations:migrate
    ```

10. **Load fixtures to populate the database with test data** :

    ```bash
    php bin/console doctrine:fixtures:load
    ```

## Creating an administrator user

11. **Create an administrator user with the following information** :

-   Email : admin@test.com
-   Password : password123
-   Username : Admin
-   Role : ROLE_ADMIN

12. **Example** :

    ```bash
    php bin/console app:create-user admin@test.com password123 Admin --role=ROLE_ADMIN
    ```

## Starting the server

13. **Run the Symfony server and test the project** :

    ```bash
    symfony serve -d
    ```
