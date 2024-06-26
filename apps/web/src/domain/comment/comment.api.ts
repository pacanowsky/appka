import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Comment } from './comment.model'

export class CommentApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Comment>,
  ): Promise<Comment[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/comments${buildOptions}`)
  }

  static findOne(
    commentId: string,
    queryOptions?: ApiHelper.QueryOptions<Comment>,
  ): Promise<Comment> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/comments/${commentId}${buildOptions}`)
  }

  static createOne(values: Partial<Comment>): Promise<Comment> {
    return HttpService.api.post(`/v1/comments`, values)
  }

  static updateOne(
    commentId: string,
    values: Partial<Comment>,
  ): Promise<Comment> {
    return HttpService.api.patch(`/v1/comments/${commentId}`, values)
  }

  static deleteOne(commentId: string): Promise<void> {
    return HttpService.api.delete(`/v1/comments/${commentId}`)
  }

  static findManyByResponseId(
    responseId: string,
    queryOptions?: ApiHelper.QueryOptions<Comment>,
  ): Promise<Comment[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/responses/response/${responseId}/comments${buildOptions}`,
    )
  }

  static createOneByResponseId(
    responseId: string,
    values: Partial<Comment>,
  ): Promise<Comment> {
    return HttpService.api.post(
      `/v1/responses/response/${responseId}/comments`,
      values,
    )
  }
}
