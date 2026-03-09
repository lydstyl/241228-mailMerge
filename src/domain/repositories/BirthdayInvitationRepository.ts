import { BirthdayInvitationDocument } from '../entities/BirthdayInvitationDocument'

export interface BirthdayInvitationRepository {
  getBirthdayInvitations(): Promise<BirthdayInvitationDocument[]>
}
