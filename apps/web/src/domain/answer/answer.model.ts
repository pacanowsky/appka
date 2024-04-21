import { Response } from '../response'

import { Question } from '../question'

import { Option } from '../option'

export class Answer {
  id: string

  text?: string

  responseId: string

  response?: Response

  questionId: string

  question?: Question

  optionId?: string

  option?: Option

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
