import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { AnswerDomainFacade } from '@server/modules/answer/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { AnswerApplicationEvent } from './answer.application.event'
import { AnswerCreateDto } from './answer.dto'

import { QuestionDomainFacade } from '../../question/domain'

@Controller('/v1/questions')
export class AnswerByQuestionController {
  constructor(
    private questionDomainFacade: QuestionDomainFacade,

    private answerDomainFacade: AnswerDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/question/:questionId/answers')
  async findManyQuestionId(
    @Param('questionId') questionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.questionDomainFacade.findOneByIdOrFail(questionId)

    const items = await this.answerDomainFacade.findManyByQuestion(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/question/:questionId/answers')
  async createByQuestionId(
    @Param('questionId') questionId: string,
    @Body() body: AnswerCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, questionId }

    const item = await this.answerDomainFacade.create(valuesUpdated)

    await this.eventService.emit<AnswerApplicationEvent.AnswerCreated.Payload>(
      AnswerApplicationEvent.AnswerCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
