import { User } from '../user'

import { Theme } from '../theme'

import { Participant } from '../participant'

import { Question } from '../question'

import { Response } from '../response'

import { SurveyAccess } from '../surveyAccess'

export class Survey {
  id: string

  title?: string

  userId: string

  user?: User

  themeId?: string

  theme?: Theme

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  participants?: Participant[]

  questions?: Question[]

  responses?: Response[]

  surveyAccesss?: SurveyAccess[]
}
