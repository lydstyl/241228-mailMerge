import { DocumentService } from './application/DocumentService'
import { DocumentData } from './domain/DocumentData'

// Exemple d'utilisation
const templatePath = 'src/templates/template.docx'
const outputPath = 'src/data/output.docx'
const data: DocumentData = {
  BAILLEUR: 'John Doe',
  date: '2024-12-28'
}

const documentService = new DocumentService()
documentService
  .createDocument(templatePath, data, outputPath)
  .then(() => console.log('Document généré avec succès !'))
  .catch((err) =>
    console.error('Erreur lors de la génération du document :', err)
  )
