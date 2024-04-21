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

import { Answer } from '../../../modules/answer/domain'

import { Comment } from '../../../modules/comment/domain'

@Entity()
export class Response {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  surveyId: string

  @ManyToOne(() => Survey, parent => parent.responses)
  @JoinColumn({ name: 'surveyId' })
  survey?: Survey

  @Column({})
  participantId: string

  @ManyToOne(() => Participant, parent => parent.responses)
  @JoinColumn({ name: 'participantId' })
  participant?: Participant

  @OneToMany(() => Answer, child => child.response)
  answers?: Answer[]

  @OneToMany(() => Comment, child => child.response)
  comments?: Comment[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
