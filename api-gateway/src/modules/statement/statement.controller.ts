import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { StatementService } from './statement.service';
import { StatementRequest, StatementResponse } from './statement.DTO';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Statement')
@Controller('statement')
export class StatementController {
  constructor(private readonly statementService: StatementService) {}

  @Get()
  @ApiOperation({ summary: 'Get current balance and statement' })
  @ApiResponse({ status: 200, type: StatementResponse })
  async execute(
    @Query(new ValidationPipe()) request: StatementRequest,
  ): Promise<StatementResponse> {
    try {
      const response = await this.statementService.execute(request.walletId);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
