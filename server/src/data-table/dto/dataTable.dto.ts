//dataTable.dto.ts
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class DataTableDto {
  readonly numReq: number;

  @IsNotEmpty()
  @IsString()
  readonly dateTimeReq: string;

  @IsNotEmpty()
  @IsString()
  readonly clientFirm: string;

  @IsNotEmpty()
  @IsString()
  readonly fioTrans: string;

  @IsNotEmpty()
  @IsString()
  readonly phoneTrans: string;

  @IsOptional()
  @IsString()
  readonly comments: string;

  @IsNotEmpty()
  @IsString()
  readonly status: string;

  @IsNotEmpty()
  @IsString()
  readonly linkTrans: string;

  @IsOptional()
  @IsString()
  readonly startDate: string;

  @IsOptional()
  @IsString()
  readonly endDate: string;
}

export class UpdateDataTableDto {
  @IsOptional()
  @IsNumber()
  readonly numReq: number;

  @IsOptional()
  @IsString()
  readonly dateTimeReq: string;

  @IsOptional()
  @IsString()
  readonly clientFirm: string;

  @IsOptional()
  @IsString()
  readonly fioTrans: string;

  @IsOptional()
  @IsString()
  readonly phoneTrans: string;

  @IsOptional()
  @IsString()
  readonly comments: string;

  @IsOptional()
  @IsString()
  readonly status: string;

  @IsOptional()
  @IsString()
  readonly linkTrans: string;

  @IsOptional()
  @IsString()
  readonly startDate: string;

  @IsOptional()
  @IsString()
  readonly endDate: string;
}
