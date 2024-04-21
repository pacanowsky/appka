import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { SurveyAccess } from './surveyAccess.model'

export class SurveyAccessApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<SurveyAccess>,
  ): Promise<SurveyAccess[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/surveyAccesss${buildOptions}`)
  }

  static findOne(
    surveyAccessId: string,
    queryOptions?: ApiHelper.QueryOptions<SurveyAccess>,
  ): Promise<SurveyAccess> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/surveyAccesss/${surveyAccessId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<SurveyAccess>): Promise<SurveyAccess> {
    return HttpService.api.post(`/v1/surveyAccesss`, values)
  }

  static updateOne(
    surveyAccessId: string,
    values: Partial<SurveyAccess>,
  ): Promise<SurveyAccess> {
    return HttpService.api.patch(`/v1/surveyAccesss/${surveyAccessId}`, values)
  }

  static deleteOne(surveyAccessId: string): Promise<void> {
    return HttpService.api.delete(`/v1/surveyAccesss/${surveyAccessId}`)
  }

  static findManyBySurveyId(
    surveyId: string,
    queryOptions?: ApiHelper.QueryOptions<SurveyAccess>,
  ): Promise<SurveyAccess[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/surveys/survey/${surveyId}/surveyAccesss${buildOptions}`,
    )
  }

  static createOneBySurveyId(
    surveyId: string,
    values: Partial<SurveyAccess>,
  ): Promise<SurveyAccess> {
    return HttpService.api.post(
      `/v1/surveys/survey/${surveyId}/surveyAccesss`,
      values,
    )
  }

  static findManyByParticipantId(
    participantId: string,
    queryOptions?: ApiHelper.QueryOptions<SurveyAccess>,
  ): Promise<SurveyAccess[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/participants/participant/${participantId}/surveyAccesss${buildOptions}`,
    )
  }

  static createOneByParticipantId(
    participantId: string,
    values: Partial<SurveyAccess>,
  ): Promise<SurveyAccess> {
    return HttpService.api.post(
      `/v1/participants/participant/${participantId}/surveyAccesss`,
      values,
    )
  }
}
