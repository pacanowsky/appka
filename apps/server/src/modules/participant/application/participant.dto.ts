import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ParticipantCreateDto {
  @IsString()
  @IsOptional()
  uniqueLink?: string

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

export class ParticipantUpdateDto {
  @IsString()
  @IsOptional()
  uniqueLink?: string

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
