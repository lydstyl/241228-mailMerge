import { DocumentService } from '../application/services/DocumentService'
import { DocumentData } from '../domain/entities/DocumentData'

// Exemple d'utilisation
const templatePath = 'src/infrastructure/templates/template.docx'
const outputPath = 'src/infrastructure/output/output.docx'

const ai = 138.61
const ni = 143.46
const lhc = 462.34
const nlhc = (ni * lhc) / ai
const charges = 42
const nouveauLoyer = nlhc + charges
const data: DocumentData = {
  BAILLEUR: `SCI LOGIS ANGE
259 rue de Wallers
59590 RAISMES`,
  CIVILITÉ: 'Monsieur',
  LOCATAIRE: `LEDUC
Appartement n°4
32 B rue Henri Durre
59590 RAISMES
`,
  DATE_COURRIER: '10/07/2025',
  TYPE_INDICE: 'Indice de Référence des Loyers',
  TRIMESTRE: 'premier',
  AI: ai.toString(),
  NI: ni.toString(),
  LHC: lhc.toString(),
  NLHC: nlhc.toFixed(2),
  CHARGES: charges.toString(),
  NOUVEAU_LOYER: nouveauLoyer.toString(),
  REGLEMENT: 'août 2024',
  SIGNATURE: 'Gabriel Brun, gérant de la SCI LOGIS ANGE'
}

const documentService = new DocumentService()
documentService
  .createDocument(templatePath, data, outputPath)
  .then(() => console.log('Document généré avec succès !'))
  .catch((err) =>
    console.error('Erreur lors de la génération du document :', err)
  )
