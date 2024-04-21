import { Survey } from '../survey'

import { Participant } from '../participant'

import { Answer } from '../answer'

import { Comment } from '../comment'

export class Response {
  id: string

  surveyId: string

  survey?: Survey

  participantId: string

  participant?: Participant

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  answers?: Answer[]

  comments?: Comment[]
}
