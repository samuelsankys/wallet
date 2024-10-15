import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

enum OperationTypeEnum {
  Deposit = 'DEPOSIT',
  Withdrawal = 'WITHDRAWAL',
  Purchase = 'PURCHASE',
  Refund = 'REFUND',
  Reversal = 'REVERSAL',
}

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

  @ApiProperty({ enum: OperationTypeEnum })
  @IsNotEmpty()
  type: OperationTypeEnum;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
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
