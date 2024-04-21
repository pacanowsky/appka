import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Option } from './option.model'

import { Question } from '../../question/domain'

@Injectable()
export class OptionDomainFacade {
  constructor(
    @InjectRepository(Option)
    private repository: Repository<Option>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Option>): Promise<Option> {
    return this.repository.save(values)
  }

  async update(item: Option, values: Partial<Option>): Promise<Option> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Option): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Option> = {},
  ): Promise<Option[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Option> = {},
  ): Promise<Option> {
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

  async findManyByQuestion(
    item: Question,
    queryOptions: RequestHelper.QueryOptions<Option> = {},
  ): Promise<Option[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('question')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        questionId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
