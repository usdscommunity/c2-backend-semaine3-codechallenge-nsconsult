# Library Management API Authentification Features

Une API REST complète pour gérer un système de bibliothèques locales développée avec NestJS, TypeORM et MySQL. Ici l'objectif principal est basé sur l'exercice de l'authentification et la gestion des utilisateurs qui se trouve sur la branche authenticate.

## 🎯 Fonctionnalités

### Authentification
- ✅ Authentifier un utilisateur
- ✅ Créer un utilisateur

### Gestion des utilisateurs
- ✅ Créer un utilisateur avec mot de passe hashé
- ✅ Lister tous les utilisateurs
- ✅ Récupérer un utilisateur par ID
- ✅ Mettre à jour un utilisateur
- ✅ Supprimer un utilisateur
- ✅ Lister tous les prêts d'un utilisateur

### Gestion des bibliothèques
- ✅ Créer une bibliothèque (1 par utilisateur)
- ✅ Lister toutes les bibliothèques
- ✅ Récupérer une bibliothèque par ID
- ✅ Mettre à jour une bibliothèque
- ✅ Supprimer une bibliothèque
- ✅ Récupérer la bibliothèque d'un utilisateur

### Gestion des livres
- ✅ Ajouter un livre à une bibliothèque
- ✅ Lister tous les livres avec filtres (disponibilité, genre, titre, auteur)
- ✅ Récupérer un livre par ID
- ✅ Mettre à jour un livre
- ✅ Supprimer un livre
- ✅ Lister les livres d'une bibliothèque

### Gestion des prêts
- ✅ Emprunter un livre (avec validation métier)
- ✅ Terminer un prêt (retourner un livre)
- ✅ Lister tous les prêts
- ✅ Lister les prêts actifs
- ✅ Lister les prêts en retard
- ✅ Lister les prêts d'un emprunteur
- ✅ Mettre à jour un prêt
- ✅ Supprimer un prêt

## 🗄️ Schéma de base de données

### Relations
- **1 User → 1 Library** : Chaque utilisateur possède une bibliothèque
- **1 Library → * Books** : Une bibliothèque contient plusieurs livres
- **1 Book → * Loans** : Un livre peut avoir plusieurs prêts (historique)
- **1 User → * Loans** : Un utilisateur peut emprunter plusieurs livres

## 🚀 Installation et configuration

### Prérequis
- Node.js (version 16+)
- MySQL (version 8.0+)
- npm

### Étapes de test 

1. **Lancer l'application**
```bash
# Mode développement
npm run start:dev

# Mode production
npm run build
npm run start:prod
```
2. **Commandes de build**
```bash
  npm run build          # Construction de l'application"
  npm run format         # Formatage du code avec Prettier"
  npm run lint           # Vérification du code avec ESLint"
```

L'application sera accessible sur `http://localhost:3000`

## 📚 Documentation API

### Swagger
La documentation interactive est disponible sur : `http://localhost:3000/api`

### Endpoints principaux

#### Authentification
- `POST /auth/register` - Créer un utilisateur
- `POST /auth/login` - Connexion d'un utilisateur

#### Users (Protéger par authentification)
- `GET /users` - Lister tous les utilisateurs
- `GET /users/:id` - Récupérer un utilisateur
- `PATCH /users/:id` - Mettre à jour un utilisateur
- `DELETE /users/:id` - Supprimer un utilisateur
- `GET /users/:id/loans` - Lister les prêts d'un utilisateur

#### Libraries (Pas protéger par authentification)
- `GET /libraries` - Lister toutes les bibliothèques
- `POST /libraries` - Créer une bibliothèque
- `GET /libraries/:id` - Récupérer une bibliothèque
- `PATCH /libraries/:id` - Mettre à jour une bibliothèque
- `DELETE /libraries/:id` - Supprimer une bibliothèque
- `GET /libraries/user/:userId` - Récupérer la bibliothèque d'un utilisateur

#### Books (Pas protéger par authentification)
- `GET /books` - Lister tous les livres (avec filtres)
  - `?available=true` - Livres disponibles
  - `?genre=roman` - Filtrer par genre
  - `?title=search` - Rechercher par titre
  - `?author=search` - Rechercher par auteur
- `POST /books` - Ajouter un livre
- `GET /books/:id` - Récupérer un livre
- `PATCH /books/:id` - Mettre à jour un livre
- `DELETE /books/:id` - Supprimer un livre
- `GET /books/library/:libraryId` - Lister les livres d'une bibliothèque

#### Loans (Pas protéger par authentification)
- `GET /loans` - Lister tous les prêts
- `POST /loans` - Emprunter un livre
- `GET /loans/active` - Lister les prêts actifs
- `GET /loans/overdue` - Lister les prêts en retard
- `GET /loans/:id` - Récupérer un prêt
- `PATCH /loans/:id` - Mettre à jour un prêt
- `PATCH /loans/:id/return` - Terminer un prêt
- `DELETE /loans/:id` - Supprimer un prêt
- `GET /loans/borrower/:borrowerId` - Lister les prêts d'un emprunteur

## 🏗️ Architecture

Le projet suit l'architecture modulaire de `NestJS` :

```
src/
├── auth/dto/
│   ├── login.dto.ts          # DTO de login
│   └── register.dto.ts       # DTO de registration
├── auth/guards/
│   └── local-auth.guard.ts   # Gestionnaire d'authentification
├── auth/strategies/
│   ├── jwt.strategy.ts       # Strategie JWT
│   └── local.strategy.ts     # Strategie local
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/
│   ├── users.entity.ts       # Entité users avec relations
│   ├── users.dto.ts          # DTOs de validation
│   ├── users.service.ts      # Logique métier
│   ├── users.controller.ts   # Contrôleur REST
│   ├── users.module.ts       # Module NestJS
│   └── users.service.spec.ts # Tests unitaires
├── libraries/
│   ├── libraries.entity.ts
│   ├── libraries.dto.ts
│   ├── libraries.service.ts
│   ├── libraries.controller.ts
│   └── libraries.module.ts
├── libraries/
│   ├── libraries.entity.ts
│   ├── libraries.dto.ts
│   ├── libraries.service.ts
│   ├── libraries.controller.ts
│   └── libraries.module.ts
├── books/
│   ├── books.entity.ts
│   ├── books.dto.ts
│   ├── books.service.ts
│   ├── books.controller.ts
│   └── books.module.ts
├── loans/
│   ├── loans.entity.ts
│   ├── loans.dto.ts
│   ├── loans.service.ts
│   ├── loans.controller.ts
│   └── loans.module.ts
├── app.module.ts           # Module principal
└── main.ts                 # Point d'entrée avec Swagger
```

## 🔒 Sécurité

- Mots de passe hashés avec `bcrypt`
- Authentification avec JWT
- Strategie local
- Strategie JWT
- Validation des données avec `class-validator`
- Protection contre les injections SQL avec `TypeORM`
- Variables d'environnement pour la configuration sensible

## 📈 Fonctionnalités avancées

### Validation métier
- Un utilisateur ne peut pas emprunter ses propres livres
- Un livre ne peut être emprunté que s'il est disponible
- Un utilisateur ne peut avoir qu'une seule bibliothèque
- Gestion automatique de la disponibilité des livres

### Requêtes avancées
- Filtrage par `disponibilité`, `genre`, `titre`, `auteur`
- Jointures automatiques avec les relations
- Détection des prêts en retard
- Historique complet des prêts

### Monitoring
- Logs détaillés en mode développement
- Gestion d'erreurs avec codes HTTP appropriés
- Documentation API complète avec Swagger

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -am 'Ajouter nouvelle fonctionnalité'`)
4. Push sur la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub ou contacter l'équipe de développement.
