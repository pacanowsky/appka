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
import {
  SurveyAccess,
  SurveyAccessDomainFacade,
} from '@server/modules/surveyAccess/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { SurveyAccessApplicationEvent } from './surveyAccess.application.event'
import {
  SurveyAccessCreateDto,
  SurveyAccessUpdateDto,
} from './surveyAccess.dto'

@Controller('/v1/surveyAccesss')
export class SurveyAccessController {
  constructor(
    private eventService: EventService,
    private surveyAccessDomainFacade: SurveyAccessDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.surveyAccessDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: SurveyAccessCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.surveyAccessDomainFacade.create(body)

    await this.eventService.emit<SurveyAccessApplicationEvent.SurveyAccessCreated.Payload>(
      SurveyAccessApplicationEvent.SurveyAccessCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:surveyAccessId')
  async findOne(
    @Param('surveyAccessId') surveyAccessId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.surveyAccessDomainFacade.findOneByIdOrFail(
      surveyAccessId,
      queryOptions,
    )

    return item
  }

  @Patch('/:surveyAccessId')
  async update(
    @Param('surveyAccessId') surveyAccessId: string,
    @Body() body: SurveyAccessUpdateDto,
  ) {
    const item =
      await this.surveyAccessDomainFacade.findOneByIdOrFail(surveyAccessId)

    const itemUpdated = await this.surveyAccessDomainFacade.update(
      item,
      body as Partial<SurveyAccess>,
    )
    return itemUpdated
  }

  @Delete('/:surveyAccessId')
  async delete(@Param('surveyAccessId') surveyAccessId: string) {
    const item =
      await this.surveyAccessDomainFacade.findOneByIdOrFail(surveyAccessId)

    await this.surveyAccessDomainFacade.delete(item)

    return item
  }
}
