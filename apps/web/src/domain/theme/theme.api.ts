import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Theme } from './theme.model'

export class ThemeApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Theme>,
  ): Promise<Theme[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/themes${buildOptions}`)
  }

  static findOne(
    themeId: string,
    queryOptions?: ApiHelper.QueryOptions<Theme>,
  ): Promise<Theme> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/themes/${themeId}${buildOptions}`)
  }

  static createOne(values: Partial<Theme>): Promise<Theme> {
    return HttpService.api.post(`/v1/themes`, values)
  }

  static updateOne(themeId: string, values: Partial<Theme>): Promise<Theme> {
    return HttpService.api.patch(`/v1/themes/${themeId}`, values)
  }

  static deleteOne(themeId: string): Promise<void> {
    return HttpService.api.delete(`/v1/themes/${themeId}`)
  }
}
