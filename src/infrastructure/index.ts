import { DocumentService } from '../application/services/DocumentService'
import { RentRevisionDocument } from '../domain/entities/RentRevisionDocument'
// import { DemandLetterDocument } from '../domain/entities/DemandLetterDocument'

// Exemple d'utilisation
const documentService = new DocumentService()

// Données pour le document de révision de loyer
const ai = 138.61
const ni = 143.46
const lhc = 462.34
const nlhc = (ni * lhc) / ai
const charges = 42
const nouveauLoyer = nlhc + charges

const rentRevisionData: RentRevisionDocument = {
  TENANT_NAME: 'SCI LOGIS ANGE',
  TENANT_ADDRESS_1: '259 rue de Wallers',
  TENANT_POSTAL_CODE: '59590',
  TENANT_TOWN: 'RAISMES',
  CIVILITY: 'Monsieur',
  NAME: 'LEDUC',
  ADDRESS_1: 'Appartement n°4',
  ADDRESS_2: '32 B rue Henri Durre',
  POSTAL_CODE: '59590',
  TOWN: 'RAISMES',
  LETTER_DATE: '10/07/2025',
  INDEX_TYPE: 'Indice de Référence des Loyers', // TYPE_INDICE
  QUARTER: 'premier', // TRIMESTRE
  LAST_INDEX: ai.toString(),
  NEW_INDEX: ni.toString(),
  RENTE_NO_CHARGES: lhc.toString(),
  NEW_RENT_NO_CHARGES: nlhc.toFixed(2),
  CHARGES: charges.toString(),
  NEW_RENT: nouveauLoyer.toFixed(2),
  PAYMENT: 'août 2025', // REGLEMENT
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
