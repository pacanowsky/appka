import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { User } from '../../../modules/user/domain'

import { Theme } from '../../../modules/theme/domain'

import { Participant } from '../../../modules/participant/domain'

import { Question } from '../../../modules/question/domain'

import { Response } from '../../../modules/response/domain'

import { SurveyAccess } from '../../../modules/surveyAccess/domain'

@Entity()
export class Survey {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  title?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.surveys)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({ nullable: true })
  themeId?: string

  @ManyToOne(() => Theme, parent => parent.surveys)
  @JoinColumn({ name: 'themeId' })
  theme?: Theme

  @OneToMany(() => Participant, child => child.survey)
  participants?: Participant[]

  @OneToMany(() => Question, child => child.survey)
  questions?: Question[]

  @OneToMany(() => Response, child => child.survey)
  responses?: Response[]

  @OneToMany(() => SurveyAccess, child => child.survey)
  surveyAccesss?: SurveyAccess[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
