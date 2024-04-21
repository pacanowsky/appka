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
import { Option, OptionDomainFacade } from '@server/modules/option/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { OptionApplicationEvent } from './option.application.event'
import { OptionCreateDto, OptionUpdateDto } from './option.dto'

@Controller('/v1/options')
export class OptionController {
  constructor(
    private eventService: EventService,
    private optionDomainFacade: OptionDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.optionDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: OptionCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.optionDomainFacade.create(body)

    await this.eventService.emit<OptionApplicationEvent.OptionCreated.Payload>(
      OptionApplicationEvent.OptionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:optionId')
  async findOne(@Param('optionId') optionId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.optionDomainFacade.findOneByIdOrFail(
      optionId,
      queryOptions,
    )

    return item
  }

  @Patch('/:optionId')
  async update(
    @Param('optionId') optionId: string,
    @Body() body: OptionUpdateDto,
  ) {
    const item = await this.optionDomainFacade.findOneByIdOrFail(optionId)

    const itemUpdated = await this.optionDomainFacade.update(
      item,
      body as Partial<Option>,
    )
    return itemUpdated
  }

  @Delete('/:optionId')
  async delete(@Param('optionId') optionId: string) {
    const item = await this.optionDomainFacade.findOneByIdOrFail(optionId)

    await this.optionDomainFacade.delete(item)

    return item
  }
}
