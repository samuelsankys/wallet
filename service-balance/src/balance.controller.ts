import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BalanceService } from './balance.service';

@Controller()
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @MessagePattern('save_balance')
  async handleSaveBalance(payload: { walletId: string; value: number }) {
    await this.balanceService.saveBalance(payload.walletId, payload.value);
  }

  @MessagePattern('get_balance')
  async handleGetBalance(payload: { walletId: string }) {
    const result = await this.balanceService.getBalance(payload.walletId);
    return result;
  }
}
