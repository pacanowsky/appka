import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CommentDomainModule } from '../domain'
import { CommentController } from './comment.controller'

import { ResponseDomainModule } from '../../../modules/response/domain'

import { CommentByResponseController } from './commentByResponse.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    CommentDomainModule,

    ResponseDomainModule,
  ],
  controllers: [CommentController, CommentByResponseController],
  providers: [],
})
export class CommentApplicationModule {}
