import { Response } from '../response'

export class Comment {
  id: string

  text?: string

  responseId: string

  response?: Response

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
