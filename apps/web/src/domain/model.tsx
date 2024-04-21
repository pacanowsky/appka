import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Theme as ThemeModel } from './theme/theme.model'

import { Survey as SurveyModel } from './survey/survey.model'

import { Participant as ParticipantModel } from './participant/participant.model'

import { Question as QuestionModel } from './question/question.model'

import { Option as OptionModel } from './option/option.model'

import { Response as ResponseModel } from './response/response.model'

import { Answer as AnswerModel } from './answer/answer.model'

import { Comment as CommentModel } from './comment/comment.model'

import { SurveyAccess as SurveyAccessModel } from './surveyAccess/surveyAccess.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Theme extends ThemeModel {}

  export class Survey extends SurveyModel {}

  export class Participant extends ParticipantModel {}

  export class Question extends QuestionModel {}

  export class Option extends OptionModel {}

  export class Response extends ResponseModel {}

  export class Answer extends AnswerModel {}

  export class Comment extends CommentModel {}

  export class SurveyAccess extends SurveyAccessModel {}
}
