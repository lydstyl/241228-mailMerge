import { DocumentService } from '../application/services/DocumentService'
import { InMemoryRentRevisionRepository } from '../infrastructure/repositories/InMemoryRentRevisionRepository'

const documentService = new DocumentService()
const rentRevisionRepository = new InMemoryRentRevisionRepository()

// Récupérer les données de révision de loyer
async function main() {
  const rentRevisionData = await rentRevisionRepository.getRentRevisionData()

  // Génération du document de révision de loyer
  console.log('--- Test de génération de document de révision de loyer ---')
  documentService.generateDocument('rent-revision', rentRevisionData)
}

main().catch((err) => console.error("Erreur lors de l'exécution :", err))
