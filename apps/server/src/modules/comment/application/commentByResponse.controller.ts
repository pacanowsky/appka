import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { CommentDomainFacade } from '@server/modules/comment/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { CommentApplicationEvent } from './comment.application.event'
import { CommentCreateDto } from './comment.dto'

import { ResponseDomainFacade } from '../../response/domain'

@Controller('/v1/responses')
export class CommentByResponseController {
  constructor(
    private responseDomainFacade: ResponseDomainFacade,

    private commentDomainFacade: CommentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/response/:responseId/comments')
  async findManyResponseId(
    @Param('responseId') responseId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.responseDomainFacade.findOneByIdOrFail(responseId)

    const items = await this.commentDomainFacade.findManyByResponse(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/response/:responseId/comments')
  async createByResponseId(
    @Param('responseId') responseId: string,
    @Body() body: CommentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, responseId }

    const item = await this.commentDomainFacade.create(valuesUpdated)

    await this.eventService.emit<CommentApplicationEvent.CommentCreated.Payload>(
      CommentApplicationEvent.CommentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
