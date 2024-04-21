import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { SurveyDomainFacade } from '@server/modules/survey/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { SurveyApplicationEvent } from './survey.application.event'
import { SurveyCreateDto } from './survey.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class SurveyByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private surveyDomainFacade: SurveyDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/surveys')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.surveyDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/surveys')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: SurveyCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.surveyDomainFacade.create(valuesUpdated)

    await this.eventService.emit<SurveyApplicationEvent.SurveyCreated.Payload>(
      SurveyApplicationEvent.SurveyCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
