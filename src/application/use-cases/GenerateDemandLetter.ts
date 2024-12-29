import * as fs from 'fs'
import { IPatch, PatchType, TextRun } from 'docx'
import { DemandLetterDocument } from '../../domain/entities/DemandLetterDocument'
import { editDocx } from '../../infrastructure/utils/documentUtils'

const templatePath = 'src/infrastructure/templates/demand-letter/template.docx'
const outputPath = 'src/infrastructure/output/output.docx'

export class GenerateDemandLetter {
  async execute(data: DemandLetterDocument) {
    // Logique pour générer une mise en demeure
    console.log('Génération de la mise en demeure avec les données :', data)
    // Ici, vous pouvez ajouter la logique pour utiliser le template et générer le document

    // Préparer les patches pour remplacer les tags
    const patches: { [key: string]: IPatch } = {}
    for (const [key, value] of Object.entries(data)) {
      patches[key] = {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(value)]
      }
    }

    // Appeler la fonction pour éditer le document
    const updatedDoc = await editDocx(templatePath, patches)
    if (updatedDoc) {
      fs.writeFileSync(outputPath, updatedDoc) // Enregistrer le document modifié
    }
  }
}
