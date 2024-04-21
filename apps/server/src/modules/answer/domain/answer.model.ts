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

import { Response } from '../../../modules/response/domain'

import { Question } from '../../../modules/question/domain'

import { Option } from '../../../modules/option/domain'

@Entity()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  text?: string

  @Column({})
  responseId: string

  @ManyToOne(() => Response, parent => parent.answers)
  @JoinColumn({ name: 'responseId' })
  response?: Response

  @Column({})
  questionId: string

  @ManyToOne(() => Question, parent => parent.answers)
  @JoinColumn({ name: 'questionId' })
  question?: Question

  @Column({ nullable: true })
  optionId?: string

  @ManyToOne(() => Option, parent => parent.answers)
  @JoinColumn({ name: 'optionId' })
  option?: Option

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
