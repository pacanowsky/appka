import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Survey } from './survey.model'

export class SurveyApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Survey>,
  ): Promise<Survey[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/surveys${buildOptions}`)
  }

  static findOne(
    surveyId: string,
    queryOptions?: ApiHelper.QueryOptions<Survey>,
  ): Promise<Survey> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/surveys/${surveyId}${buildOptions}`)
  }

  static createOne(values: Partial<Survey>): Promise<Survey> {
    return HttpService.api.post(`/v1/surveys`, values)
  }

  static updateOne(surveyId: string, values: Partial<Survey>): Promise<Survey> {
    return HttpService.api.patch(`/v1/surveys/${surveyId}`, values)
  }

  static deleteOne(surveyId: string): Promise<void> {
    return HttpService.api.delete(`/v1/surveys/${surveyId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Survey>,
  ): Promise<Survey[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/surveys${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Survey>,
  ): Promise<Survey> {
    return HttpService.api.post(`/v1/users/user/${userId}/surveys`, values)
  }

  static findManyByThemeId(
    themeId: string,
    queryOptions?: ApiHelper.QueryOptions<Survey>,
  ): Promise<Survey[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/themes/theme/${themeId}/surveys${buildOptions}`,
    )
  }

  static createOneByThemeId(
    themeId: string,
    values: Partial<Survey>,
  ): Promise<Survey> {
    return HttpService.api.post(`/v1/themes/theme/${themeId}/surveys`, values)
  }
}
