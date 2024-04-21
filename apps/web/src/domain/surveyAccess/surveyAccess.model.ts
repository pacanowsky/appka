import { Survey } from '../survey'

import { Participant } from '../participant'

export class SurveyAccess {
  id: string

  surveyId: string

  survey?: Survey

  participantId: string

  participant?: Participant

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
