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

import { Participant } from '../../../modules/participant/domain'

@Entity()
export class SurveyAccess {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  surveyId: string

  @ManyToOne(() => Survey, parent => parent.surveyAccesss)
  @JoinColumn({ name: 'surveyId' })
  survey?: Survey

  @Column({})
  participantId: string

  @ManyToOne(() => Participant, parent => parent.surveyAccesss)
  @JoinColumn({ name: 'participantId' })
  participant?: Participant

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
