import * as fs from 'fs'
import * as path from 'path'
import { IPatch, PatchType, TextRun } from 'docx'
import { BirthdayInvitationDocument } from '../../domain/entities/BirthdayInvitationDocument'
import { editDocx } from '../../infrastructure/utils/documentUtils'

const templatePath = 'src/infrastructure/templates/birthday/template.docx'
const outputDir = 'src/infrastructure/output/birthday'

export class GenerateBirthdayInvitation {
  async execute(data: BirthdayInvitationDocument) {
    console.log(
      `Génération de l'invitation d'anniversaire pour ${data.FRIEND}`
    )

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
      // Créer le dossier de sortie s'il n'existe pas
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      // Sauvegarder le document avec le nom de l'ami
      const outputPath = path.join(
        outputDir,
        `invitation-${data.FRIEND}.docx`
      )
      fs.writeFileSync(outputPath, updatedDoc)
      console.log(`Document généré : ${outputPath}`)
    }
  }
}
