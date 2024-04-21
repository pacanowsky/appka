import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ThemeCreateDto {
  @IsString()
  @IsOptional()
  color?: string

  @IsString()
  @IsOptional()
  font?: string

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

export class ThemeUpdateDto {
  @IsString()
  @IsOptional()
  color?: string

  @IsString()
  @IsOptional()
  font?: string

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
