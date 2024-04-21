import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { OptionDomainFacade } from './option.domain.facade'
import { Option } from './option.model'

@Module({
  imports: [TypeOrmModule.forFeature([Option]), DatabaseHelperModule],
  providers: [OptionDomainFacade, OptionDomainFacade],
  exports: [OptionDomainFacade],
})
export class OptionDomainModule {}
