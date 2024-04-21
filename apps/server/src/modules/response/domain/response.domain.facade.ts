import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Response } from './response.model'

import { Survey } from '../../survey/domain'

import { Participant } from '../../participant/domain'

@Injectable()
export class ResponseDomainFacade {
  constructor(
    @InjectRepository(Response)
    private repository: Repository<Response>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Response>): Promise<Response> {
    return this.repository.save(values)
  }

  async update(item: Response, values: Partial<Response>): Promise<Response> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Response): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Response> = {},
  ): Promise<Response[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Response> = {},
  ): Promise<Response> {
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
    queryOptions: RequestHelper.QueryOptions<Response> = {},
  ): Promise<Response[]> {
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
    queryOptions: RequestHelper.QueryOptions<Response> = {},
  ): Promise<Response[]> {
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
