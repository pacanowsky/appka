import { Question } from '../question'

import { Answer } from '../answer'

export class Option {
  id: string

  text?: string

  questionId: string

  question?: Question

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  answers?: Answer[]
}
