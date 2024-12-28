import * as mammoth from 'mammoth'
import { DocumentData } from '../domain/DocumentData'
import { Document, Paragraph, TextRun, Packer } from 'docx'
import * as fs from 'fs'

async function readTemplate(templatePath: string): Promise<string> {
  const { value } = await mammoth.extractRawText({ path: templatePath })
  return value
}

export async function generateDocument(
  templatePath: string,
  data: DocumentData,
  outputPath: string
) {
  const template = await readTemplate(templatePath) // Lire le template avec mammoth

  let content = template
  for (const [key, value] of Object.entries(data)) {
    content = content.replace(new RegExp(`{{${key}}}`, 'g'), value)
  }

  content = sanitizeContent(content) // Nettoyer le contenu

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun(content)]
          })
        ]
      }
    ]
  })

  const buffer = await Packer.toBuffer(doc)
  fs.writeFileSync(outputPath, buffer)
}

function sanitizeContent(content: string): string {
  // Supprime les caractères non imprimables
  return content.replace(/[^\x20-\x7E]/g, '')
}
