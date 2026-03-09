import * as fs from 'fs'
import * as path from 'path'
import { IPatch, PatchType, TextRun } from 'docx'
import { BirthdayInvitationDocument } from '../../domain/entities/BirthdayInvitationDocument'
import { editDocx } from '../../infrastructure/utils/documentUtils'

const DocxMerger = require('docx-merger')

const templatePath = 'src/infrastructure/templates/birthday/template.docx'
const outputDir = 'src/infrastructure/output/birthday'
const consolidatedOutputPath = path.join(
  outputDir,
  'invitations-toutes.docx'
)

export class GenerateBirthdayInvitationConsolidated {
  async execute(dataList: BirthdayInvitationDocument[]) {
    console.log(
      `Génération d'un document consolidé avec ${dataList.length} invitations`
    )

    // Créer le dossier de sortie s'il n'existe pas
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Générer tous les documents individuels temporaires
    const tempFiles: string[] = []

    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i]
      console.log(`  - Génération de l'invitation pour ${data.FRIEND}`)

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
        // Sauvegarder le document temporaire
        const tempPath = path.join(outputDir, `temp-${i}-${data.FRIEND}.docx`)
        fs.writeFileSync(tempPath, updatedDoc)
        tempFiles.push(tempPath)
      }
    }

    // Fusionner tous les documents avec des sauts de page
    console.log(
      '\nFusion des documents avec des sauts de page entre chaque invitation...'
    )

    const docx = new DocxMerger(
      {},
      tempFiles.map((file) => fs.readFileSync(file))
    )

    await docx.save('nodebuffer', (data: Buffer) => {
      fs.writeFileSync(consolidatedOutputPath, data)
      console.log(`\nDocument consolidé généré : ${consolidatedOutputPath}`)
    })

    // Supprimer les fichiers temporaires
    console.log('\nNettoyage des fichiers temporaires...')
    for (const tempFile of tempFiles) {
      fs.unlinkSync(tempFile)
    }

    console.log('Terminé !')
  }
}
