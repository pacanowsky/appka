import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ResponseCreateDto {
  @IsString()
  @IsOptional()
  surveyId?: string

  @IsString()
  @IsOptional()
  participantId?: string

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

export class ResponseUpdateDto {
  @IsString()
  @IsOptional()
  surveyId?: string

  @IsString()
  @IsOptional()
  participantId?: string

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
