import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Option } from './option.model'

export class OptionApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Option>,
  ): Promise<Option[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/options${buildOptions}`)
  }

  static findOne(
    optionId: string,
    queryOptions?: ApiHelper.QueryOptions<Option>,
  ): Promise<Option> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/options/${optionId}${buildOptions}`)
  }

  static createOne(values: Partial<Option>): Promise<Option> {
    return HttpService.api.post(`/v1/options`, values)
  }

  static updateOne(optionId: string, values: Partial<Option>): Promise<Option> {
    return HttpService.api.patch(`/v1/options/${optionId}`, values)
  }

  static deleteOne(optionId: string): Promise<void> {
    return HttpService.api.delete(`/v1/options/${optionId}`)
  }

  static findManyByQuestionId(
    questionId: string,
    queryOptions?: ApiHelper.QueryOptions<Option>,
  ): Promise<Option[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/questions/question/${questionId}/options${buildOptions}`,
    )
  }

  static createOneByQuestionId(
    questionId: string,
    values: Partial<Option>,
  ): Promise<Option> {
    return HttpService.api.post(
      `/v1/questions/question/${questionId}/options`,
      values,
    )
  }
}
