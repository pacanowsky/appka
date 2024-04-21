import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class AnswerCreateDto {
  @IsString()
  @IsOptional()
  text?: string

  @IsString()
  @IsOptional()
  responseId?: string

  @IsString()
  @IsOptional()
  questionId?: string

  @IsString()
  @IsOptional()
  optionId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class AnswerUpdateDto {
  @IsString()
  @IsOptional()
  text?: string

  @IsString()
  @IsOptional()
  responseId?: string

  @IsString()
  @IsOptional()
  questionId?: string

  @IsString()
  @IsOptional()
  optionId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
