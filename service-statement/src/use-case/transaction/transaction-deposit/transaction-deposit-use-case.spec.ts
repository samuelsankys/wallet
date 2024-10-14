import { ITransactionRepository } from '../../../repositories/transaction.repository';
import { Transaction } from '../../../domain/transaction';

import { IWalletService } from '../../../../../src/modules/transaction/services/wallet.service';
import { TransactionDepositUseCase } from './transaction-deposit.use-case';
import { TransactionDepositDTO } from './transaction-deposit.dto';

describe('MakeDepositUseCase', () => {
  let transactionDepositUseCase: TransactionDepositUseCase;
  let mockTransactionRepo: jest.Mocked<ITransactionRepository>;
  let mockWalletService: jest.Mocked<IWalletService>;
  let transaction: Transaction;

  beforeEach(async () => {
    transaction: Transaction.create({ walletId: 'any_wallet_id' }, 'any_transaction_id');
    mockWalletService = {
      getCurrentBalance: jest.fn(),
      saveCurrentBalance: jest.fn(),
    };
    mockTransactionRepo = {
      create: jest.fn(),
      findById: jest.fn(),
    };

    transactionDepositUseCase = new TransactionDepositUseCase(mockTransactionRepo, mockWalletService);
  });

  it('should execute deposit transaction successfully', async () => {
    const input: TransactionDepositDTO = {
      eventId: 'any_transaction_id',
      walletId: 'any_wallet_id',
      amount: 10,
    };

    mockTransactionRepo.create.mockResolvedValue(transaction);
    mockWalletService.getCurrentBalance.mockRejectedValueOnce(0);

    // Act
    const result = await transactionDepositUseCase.execute(input);

    // Assert
    expect(result).toEqual(transaction);
    expect(mockTransactionRepo.create).toHaveBeenCalledWith(expect.any(Transaction));
    expect(mockTransactionRepo.create).toHaveBeenCalledTimes(1);
  });
});
