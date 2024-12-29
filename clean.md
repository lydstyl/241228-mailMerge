Pour un projet Node.js en clean architecture, vous pouvez structurer votre projet en créant des dossiers qui respectent la séparation des préoccupations. Voici les dossiers essentiels pour un projet minimal :

Structure des dossiers
graphql
Copier le code
src/
├── application/
│ ├── use-cases/ # Contient la logique métier sous forme de cas d'utilisation
│ └── services/ # Services applicatifs si nécessaire
├── domain/
│ ├── entities/ # Définitions des entités du domaine
│ ├── value-objects/ # Objets-valeur du domaine
│ └── repositories/ # Interfaces des dépôts (repositories)
├── infrastructure/
│ ├── frameworks/ # Modules tiers ou frameworks (ex. Express, base de données)
│ ├── repositories/ # Implémentations des dépôts
│ └── controllers/ # Contrôleurs (par ex. REST, GraphQL, etc.)
├── interface/
│ ├── api/ # Définitions des routes et des points d'entrée (REST/GraphQL)
│ └── dto/ # Data Transfer Objects pour l'entrée/sortie
└── config/
└── index.ts # Configuration de l'application (par ex. variables d'environnement)
Description des dossiers
application/

Contient les cas d'utilisation (logique métier sans dépendance aux frameworks).
Chaque cas d'utilisation est une unité distincte.
Exemple : CreateUserUseCase.ts, DeleteUserUseCase.ts

domain/

Définit les entités (ex. User, Order) et les objets-valeur (ex. Email, Password).
Inclut les interfaces des dépôts pour l'abstraction des bases de données.
Exemple : User.ts, IUserRepository.ts

infrastructure/

Contient les implémentations spécifiques aux outils ou aux frameworks.
Par exemple, les dépôts qui interagissent avec une base de données (ex. MongoDB, PostgreSQL).
Contrôleurs pour connecter les cas d'utilisation à l’interface (API REST, etc.).
Exemple : MongoUserRepository.ts, UserController.ts

interface/

Définit l’interface utilisateur ou API.
Par exemple, les routes REST ou GraphQL et les DTO pour valider les entrées/sorties.
Exemple : user.routes.ts, CreateUserDTO.ts

config/

Contient la configuration de l’application, comme les variables d’environnement, les connexions aux services externes, etc.
Exemple : database.config.ts, server.config.ts

Exemple minimal
Cas d'utilisation : Ajouter un utilisateur
Dossiers nécessaires :

domain/entities/User.ts
domain/repositories/IUserRepository.ts
application/use-cases/AddUserUseCase.ts
infrastructure/repositories/InMemoryUserRepository.ts
interface/api/user.routes.ts
