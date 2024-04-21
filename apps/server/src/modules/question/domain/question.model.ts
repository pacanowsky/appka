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

import { Option } from '../../../modules/option/domain'

import { Answer } from '../../../modules/answer/domain'

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  text?: string

  @Column({ nullable: true })
  type?: string

  @Column({ nullable: true })
  conditionalLogic?: string

  @Column({})
  surveyId: string

  @ManyToOne(() => Survey, parent => parent.questions)
  @JoinColumn({ name: 'surveyId' })
  survey?: Survey

  @OneToMany(() => Option, child => child.question)
  options?: Option[]

  @OneToMany(() => Answer, child => child.question)
  answers?: Answer[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
