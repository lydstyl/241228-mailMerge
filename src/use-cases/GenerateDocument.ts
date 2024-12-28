import * as fs from 'fs'
import { patchDocument, IPatch, PatchType, TextRun } from 'docx'
import { DocumentData } from '../domain/DocumentData'

const editDocx = async (
  templatePath: string,
  patches: { [key: string]: IPatch }
): Promise<Uint8Array | undefined> => {
  try {
    const doc = await patchDocument({
      outputType: 'uint8array',
      data: fs.readFileSync(templatePath), // Lire le template
      patches,
      keepOriginalStyles: true // Conserver les styles originaux
    })
    return doc
  } catch (error) {
    console.error(`Error: ${error}`)
  }
}

export async function generateDocument(
  templatePath: string,
  data: DocumentData,
  outputPath: string
) {
  // Préparer les patches pour remplacer les tags
  const patches: { [key: string]: IPatch } = {}
  for (const [key, value] of Object.entries(data)) {
    // const xxx = value.split('\n')
    // console.log('🚀 ~ xxx:', xxx)
    // const children = xxx.map((line) => new TextRun(line))

    patches[`${key}`] = {
      type: PatchType.PARAGRAPH,
      //   children: [new TextRun(value.replace(/\n/g, '^l'))]
      children: [new TextRun(value.replace(/\n/g, ''))]
    }
  }

  // Appeler la fonction pour éditer le document
  const updatedDoc = await editDocx(templatePath, patches)
  if (updatedDoc) {
    fs.writeFileSync(outputPath, updatedDoc) // Enregistrer le document modifié
  }
}
