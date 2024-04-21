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

import { Survey } from '../../../modules/survey/domain'

import { Response } from '../../../modules/response/domain'

import { SurveyAccess } from '../../../modules/surveyAccess/domain'

@Entity()
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  uniqueLink?: string

  @Column({})
  surveyId: string

  @ManyToOne(() => Survey, parent => parent.participants)
  @JoinColumn({ name: 'surveyId' })
  survey?: Survey

  @OneToMany(() => Response, child => child.participant)
  responses?: Response[]

  @OneToMany(() => SurveyAccess, child => child.participant)
  surveyAccesss?: SurveyAccess[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
