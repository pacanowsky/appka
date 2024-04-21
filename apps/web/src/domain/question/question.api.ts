import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Question } from './question.model'

export class QuestionApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Question>,
  ): Promise<Question[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/questions${buildOptions}`)
  }

  static findOne(
    questionId: string,
    queryOptions?: ApiHelper.QueryOptions<Question>,
  ): Promise<Question> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/questions/${questionId}${buildOptions}`)
  }

  static createOne(values: Partial<Question>): Promise<Question> {
    return HttpService.api.post(`/v1/questions`, values)
  }

  static updateOne(
    questionId: string,
    values: Partial<Question>,
  ): Promise<Question> {
    return HttpService.api.patch(`/v1/questions/${questionId}`, values)
  }

  static deleteOne(questionId: string): Promise<void> {
    return HttpService.api.delete(`/v1/questions/${questionId}`)
  }

  static findManyBySurveyId(
    surveyId: string,
    queryOptions?: ApiHelper.QueryOptions<Question>,
  ): Promise<Question[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/surveys/survey/${surveyId}/questions${buildOptions}`,
    )
  }

  static createOneBySurveyId(
    surveyId: string,
    values: Partial<Question>,
  ): Promise<Question> {
    return HttpService.api.post(
      `/v1/surveys/survey/${surveyId}/questions`,
      values,
    )
  }
}
