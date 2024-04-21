import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Response } from './response.model'

export class ResponseApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Response>,
  ): Promise<Response[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/responses${buildOptions}`)
  }

  static findOne(
    responseId: string,
    queryOptions?: ApiHelper.QueryOptions<Response>,
  ): Promise<Response> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/responses/${responseId}${buildOptions}`)
  }

  static createOne(values: Partial<Response>): Promise<Response> {
    return HttpService.api.post(`/v1/responses`, values)
  }

  static updateOne(
    responseId: string,
    values: Partial<Response>,
  ): Promise<Response> {
    return HttpService.api.patch(`/v1/responses/${responseId}`, values)
  }

  static deleteOne(responseId: string): Promise<void> {
    return HttpService.api.delete(`/v1/responses/${responseId}`)
  }

  static findManyBySurveyId(
    surveyId: string,
    queryOptions?: ApiHelper.QueryOptions<Response>,
  ): Promise<Response[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/surveys/survey/${surveyId}/responses${buildOptions}`,
    )
  }

  static createOneBySurveyId(
    surveyId: string,
    values: Partial<Response>,
  ): Promise<Response> {
    return HttpService.api.post(
      `/v1/surveys/survey/${surveyId}/responses`,
      values,
    )
  }

  static findManyByParticipantId(
    participantId: string,
    queryOptions?: ApiHelper.QueryOptions<Response>,
  ): Promise<Response[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/participants/participant/${participantId}/responses${buildOptions}`,
    )
  }

  static createOneByParticipantId(
    participantId: string,
    values: Partial<Response>,
  ): Promise<Response> {
    return HttpService.api.post(
      `/v1/participants/participant/${participantId}/responses`,
      values,
    )
  }
}
