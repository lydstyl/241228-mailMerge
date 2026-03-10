import { BirthdayInvitationRepository } from '../../domain/repositories/BirthdayInvitationRepository'
import { InMemoryMarieBirthdayInvitationRepository } from './InMemoryMarieBirthdayInvitationRepository'
import { InMemoryLouisBirthdayInvitationRepository } from './InMemoryLouisBirthdayInvitationRepository'

export type ChildName = 'marie' | 'louis'

export class BirthdayInvitationRepositoryFactory {
  static getRepository(child: ChildName): BirthdayInvitationRepository {
    switch (child) {
      case 'marie':
        return new InMemoryMarieBirthdayInvitationRepository()
      case 'louis':
        return new InMemoryLouisBirthdayInvitationRepository()
      default:
        throw new Error(`Repository non trouvé pour l'enfant: ${child}`)
    }
  }
}
