// import { DocumentService } from '../application/services/DocumentService'
// import { InMemoryRentRevisionRepository } from '../infrastructure/repositories/InMemoryMahieuRevisionRepository'
import { BirthdayInvitationRepositoryFactory, ChildName } from '../infrastructure/repositories/BirthdayInvitationRepositoryFactory'
import { GenerateBirthdayInvitationConsolidated } from '../application/use-cases/GenerateBirthdayInvitationConsolidated'

// const documentService = new DocumentService()
// const rentRevisionRepository = new InMemoryRentRevisionRepository()

// ===== CONFIGURATION =====
// Changer ici pour basculer entre 'marie' et 'louis'
const CHILD: ChildName = 'marie'
// =========================

const birthdayInvitationRepository = BirthdayInvitationRepositoryFactory.getRepository(CHILD)

async function main() {
  // === GÉNÉRATION DES INVITATIONS D'ANNIVERSAIRE CONSOLIDÉES ===
  console.log(`=== Génération des invitations d'anniversaire pour ${CHILD.toUpperCase()} ===\n`)
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
