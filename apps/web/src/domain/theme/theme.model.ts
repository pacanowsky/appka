import { Survey } from '../survey'

export class Theme {
  id: string

  color?: string

  font?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  surveys?: Survey[]
}
