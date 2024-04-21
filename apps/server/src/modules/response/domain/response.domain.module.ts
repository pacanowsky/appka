import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ResponseDomainFacade } from './response.domain.facade'
import { Response } from './response.model'

@Module({
  imports: [TypeOrmModule.forFeature([Response]), DatabaseHelperModule],
  providers: [ResponseDomainFacade, ResponseDomainFacade],
  exports: [ResponseDomainFacade],
})
export class ResponseDomainModule {}
