import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { OptionDomainFacade } from '@server/modules/option/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { OptionApplicationEvent } from './option.application.event'
import { OptionCreateDto } from './option.dto'

import { QuestionDomainFacade } from '../../question/domain'

@Controller('/v1/questions')
export class OptionByQuestionController {
  constructor(
    private questionDomainFacade: QuestionDomainFacade,

    private optionDomainFacade: OptionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/question/:questionId/options')
  async findManyQuestionId(
    @Param('questionId') questionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.questionDomainFacade.findOneByIdOrFail(questionId)

    const items = await this.optionDomainFacade.findManyByQuestion(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/question/:questionId/options')
  async createByQuestionId(
    @Param('questionId') questionId: string,
    @Body() body: OptionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, questionId }

    const item = await this.optionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<OptionApplicationEvent.OptionCreated.Payload>(
      OptionApplicationEvent.OptionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
