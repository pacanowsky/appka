import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { QuestionDomainFacade } from '@server/modules/question/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { QuestionApplicationEvent } from './question.application.event'
import { QuestionCreateDto } from './question.dto'

import { SurveyDomainFacade } from '../../survey/domain'

@Controller('/v1/surveys')
export class QuestionBySurveyController {
  constructor(
    private surveyDomainFacade: SurveyDomainFacade,

    private questionDomainFacade: QuestionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/survey/:surveyId/questions')
  async findManySurveyId(
    @Param('surveyId') surveyId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.surveyDomainFacade.findOneByIdOrFail(surveyId)

    const items = await this.questionDomainFacade.findManyBySurvey(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/survey/:surveyId/questions')
  async createBySurveyId(
    @Param('surveyId') surveyId: string,
    @Body() body: QuestionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, surveyId }

    const item = await this.questionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<QuestionApplicationEvent.QuestionCreated.Payload>(
      QuestionApplicationEvent.QuestionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
