import { RentRevisionRepository } from '../../domain/repositories/RentRevisionRepository'
import { RentRevisionDocument } from '../../domain/entities/RentRevisionDocument'
import { RentCalculator } from '../../domain/services/RentCalculator'

export class InMemoryRentRevisionRepository implements RentRevisionRepository {
  async getRentRevisionData(): Promise<RentRevisionDocument> {
    const lastIndex = 138.61
    const newIndex = 143.46
    const rentNoCharges = 462.34
    const charges = 42

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
      NAME: 'LEDUC',
      ADDRESS_1: 'Appartement n°4',
      ADDRESS_2: '32 B rue Henri Durre',
      POSTAL_CODE: '59590',
      TOWN: 'RAISMES',
      LETTER_DATE: '10/07/2025',
      INDEX_TYPE: 'Indice de Référence des Loyers',
      QUARTER: 'premier',
      LAST_INDEX: lastIndex.toString(),
      NEW_INDEX: newIndex.toString(),
      RENTE_NO_CHARGES: rentNoCharges.toString(),
      NEW_RENT_NO_CHARGES: newRentNoCharges.toFixed(2),
      CHARGES: charges.toString(),
      NEW_RENT: nouveauLoyer.toFixed(2),
      PAYMENT: 'août 2025',
      SIGNATURE: 'Gabriel Brun, gérant de la SCI LOGIS ANGE'
    }
  }
}
