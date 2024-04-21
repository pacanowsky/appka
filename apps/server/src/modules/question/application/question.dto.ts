import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class QuestionCreateDto {
  @IsString()
  @IsOptional()
  text?: string

  @IsString()
  @IsOptional()
  type?: string

  @IsString()
  @IsOptional()
  conditionalLogic?: string

  @IsString()
  @IsOptional()
  surveyId?: string

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

export class QuestionUpdateDto {
  @IsString()
  @IsOptional()
  text?: string

  @IsString()
  @IsOptional()
  type?: string

  @IsString()
  @IsOptional()
  conditionalLogic?: string

  @IsString()
  @IsOptional()
  surveyId?: string

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
