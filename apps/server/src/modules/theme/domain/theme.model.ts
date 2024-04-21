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

@Entity()
export class Theme {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  color?: string

  @Column({ nullable: true })
  font?: string

  @OneToMany(() => Survey, child => child.theme)
  surveys?: Survey[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
