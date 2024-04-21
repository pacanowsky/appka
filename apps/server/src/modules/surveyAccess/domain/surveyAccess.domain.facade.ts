import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { SurveyAccess } from './surveyAccess.model'

import { Survey } from '../../survey/domain'

import { Participant } from '../../participant/domain'

@Injectable()
export class SurveyAccessDomainFacade {
  constructor(
    @InjectRepository(SurveyAccess)
    private repository: Repository<SurveyAccess>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<SurveyAccess>): Promise<SurveyAccess> {
    return this.repository.save(values)
  }

  async update(
    item: SurveyAccess,
    values: Partial<SurveyAccess>,
  ): Promise<SurveyAccess> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: SurveyAccess): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<SurveyAccess> = {},
  ): Promise<SurveyAccess[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<SurveyAccess> = {},
  ): Promise<SurveyAccess> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyBySurvey(
    item: Survey,
    queryOptions: RequestHelper.QueryOptions<SurveyAccess> = {},
  ): Promise<SurveyAccess[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('survey')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        surveyId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByParticipant(
    item: Participant,
    queryOptions: RequestHelper.QueryOptions<SurveyAccess> = {},
  ): Promise<SurveyAccess[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('participant')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        participantId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
