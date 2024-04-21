import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ThemeDomainFacade } from './theme.domain.facade'
import { Theme } from './theme.model'

@Module({
  imports: [TypeOrmModule.forFeature([Theme]), DatabaseHelperModule],
  providers: [ThemeDomainFacade, ThemeDomainFacade],
  exports: [ThemeDomainFacade],
})
export class ThemeDomainModule {}
