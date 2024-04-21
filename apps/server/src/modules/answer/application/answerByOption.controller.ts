import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { AnswerDomainFacade } from '@server/modules/answer/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { AnswerApplicationEvent } from './answer.application.event'
import { AnswerCreateDto } from './answer.dto'

import { OptionDomainFacade } from '../../option/domain'

@Controller('/v1/options')
export class AnswerByOptionController {
  constructor(
    private optionDomainFacade: OptionDomainFacade,

    private answerDomainFacade: AnswerDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/option/:optionId/answers')
  async findManyOptionId(
    @Param('optionId') optionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.optionDomainFacade.findOneByIdOrFail(optionId)

    const items = await this.answerDomainFacade.findManyByOption(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/option/:optionId/answers')
  async createByOptionId(
    @Param('optionId') optionId: string,
    @Body() body: AnswerCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, optionId }

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
