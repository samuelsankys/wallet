import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BalanceRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  walletId: string;
}

export class BalanceResponse {
  @ApiProperty()
  balance: number;
}
