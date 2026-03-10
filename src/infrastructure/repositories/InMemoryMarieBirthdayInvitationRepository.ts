import { BirthdayInvitationRepository } from '../../domain/repositories/BirthdayInvitationRepository'
import { BirthdayInvitationDocument } from '../../domain/entities/BirthdayInvitationDocument'

export class InMemoryMarieBirthdayInvitationRepository implements BirthdayInvitationRepository {
  async getBirthdayInvitations(): Promise<BirthdayInvitationDocument[]> {
    const friends = [
      'Sélène'
      // Ajouter d'autres amies ici plus tard
    ]

    const commonData = {
      FIRST_NAME: 'Marie',
      LAST_NAME: 'B.',
      LETTER_DATE: '11 mars 2026',
      DATE: 'samedi 4 avril de 14h à 18h' // À ajuster selon la date réelle
    }

    return friends.map((friend) => ({
      ...commonData,
      FRIEND: friend
    }))
  }
}
