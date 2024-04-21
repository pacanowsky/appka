import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Question } from './question.model'

import { Survey } from '../../survey/domain'

@Injectable()
export class QuestionDomainFacade {
  constructor(
    @InjectRepository(Question)
    private repository: Repository<Question>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Question>): Promise<Question> {
    return this.repository.save(values)
  }

  async update(item: Question, values: Partial<Question>): Promise<Question> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Question): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Question> = {},
  ): Promise<Question[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Question> = {},
  ): Promise<Question> {
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
    queryOptions: RequestHelper.QueryOptions<Question> = {},
  ): Promise<Question[]> {
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
