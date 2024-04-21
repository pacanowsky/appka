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
import { Response, ResponseDomainFacade } from '@server/modules/response/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ResponseApplicationEvent } from './response.application.event'
import { ResponseCreateDto, ResponseUpdateDto } from './response.dto'

@Controller('/v1/responses')
export class ResponseController {
  constructor(
    private eventService: EventService,
    private responseDomainFacade: ResponseDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.responseDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ResponseCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.responseDomainFacade.create(body)

    await this.eventService.emit<ResponseApplicationEvent.ResponseCreated.Payload>(
      ResponseApplicationEvent.ResponseCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:responseId')
  async findOne(
    @Param('responseId') responseId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.responseDomainFacade.findOneByIdOrFail(
      responseId,
      queryOptions,
    )

    return item
  }

  @Patch('/:responseId')
  async update(
    @Param('responseId') responseId: string,
    @Body() body: ResponseUpdateDto,
  ) {
    const item = await this.responseDomainFacade.findOneByIdOrFail(responseId)

    const itemUpdated = await this.responseDomainFacade.update(
      item,
      body as Partial<Response>,
    )
    return itemUpdated
  }

  @Delete('/:responseId')
  async delete(@Param('responseId') responseId: string) {
    const item = await this.responseDomainFacade.findOneByIdOrFail(responseId)

    await this.responseDomainFacade.delete(item)

    return item
  }
}
