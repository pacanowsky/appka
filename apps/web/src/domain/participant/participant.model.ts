import { Survey } from '../survey'

import { Response } from '../response'

import { SurveyAccess } from '../surveyAccess'

export class Participant {
  id: string

  uniqueLink?: string

  surveyId: string

  survey?: Survey

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  responses?: Response[]

  surveyAccesss?: SurveyAccess[]
}
