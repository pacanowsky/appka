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
import { Question, QuestionDomainFacade } from '@server/modules/question/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { QuestionApplicationEvent } from './question.application.event'
import { QuestionCreateDto, QuestionUpdateDto } from './question.dto'

@Controller('/v1/questions')
export class QuestionController {
  constructor(
    private eventService: EventService,
    private questionDomainFacade: QuestionDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.questionDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: QuestionCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.questionDomainFacade.create(body)

    await this.eventService.emit<QuestionApplicationEvent.QuestionCreated.Payload>(
      QuestionApplicationEvent.QuestionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:questionId')
  async findOne(
    @Param('questionId') questionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.questionDomainFacade.findOneByIdOrFail(
      questionId,
      queryOptions,
    )

    return item
  }

  @Patch('/:questionId')
  async update(
    @Param('questionId') questionId: string,
    @Body() body: QuestionUpdateDto,
  ) {
    const item = await this.questionDomainFacade.findOneByIdOrFail(questionId)

    const itemUpdated = await this.questionDomainFacade.update(
      item,
      body as Partial<Question>,
    )
    return itemUpdated
  }

  @Delete('/:questionId')
  async delete(@Param('questionId') questionId: string) {
    const item = await this.questionDomainFacade.findOneByIdOrFail(questionId)

    await this.questionDomainFacade.delete(item)

    return item
  }
}
