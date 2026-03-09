// import { DocumentService } from '../application/services/DocumentService'
// import { InMemoryRentRevisionRepository } from '../infrastructure/repositories/InMemoryMahieuRevisionRepository'
import { InMemoryBirthdayInvitationRepository } from '../infrastructure/repositories/InMemoryBirthdayInvitationRepository'
import { GenerateBirthdayInvitationConsolidated } from '../application/use-cases/GenerateBirthdayInvitationConsolidated'

// const documentService = new DocumentService()
// const rentRevisionRepository = new InMemoryRentRevisionRepository()
const birthdayInvitationRepository = new InMemoryBirthdayInvitationRepository()

// Récupérer les données de révision de loyer
async function main() {
  // === GÉNÉRATION DES INVITATIONS D'ANNIVERSAIRE CONSOLIDÉES ===
  console.log("=== Génération d'un document consolidé avec toutes les invitations ===\n")
  const invitations =
    await birthdayInvitationRepository.getBirthdayInvitations()

  const consolidatedGenerator = new GenerateBirthdayInvitationConsolidated()
  await consolidatedGenerator.execute(invitations)

  // === GÉNÉRATION DES INVITATIONS INDIVIDUELLES (commenté) ===
  // console.log("=== Génération des invitations d'anniversaire individuelles ===")
  // const invitations = await birthdayInvitationRepository.getBirthdayInvitations()
  // for (const invitation of invitations) {
  //   await documentService.generateDocument('birthday-invitation', invitation)
  // }
  // console.log(`\n${invitations.length} invitations générées avec succès !\n`)

  // === GÉNÉRATION DE RÉVISION DE LOYER (commenté) ===
  // const rentRevisionData = await rentRevisionRepository.getRentRevisionData()
  // console.log('--- Test de génération de document de révision de loyer ---')
  // documentService.generateDocument('rent-revision', rentRevisionData)
}

main().catch((err) => console.error("Erreur lors de l'exécution :", err))
