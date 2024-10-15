import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BalanceService } from './balance.service';

@Controller()
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @MessagePattern('save_balance')
  async handleSaveBalance(input: { walletId: string; value: number }) {
    await this.balanceService.saveBalance(input.walletId, input.value);
  }

  @MessagePattern('get_balance')
  async handleGetBalance(walletId: string) {
    const result = await this.balanceService.getBalance(walletId);
    return result;
  }
}
