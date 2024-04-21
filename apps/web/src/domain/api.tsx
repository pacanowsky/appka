import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { ThemeApi } from './theme/theme.api'

import { SurveyApi } from './survey/survey.api'

import { ParticipantApi } from './participant/participant.api'

import { QuestionApi } from './question/question.api'

import { OptionApi } from './option/option.api'

import { ResponseApi } from './response/response.api'

import { AnswerApi } from './answer/answer.api'

import { CommentApi } from './comment/comment.api'

import { SurveyAccessApi } from './surveyAccess/surveyAccess.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Theme extends ThemeApi {}

  export class Survey extends SurveyApi {}

  export class Participant extends ParticipantApi {}

  export class Question extends QuestionApi {}

  export class Option extends OptionApi {}

  export class Response extends ResponseApi {}

  export class Answer extends AnswerApi {}

  export class Comment extends CommentApi {}

  export class SurveyAccess extends SurveyAccessApi {}
}
