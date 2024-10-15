import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class StatementRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  walletId: string;
}

export class Statement {
  @ApiProperty()
  id: string;

  @ApiProperty()
  transactionId: string;

  @ApiProperty()
  walletId: string;

  @ApiProperty()
  transactionType: string;

  @ApiProperty()
  transactionAt: Date;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  afterBalance: number;

  @ApiProperty()
  externalReference: string;
}

export class StatementResponse {
  @ApiProperty()
  balance: number;

  @ApiProperty({ type: [Statement] })
  statement: Statement[];
}
