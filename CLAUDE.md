# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a document generation application (mail merge system) that creates various documents by merging data with DOCX templates:
- Legal documents: rent revision notices ("révisions de loyer") and demand letters ("mises en demeure")
- Personal documents: birthday invitations for Marie and Louis

The application is built following Clean Architecture principles with strict separation between domain, application, and infrastructure layers.

## Commands

**Run the application:**
```bash
npm start
```

**Run tests:**
```bash
npm test
```

**Run a single test file:**
```bash
pnpx jest path/to/test-file.test.ts
```

**Run tests in watch mode:**
```bash
pnpx jest --watch
```

## Architecture

The codebase follows Clean Architecture with clear layer separation:

### Domain Layer (`src/domain/`)
- **entities/**: Type definitions for documents (e.g., `RentRevisionDocument`, `DemandLetterDocument`)
- **repositories/**: Repository interfaces that define data access contracts
- **services/**: Domain logic (e.g., `RentCalculator` for rent calculation formulas)

### Application Layer (`src/application/`)
- **use-cases/**: Specific business use cases (e.g., `GenerateRentRevisionDocument`, `GenerateDemandLetter`)
- **services/**: Application services that orchestrate use cases (e.g., `DocumentService` which routes document generation by type)

### Infrastructure Layer (`src/infrastructure/`)
- **repositories/**: Concrete implementations of repository interfaces
  - Rent revisions: `InMemoryRentRevisionRepository`, `InMemoryLeducRentRevisionRepository`, `InMemoryMahieuRevisionRepository`
  - Birthday invitations: `InMemoryMarieBirthdayInvitationRepository`, `InMemoryLouisBirthdayInvitationRepository`
  - Factories: `BirthdayInvitationRepositoryFactory` for selecting the right child's repository
- **templates/**: DOCX template files organized by document type
- **output/**: Generated documents are saved here
- **utils/**: Utility functions, notably `documentUtils.ts` which handles DOCX template patching using the `docx` library
- **index.ts**: Application entry point that wires dependencies and executes the main flow

### Key Design Patterns

**Repository Pattern:** Domain defines interfaces (`RentRevisionRepository`), infrastructure provides implementations. This allows swapping data sources (in-memory → database) without changing domain/application code.

**Use Case Pattern:** Each document generation scenario is a separate use case class with an `execute()` method that takes domain entities as input.

**Dependency Inversion:** The entry point (`infrastructure/index.ts`) instantiates concrete implementations and injects them into services.

### Document Generation Flow

1. Repository fetches/creates data conforming to domain entity type (e.g., `RentRevisionDocument`)
2. `DocumentService` routes to appropriate use case based on document type
3. Use case prepares patches (key-value replacements) from entity data
4. `documentUtils.editDocx()` applies patches to DOCX template using `docx` library's `patchDocument()`
5. Generated document saved to `infrastructure/output/`

### Template System

Templates are DOCX files with placeholder tags matching entity property names (e.g., `TENANT_NAME`, `NEW_RENT`). The `patchDocument` function from the `docx` library replaces these tags with actual values while preserving document formatting.

## Important Notes

- Document entity types use UPPERCASE property names to match template placeholders
- Repository implementations are currently in-memory; they simulate database responses with hardcoded data
- Multiple repository implementations exist for different clients (Leduc, Mahieu) representing different data formats/sources
- The `DocumentService` acts as a factory, routing document generation based on type string ('rent-revision', 'demand-letter')

## Birthday Invitations - Usage Guide

### Switching Between Marie and Louis

To generate birthday invitations for either Marie or Louis, edit the `CHILD` constant in `src/infrastructure/index.ts`:

```typescript
const CHILD: ChildName = 'marie'  // or 'louis'
```

Then run:
```bash
npm start
```

### Adding Friends to the Guest List

**For Marie:** Edit `src/infrastructure/repositories/InMemoryMarieBirthdayInvitationRepository.ts`
- Add friend names to the `friends` array
- Update the `DATE` field with the actual party date

**For Louis:** Edit `src/infrastructure/repositories/InMemoryLouisBirthdayInvitationRepository.ts`
- Add friend names to the `friends` array
- Update the `DATE` field with the actual party date

Example:
```typescript
const friends = [
  'Sélène',
  'Emma',
  'Sophie'
  // Add more friends here
]
```

### Output

Generated invitations are saved to `src/infrastructure/output/birthday/`:
- A consolidated document with all invitations: `invitations-toutes.docx`
