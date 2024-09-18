Plateforme d'apprentissage en ligne pour débutants et intermédiaires

Ce projet est une plateforme d'apprentissage en ligne qui permet aux utilisateurs d'accéder à divers modules de formation. Les fonctionnalités incluent la gestion des cours, l'achat de cours payants via Stripe, la progression utilisateur, et l'administration des modules pour l'admin

Le projet est construit avec Next.js pour la partie front-end et back-end, et utilise Prisma pour l'accès à la base de données. Clerk est utilisé pour la gestion des utilisateurs, et Stripe pour le traitement des paiements.


Technologies utilisées

  Next.js v14 : Framework React pour la partie front-end et back-end.
    Prisma : ORM pour gérer la base de données MySQL.
    Clerk : Service pour la gestion des utilisateurs (authentification, inscription).
    Stripe : Solution de paiement pour gérer les achats de cours.
    PlanetScale : Base de données MySQL hébergée.

Installation
Prérequis

  Node.js v20+
    npm ou yarn installé
    Une base de données MySQL (PlanetScale est utilisé dans ce projet)
    Compte Stripe (pour la gestion des paiements)
    Compte Clerk (pour la gestion des utilisateurs)

Étapes

Cloner le projet :

  
    git clone https://github.com/username/nom-du-projet.git
    cd nom-du-projet

Installer les dépendances :


npm install

Configurer les variables d'environnement :

Créer un fichier .env à la racine du projet et y ajouter les clés suivantes :
    
    DATABASE_URL=mysql://<username>:<password>@<host>/<database>?sslaccept=strict
    STRIPE_API_KEY=<votre-clé-stripe>
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<votre-clé-stripe-publique>
    STRIPE_WEBHOOK_SECRET=<votre-webhook-secret>
    CLERK_API_KEY=<votre-clé-clerk>
    NEXT_PUBLIC_CLERK_FRONTEND_API=<votre-clé-clerk-frontend>
    NEXT_PUBLIC_APP_URL=http://localhost:3000

Initialiser Prisma :
 npx prisma init
Générer le client Prisma :


    npx prisma generate

Appliquer les migrations :

    npx prisma migrate dev

Lancer l'application :

    npm run dev

    Accéder à l'application sur http://localhost:3000.
