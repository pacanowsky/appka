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
import { Theme, ThemeDomainFacade } from '@server/modules/theme/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ThemeApplicationEvent } from './theme.application.event'
import { ThemeCreateDto, ThemeUpdateDto } from './theme.dto'

@Controller('/v1/themes')
export class ThemeController {
  constructor(
    private eventService: EventService,
    private themeDomainFacade: ThemeDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.themeDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ThemeCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.themeDomainFacade.create(body)

    await this.eventService.emit<ThemeApplicationEvent.ThemeCreated.Payload>(
      ThemeApplicationEvent.ThemeCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:themeId')
  async findOne(@Param('themeId') themeId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.themeDomainFacade.findOneByIdOrFail(
      themeId,
      queryOptions,
    )

    return item
  }

  @Patch('/:themeId')
  async update(
    @Param('themeId') themeId: string,
    @Body() body: ThemeUpdateDto,
  ) {
    const item = await this.themeDomainFacade.findOneByIdOrFail(themeId)

    const itemUpdated = await this.themeDomainFacade.update(
      item,
      body as Partial<Theme>,
    )
    return itemUpdated
  }

  @Delete('/:themeId')
  async delete(@Param('themeId') themeId: string) {
    const item = await this.themeDomainFacade.findOneByIdOrFail(themeId)

    await this.themeDomainFacade.delete(item)

    return item
  }
}
