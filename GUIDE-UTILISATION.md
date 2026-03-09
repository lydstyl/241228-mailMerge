# Guide d'utilisation - Application de Publipostage (Mail Merge)

Ce guide explique comment utiliser l'application pour générer des documents personnalisés à partir de templates DOCX.

## Table des matières

1. [Cas d'usage : Créer un publipostage pour un autre enfant](#cas-1-créer-un-publipostage-pour-un-autre-enfant)
2. [Guide général : Créer un nouveau type de document](#guide-général-créer-un-nouveau-type-de-document)
3. [Architecture de l'application](#architecture-de-lapplication)

---

## Cas 1 : Créer un publipostage pour un autre enfant

### Scénario
Vous avez déjà créé des invitations d'anniversaire pour Louis et vous voulez faire la même chose pour votre fille Emma avec une liste d'amis différente.

### Solution rapide : Modifier les données existantes

**Étape 1 : Modifier le fichier de données**

Éditez le fichier `src/infrastructure/repositories/InMemoryBirthdayInvitationRepository.ts` :

```typescript
export class InMemoryBirthdayInvitationRepository implements BirthdayInvitationRepository {
  async getBirthdayInvitations(): Promise<BirthdayInvitationDocument[]> {
    // MODIFIEZ la liste des amis
    const friends = [
      'Sophie',
      'Chloé',
      'Léa',
      'Manon',
      'Camille',
      'Alice'
    ]

    // MODIFIEZ les données communes
    const commonData = {
      FIRST_NAME: 'Emma',        // ← Prénom de votre enfant
      LAST_NAME: 'B.',           // ← Nom de famille
      LETTER_DATE: '10 avril 2026',  // ← Date de la lettre
      DATE: 'samedi 15 mai de 15h à 19h'  // ← Date et heure de la fête
    }

    return friends.map((friend) => ({
      ...commonData,
      FRIEND: friend
    }))
  }
}
```

**Étape 2 : Vérifier le template (optionnel)**

Si vous voulez modifier le texte de l'invitation, éditez le fichier Word :
- Ouvrez `src/infrastructure/templates/birthday/template.docx`
- Modifiez le texte selon vos besoins
- **NE PAS TOUCHER** aux placeholders entre `{{}}` (ex: `{{FRIEND}}`, `{{DATE}}`)
- Sauvegardez

**Étape 3 : Générer les invitations**

```bash
npm start
```

Le document consolidé sera généré dans :
`src/infrastructure/output/birthday/invitations-toutes.docx`

### Solution alternative : Créer un dossier séparé pour chaque enfant

Si vous voulez garder les invitations de Louis ET créer celles d'Emma :

**Étape 1 : Créer un nouveau repository**

Créez `src/infrastructure/repositories/InMemoryBirthdayInvitationEmmaRepository.ts` :

```typescript
import { BirthdayInvitationRepository } from '../../domain/repositories/BirthdayInvitationRepository'
import { BirthdayInvitationDocument } from '../../domain/entities/BirthdayInvitationDocument'

export class InMemoryBirthdayInvitationEmmaRepository
  implements BirthdayInvitationRepository
{
  async getBirthdayInvitations(): Promise<BirthdayInvitationDocument[]> {
    const friends = ['Sophie', 'Chloé', 'Léa', 'Manon', 'Camille', 'Alice']

    const commonData = {
      FIRST_NAME: 'Emma',
      LAST_NAME: 'B.',
      LETTER_DATE: '10 avril 2026',
      DATE: 'samedi 15 mai de 15h à 19h'
    }

    return friends.map((friend) => ({
      ...commonData,
      FRIEND: friend
    }))
  }
}
```

**Étape 2 : Modifier le fichier index.ts**

```typescript
// Remplacez cette ligne :
import { InMemoryBirthdayInvitationRepository } from '../infrastructure/repositories/InMemoryBirthdayInvitationRepository'

// Par celle-ci :
import { InMemoryBirthdayInvitationEmmaRepository } from '../infrastructure/repositories/InMemoryBirthdayInvitationEmmaRepository'

// Et changez :
const birthdayInvitationRepository = new InMemoryBirthdayInvitationEmmaRepository()
```

**Étape 3 : Générer**

```bash
npm start
```

---

## Guide général : Créer un nouveau type de document

### Exemple : Invitations de mariage

Vous voulez créer des invitations de mariage personnalisées.

### 📋 Étape 1 : Créer le template DOCX

**1.1 Créer le dossier du template**
```bash
mkdir -p src/infrastructure/templates/wedding
```

**1.2 Créer le document Word**

Créez `src/infrastructure/templates/wedding/template.docx` avec le contenu suivant :

```
{{GROOM_NAME}} et {{BRIDE_NAME}}

ont le plaisir de vous inviter à leur mariage

Cher(e) {{GUEST_NAME}},

Nous serions ravis de vous compter parmi nous pour célébrer notre union
le {{WEDDING_DATE}} à {{WEDDING_LOCATION}}.

La cérémonie sera suivie d'une réception.

Merci de confirmer votre présence avant le {{RSVP_DATE}}.

{{GROOM_NAME}} & {{BRIDE_NAME}}
```

**⚠️ Règles importantes pour les placeholders :**
- Toujours utiliser `{{NOM_VARIABLE}}` avec des doubles accolades
- Noms de variables en MAJUSCULES
- Pas d'espaces dans les noms (utiliser `_` pour séparer les mots)

### 🏗️ Étape 2 : Définir l'entité de domaine

Créez `src/domain/entities/WeddingInvitationDocument.ts` :

```typescript
export type WeddingInvitationDocument = {
  GROOM_NAME: string
  BRIDE_NAME: string
  GUEST_NAME: string
  WEDDING_DATE: string
  WEDDING_LOCATION: string
  RSVP_DATE: string
}
```

**📝 Note :** Les propriétés doivent **exactement** correspondre aux placeholders du template.

### 📚 Étape 3 : Créer le repository

**3.1 Interface du repository**

Créez `src/domain/repositories/WeddingInvitationRepository.ts` :

```typescript
import { WeddingInvitationDocument } from '../entities/WeddingInvitationDocument'

export interface WeddingInvitationRepository {
  getWeddingInvitations(): Promise<WeddingInvitationDocument[]>
}
```

**3.2 Implémentation du repository**

Créez `src/infrastructure/repositories/InMemoryWeddingInvitationRepository.ts` :

```typescript
import { WeddingInvitationRepository } from '../../domain/repositories/WeddingInvitationRepository'
import { WeddingInvitationDocument } from '../../domain/entities/WeddingInvitationDocument'

export class InMemoryWeddingInvitationRepository
  implements WeddingInvitationRepository
{
  async getWeddingInvitations(): Promise<WeddingInvitationDocument[]> {
    // Liste des invités
    const guests = [
      'Jean et Marie Dupont',
      'Pierre Martin',
      'Sophie et Thomas Bernard',
      'Isabelle Laurent',
      'François Petit'
    ]

    // Données communes à toutes les invitations
    const commonData = {
      GROOM_NAME: 'Gabriel',
      BRIDE_NAME: 'Sophie',
      WEDDING_DATE: 'samedi 20 juin 2026 à 15h',
      WEDDING_LOCATION: "l'Église Saint-Martin, 123 rue de l'Église, Raismes",
      RSVP_DATE: '1er juin 2026'
    }

    // Créer une invitation pour chaque invité
    return guests.map((guest) => ({
      ...commonData,
      GUEST_NAME: guest
    }))
  }
}
```

### ⚙️ Étape 4 : Créer le use case de génération

**Option A : Document consolidé (recommandé pour impression en masse)**

Créez `src/application/use-cases/GenerateWeddingInvitationConsolidated.ts` :

```typescript
import * as fs from 'fs'
import * as path from 'path'
import { IPatch, PatchType, TextRun } from 'docx'
import { WeddingInvitationDocument } from '../../domain/entities/WeddingInvitationDocument'
import { editDocx } from '../../infrastructure/utils/documentUtils'

const DocxMerger = require('docx-merger')

const templatePath = 'src/infrastructure/templates/wedding/template.docx'
const outputDir = 'src/infrastructure/output/wedding'
const consolidatedOutputPath = path.join(outputDir, 'invitations-toutes.docx')

export class GenerateWeddingInvitationConsolidated {
  async execute(dataList: WeddingInvitationDocument[]) {
    console.log(
      `Génération d'un document consolidé avec ${dataList.length} invitations`
    )

    // Créer le dossier de sortie
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Générer tous les documents individuels temporaires
    const tempFiles: string[] = []

    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i]
      console.log(`  - Génération de l'invitation pour ${data.GUEST_NAME}`)

      // Préparer les patches pour remplacer les tags
      const patches: { [key: string]: IPatch } = {}
      for (const [key, value] of Object.entries(data)) {
        patches[key] = {
          type: PatchType.PARAGRAPH,
          children: [new TextRun(value)]
        }
      }

      // Éditer le document
      const updatedDoc = await editDocx(templatePath, patches)
      if (updatedDoc) {
        const tempPath = path.join(outputDir, `temp-${i}.docx`)
        fs.writeFileSync(tempPath, updatedDoc)
        tempFiles.push(tempPath)
      }
    }

    // Fusionner avec des sauts de page
    console.log('\nFusion des documents...')
    const docx = new DocxMerger(
      {},
      tempFiles.map((file) => fs.readFileSync(file))
    )

    await docx.save('nodebuffer', (data: Buffer) => {
      fs.writeFileSync(consolidatedOutputPath, data)
      console.log(`\nDocument consolidé généré : ${consolidatedOutputPath}`)
    })

    // Nettoyer les fichiers temporaires
    for (const tempFile of tempFiles) {
      fs.unlinkSync(tempFile)
    }

    console.log('Terminé !')
  }
}
```

**Option B : Documents individuels**

Créez `src/application/use-cases/GenerateWeddingInvitation.ts` :

```typescript
import * as fs from 'fs'
import * as path from 'path'
import { IPatch, PatchType, TextRun } from 'docx'
import { WeddingInvitationDocument } from '../../domain/entities/WeddingInvitationDocument'
import { editDocx } from '../../infrastructure/utils/documentUtils'

const templatePath = 'src/infrastructure/templates/wedding/template.docx'
const outputDir = 'src/infrastructure/output/wedding'

export class GenerateWeddingInvitation {
  async execute(data: WeddingInvitationDocument) {
    console.log(`Génération de l'invitation pour ${data.GUEST_NAME}`)

    // Préparer les patches
    const patches: { [key: string]: IPatch } = {}
    for (const [key, value] of Object.entries(data)) {
      patches[key] = {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(value)]
      }
    }

    // Éditer le document
    const updatedDoc = await editDocx(templatePath, patches)
    if (updatedDoc) {
      // Créer le dossier de sortie
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      // Sauvegarder
      const filename = data.GUEST_NAME.replace(/\s+/g, '-')
      const outputPath = path.join(outputDir, `invitation-${filename}.docx`)
      fs.writeFileSync(outputPath, updatedDoc)
      console.log(`Document généré : ${outputPath}`)
    }
  }
}
```

### 🚀 Étape 5 : Configurer index.ts et lancer

Modifiez `src/infrastructure/index.ts` :

```typescript
import { InMemoryWeddingInvitationRepository } from '../infrastructure/repositories/InMemoryWeddingInvitationRepository'
import { GenerateWeddingInvitationConsolidated } from '../application/use-cases/GenerateWeddingInvitationConsolidated'

const weddingInvitationRepository = new InMemoryWeddingInvitationRepository()

async function main() {
  console.log('=== Génération des invitations de mariage ===\n')

  const invitations = await weddingInvitationRepository.getWeddingInvitations()

  const consolidatedGenerator = new GenerateWeddingInvitationConsolidated()
  await consolidatedGenerator.execute(invitations)
}

main().catch((err) => console.error("Erreur lors de l'exécution :", err))
```

**Lancer la génération :**

```bash
npm start
```

Le document sera généré dans :
`src/infrastructure/output/wedding/invitations-toutes.docx`

---

## Architecture de l'application

### Flux de données

```
┌─────────────────────────────────────────────────────────────────┐
│                         index.ts                                 │
│                    (Point d'entrée)                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Repository Implementation                     │
│    (InMemory...Repository.ts dans infrastructure/)              │
│                                                                  │
│  → Fournit les données (liste d'amis, invités, etc.)           │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                         Use Case                                 │
│      (Generate...Consolidated.ts dans application/)             │
│                                                                  │
│  → Prépare les "patches" (remplacements de placeholders)       │
│  → Appelle editDocx() pour chaque document                      │
│  → Fusionne avec docx-merger si consolidé                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Template DOCX                               │
│      (dans infrastructure/templates/...)                        │
│                                                                  │
│  → Document Word avec placeholders {{VARIABLE}}                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Document généré                               │
│      (dans infrastructure/output/...)                           │
│                                                                  │
│  → Fichier DOCX final avec données personnalisées               │
└─────────────────────────────────────────────────────────────────┘
```

### Rôle des différentes couches

#### 🎯 Domain (src/domain/)
**Contient les règles métier pures, indépendantes de l'infrastructure**

- **entities/** : Types TypeScript représentant les données du document
  - Exemple : `BirthdayInvitationDocument`, `RentRevisionDocument`
  - Correspondent exactement aux placeholders du template

- **repositories/** : Interfaces définissant comment accéder aux données
  - Exemple : `BirthdayInvitationRepository`
  - Ne dit PAS comment les données sont stockées, juste quel contrat respecter

- **services/** : Logique métier réutilisable
  - Exemple : `RentCalculator` pour calculer les nouvelles rentes

#### 💼 Application (src/application/)
**Orchestre les règles métier pour réaliser des cas d'usage**

- **use-cases/** : Actions concrètes que l'application peut effectuer
  - Exemple : `GenerateBirthdayInvitation`, `GenerateRentRevisionDocument`
  - Prend les données du repository
  - Appelle les utilities pour générer les documents

- **services/** : Services qui coordonnent plusieurs use cases
  - Exemple : `DocumentService` qui route vers le bon use case selon le type

#### 🔧 Infrastructure (src/infrastructure/)
**Détails techniques d'implémentation**

- **repositories/** : Implémentations concrètes des interfaces du domain
  - `InMemory...Repository` : Données en dur dans le code (pour développement/test)
  - Peut être remplacé par une vraie base de données sans toucher au domain

- **templates/** : Fichiers DOCX avec placeholders

- **output/** : Documents générés (ignoré par Git)

- **utils/** : Fonctions utilitaires (comme `editDocx()`)

- **index.ts** : Point d'entrée qui assemble tout

### Pourquoi cette architecture ?

**✅ Séparation des préoccupations**
- Changer la source des données (fichier → base de données) ne touche que l'infrastructure
- Changer le format de sortie ne touche que les use cases

**✅ Testabilité**
- Chaque couche peut être testée indépendamment
- Les repositories in-memory permettent de tester sans vraie base de données

**✅ Réutilisabilité**
- Les entités et services du domain peuvent être réutilisés dans d'autres projets
- Les use cases peuvent être appelés depuis différents points d'entrée (CLI, API, etc.)

---

## 💡 Astuces et bonnes pratiques

### Nommage des variables dans les templates
- ✅ `{{FIRST_NAME}}` : Bon (UPPERCASE avec underscores)
- ❌ `{{firstName}}` : Mauvais (camelCase)
- ❌ `{{First Name}}` : Mauvais (espaces)
- ❌ `{{NOM}}` : À éviter (préférer l'anglais pour cohérence du code)

### Organisation des données
- Si vous avez **moins de 50 enregistrements** → InMemory repository (comme actuellement)
- Si vous avez **plus de 50 enregistrements** → Créer un fichier JSON ou CSV et le lire
- Si vous avez **des milliers d'enregistrements** → Utiliser une vraie base de données

### Gestion des outputs
- Les fichiers dans `output/` sont ignorés par Git (voir `.gitignore`)
- Ne commitez JAMAIS de documents générés contenant des données personnelles
- Créez un dossier par type de document pour mieux organiser

### Débogage
Si un placeholder n'est pas remplacé :
1. Vérifiez l'orthographe exacte dans le template Word
2. Vérifiez que la propriété existe dans l'entité TypeScript
3. Vérifiez que le repository retourne bien cette propriété
4. Assurez-vous que les noms sont identiques (MAJUSCULES comprises)

### Performance
- Pour générer des centaines de documents, utilisez la version "consolidée" puis imprimez en une fois
- Pour quelques documents, la version individuelle suffit

---

## 📞 Besoin d'aide ?

Si vous rencontrez des difficultés :

1. Vérifiez que toutes les dépendances sont installées : `npm install`
2. Consultez les messages d'erreur dans la console
3. Vérifiez que le template DOCX est bien placé au bon endroit
4. Assurez-vous que les placeholders correspondent exactement aux propriétés de l'entité

---

**Bon publipostage ! 🎉**
