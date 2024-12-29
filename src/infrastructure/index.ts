const ai = 138.61
const ni = 143.46
const lhc = 462.34
const nlhc = (ni * lhc) / ai
const charges = 42
const nouveauLoyer = nlhc + charges

import { DocumentService } from '../application/services/DocumentService'
import { RentRevisionDocument } from '../domain/entities/RentRevisionDocument'
// import { DemandLetterDocument } from '../domain/entities/DemandLetterDocument'

// Exemple d'utilisation
const documentService = new DocumentService()

// Données pour le document de révision de loyer
const rentRevisionData: RentRevisionDocument = {
  BAILLEUR: `SCI LOGIS ANGE
  259 rue de Wallers
  59590 RAISMES`,
  CIVILITÉ: 'Monsieur',
  LOCATAIRE: `LEDUC
  Appartement n°4
  32 B rue Henri Durre
  59590 RAISMES
  `,
  DATE_COURRIER: '10/07/2025',
  TYPE_INDICE: 'Indice de Référence des Loyers',
  TRIMESTRE: 'premier',
  AI: ai.toString(),
  NI: ni.toString(),
  LHC: lhc.toString(),
  NLHC: nlhc.toFixed(2),
  CHARGES: charges.toString(),
  NOUVEAU_LOYER: nouveauLoyer.toString(),
  REGLEMENT: 'août 2024',
  SIGNATURE: 'Gabriel Brun, gérant de la SCI LOGIS ANGE'
}

// // Données pour la mise en demeure
// const demandLetterData: DemandLetterDocument = {
//   recipientName: 'Marie Curie'
//   // dueDate: new Date('2024-01-15')
// }

// Génération du document de révision de loyer
console.log('--- Test de génération de document de révision de loyer ---')
documentService.generateDocument('rent-revision', rentRevisionData)

// // Génération de la mise en demeure
// console.log('--- Test de génération de mise en demeure ---')
// documentService.generateDocument('demand-letter', demandLetterData)
