import * as fs from 'fs'
import { patchDocument, IPatch } from 'docx'

export const editDocx = async (
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
