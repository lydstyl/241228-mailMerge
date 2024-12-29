import { RentRevisionDocument } from '../entities/RentRevisionDocument'

export interface RentRevisionRepository {
  getRentRevisionData(): Promise<RentRevisionDocument>
}
