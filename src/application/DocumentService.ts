// src/application/DocumentService.ts

import { DocumentData } from '../domain/DocumentData'
import { generateDocument } from '../use-cases/GenerateDocument'

export class DocumentService {
  async createDocument(
    templatePath: string,
    data: DocumentData,
    outputPath: string
  ) {
    await generateDocument(templatePath, data, outputPath)
  }
}
