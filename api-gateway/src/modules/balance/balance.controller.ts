import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BalanceService } from './balance.service';
import { BalanceRequest, BalanceResponse } from './balance.DTO';

@ApiTags('Balance')
@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  @ApiOperation({ summary: 'Get current balance' })
  @ApiResponse({ status: 200, type: BalanceResponse })
  async execute(
    @Query(new ValidationPipe()) request: BalanceRequest,
  ): Promise<BalanceResponse> {
    try {
      const response = await this.balanceService.execute(request.walletId);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
