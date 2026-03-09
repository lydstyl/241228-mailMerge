import { GenerateRentRevisionDocument } from '../use-cases/GenerateRentRevisionDocument'
import { GenerateDemandLetter } from '../use-cases/GenerateDemandLetter'
import { GenerateBirthdayInvitation } from '../use-cases/GenerateBirthdayInvitation'

export class DocumentService {
  generateDocument(type: string, data: any) {
    switch (type) {
      case 'rent-revision':
        return new GenerateRentRevisionDocument().execute(data)
      case 'demand-letter':
        return new GenerateDemandLetter().execute(data)
      case 'birthday-invitation':
        return new GenerateBirthdayInvitation().execute(data)
      default:
        throw new Error('Type de document non supporté')
    }
  }
}
