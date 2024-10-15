import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class EventRequest {
  @ApiProperty()
  @IsUUID()
  eventId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  walletId: string;

  @ApiProperty()
  timestamp?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsString()
  source: string;

  @ApiProperty()
  @IsOptional()
  metadata: object;
}

export class EventResponse {
  @ApiProperty()
  status: string;

  @ApiProperty()
  message: string;
}
