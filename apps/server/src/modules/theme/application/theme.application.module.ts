import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ThemeDomainModule } from '../domain'
import { ThemeController } from './theme.controller'

@Module({
  imports: [AuthenticationDomainModule, ThemeDomainModule],
  controllers: [ThemeController],
  providers: [],
})
export class ThemeApplicationModule {}
