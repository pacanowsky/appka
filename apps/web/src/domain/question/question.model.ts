import { Survey } from '../survey'

import { Option } from '../option'

import { Answer } from '../answer'

export class Question {
  id: string

  text?: string

  type?: string

  conditionalLogic?: string

  surveyId: string

  survey?: Survey

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  options?: Option[]

  answers?: Answer[]
}
