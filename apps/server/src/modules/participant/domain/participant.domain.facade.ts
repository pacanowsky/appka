import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Participant } from './participant.model'

import { Survey } from '../../survey/domain'

@Injectable()
export class ParticipantDomainFacade {
  constructor(
    @InjectRepository(Participant)
    private repository: Repository<Participant>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Participant>): Promise<Participant> {
    return this.repository.save(values)
  }

  async update(
    item: Participant,
    values: Partial<Participant>,
  ): Promise<Participant> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Participant): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Participant> = {},
  ): Promise<Participant[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Participant> = {},
  ): Promise<Participant> {
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
    queryOptions: RequestHelper.QueryOptions<Participant> = {},
  ): Promise<Participant[]> {
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
}
