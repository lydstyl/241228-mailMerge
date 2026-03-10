import { BirthdayInvitationRepository } from '../../domain/repositories/BirthdayInvitationRepository'
import { BirthdayInvitationDocument } from '../../domain/entities/BirthdayInvitationDocument'

export class InMemoryLouisBirthdayInvitationRepository implements BirthdayInvitationRepository {
  async getBirthdayInvitations(): Promise<BirthdayInvitationDocument[]> {
    const friends = [
      'Ulysse',
      'Adam',
      'Liam',
      'Augustin',
      'Nasim',
      'André',
      'Mathias',
      'Iliès',
      'Aaron',
      'Tiago'
    ]

    const commonData = {
      FIRST_NAME: 'Louis',
      LAST_NAME: 'B.',
      LETTER_DATE: '10 mars 2026',
      DATE: 'samedi 18 avril de 14h à 18h'
    }

    return friends.map((friend) => ({
      ...commonData,
      FRIEND: friend
    }))
  }
}
