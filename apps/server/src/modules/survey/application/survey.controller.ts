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
import { Survey, SurveyDomainFacade } from '@server/modules/survey/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { SurveyApplicationEvent } from './survey.application.event'
import { SurveyCreateDto, SurveyUpdateDto } from './survey.dto'

@Controller('/v1/surveys')
export class SurveyController {
  constructor(
    private eventService: EventService,
    private surveyDomainFacade: SurveyDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.surveyDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: SurveyCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.surveyDomainFacade.create(body)

    await this.eventService.emit<SurveyApplicationEvent.SurveyCreated.Payload>(
      SurveyApplicationEvent.SurveyCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:surveyId')
  async findOne(@Param('surveyId') surveyId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.surveyDomainFacade.findOneByIdOrFail(
      surveyId,
      queryOptions,
    )

    return item
  }

  @Patch('/:surveyId')
  async update(
    @Param('surveyId') surveyId: string,
    @Body() body: SurveyUpdateDto,
  ) {
    const item = await this.surveyDomainFacade.findOneByIdOrFail(surveyId)

    const itemUpdated = await this.surveyDomainFacade.update(
      item,
      body as Partial<Survey>,
    )
    return itemUpdated
  }

  @Delete('/:surveyId')
  async delete(@Param('surveyId') surveyId: string) {
    const item = await this.surveyDomainFacade.findOneByIdOrFail(surveyId)

    await this.surveyDomainFacade.delete(item)

    return item
  }
}
