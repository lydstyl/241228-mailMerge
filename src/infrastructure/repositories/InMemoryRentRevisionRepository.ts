import { RentRevisionRepository } from '../../domain/repositories/RentRevisionRepository'
import { RentRevisionDocument } from '../../domain/entities/RentRevisionDocument'
import { RentCalculator } from '../../domain/services/RentCalculator'

export class InMemoryRentRevisionRepository implements RentRevisionRepository {
  async getRentRevisionData(): Promise<RentRevisionDocument> {
    const lastIndex = 145.17 // deuxième trimestre 2024
    const newIndex = 143.46 // deuxième trimestre 2025 ?
    const rentNoCharges = 345
    const charges = 50

    const { newRentNoCharges, newRent: nouveauLoyer } =
      RentCalculator.calculateNewRent(
        lastIndex,
        newIndex,
        rentNoCharges,
        charges
      )

    // Simuler des données provenant d'une base de données
    return {
      TENANT_NAME: 'SCI LOGIS ANGE',
      TENANT_ADDRESS_1: '259 rue de Wallers',
      TENANT_POSTAL_CODE: '59590',
      TENANT_TOWN: 'RAISMES',
      CIVILITY: 'Monsieur',
      NAME: 'MAHIEU',
      ADDRESS_1: 'Appartement n°6',
      ADDRESS_2: '32 B rue Henri Durre',
      POSTAL_CODE: '59590',
      TOWN: 'RAISMES',
      LETTER_DATE: '01/08/2025',
      INDEX_TYPE: 'Indice de Référence des Loyers',
      QUARTER: 'deuxième',
      LAST_INDEX: lastIndex.toString(),
      NEW_INDEX: newIndex.toString(),
      RENTE_NO_CHARGES: rentNoCharges.toString(),
      NEW_RENT_NO_CHARGES: newRentNoCharges.toFixed(2),
      CHARGES: charges.toString(),
      NEW_RENT: nouveauLoyer.toFixed(2),
      PAYMENT: 'septembre 2025',
      SIGNATURE: 'Gabriel Brun, gérant de la SCI LOGIS ANGE'
    }
  }
}
// Mahieu : envoyeur AR augmentation loyer + demande de paiement des loyers partiellement reçus. Lettre à envoyer entre début juillet et début août. Utiliser mon application il faut juste l'irl du 2ième tri de 2025.

// 30/8 DATE EFFET
// LE TRIMESTRE de référence de l'IRL est celui du 30/08/2024 l'indice applicable étant le dernier indice publié avant la signature