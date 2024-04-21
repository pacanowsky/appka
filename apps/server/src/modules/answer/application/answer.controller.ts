import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { Answer, AnswerDomainFacade } from '@server/modules/answer/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { AnswerApplicationEvent } from './answer.application.event'
import { AnswerCreateDto, AnswerUpdateDto } from './answer.dto'

@Controller('/v1/answers')
export class AnswerController {
  constructor(
    private eventService: EventService,
    private answerDomainFacade: AnswerDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.answerDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: AnswerCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.answerDomainFacade.create(body)

    await this.eventService.emit<AnswerApplicationEvent.AnswerCreated.Payload>(
      AnswerApplicationEvent.AnswerCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:answerId')
  async findOne(@Param('answerId') answerId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.answerDomainFacade.findOneByIdOrFail(
      answerId,
      queryOptions,
    )

    return item
  }

  @Patch('/:answerId')
  async update(
    @Param('answerId') answerId: string,
    @Body() body: AnswerUpdateDto,
  ) {
    const item = await this.answerDomainFacade.findOneByIdOrFail(answerId)

    const itemUpdated = await this.answerDomainFacade.update(
      item,
      body as Partial<Answer>,
    )
    return itemUpdated
  }

  @Delete('/:answerId')
  async delete(@Param('answerId') answerId: string) {
    const item = await this.answerDomainFacade.findOneByIdOrFail(answerId)

    await this.answerDomainFacade.delete(item)

    return item
  }
}
