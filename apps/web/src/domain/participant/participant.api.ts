import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Participant } from './participant.model'

export class ParticipantApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Participant>,
  ): Promise<Participant[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/participants${buildOptions}`)
  }

  static findOne(
    participantId: string,
    queryOptions?: ApiHelper.QueryOptions<Participant>,
  ): Promise<Participant> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/participants/${participantId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Participant>): Promise<Participant> {
    return HttpService.api.post(`/v1/participants`, values)
  }

  static updateOne(
    participantId: string,
    values: Partial<Participant>,
  ): Promise<Participant> {
    return HttpService.api.patch(`/v1/participants/${participantId}`, values)
  }

  static deleteOne(participantId: string): Promise<void> {
    return HttpService.api.delete(`/v1/participants/${participantId}`)
  }

  static findManyBySurveyId(
    surveyId: string,
    queryOptions?: ApiHelper.QueryOptions<Participant>,
  ): Promise<Participant[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/surveys/survey/${surveyId}/participants${buildOptions}`,
    )
  }

  static createOneBySurveyId(
    surveyId: string,
    values: Partial<Participant>,
  ): Promise<Participant> {
    return HttpService.api.post(
      `/v1/surveys/survey/${surveyId}/participants`,
      values,
    )
  }
}
