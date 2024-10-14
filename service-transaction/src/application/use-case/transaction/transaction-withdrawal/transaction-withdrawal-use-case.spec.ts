import { ITransactionRepository } from '../../../../repositories/transaction.repository';
import { Transaction, TransactionTypeEnum } from '../../../../domain/transaction';

import { IWalletService } from '../../../../../src/modules/transaction/services/wallet.service';
import { TransactionWithdrawalUseCase } from './transaction-withdrawal.use-case';
import { TransactionWithdrawalDTO } from './transaction-withdrawal.dto';

describe('MakeDepositUseCase', () => {
  let makeWithdrawalUseCase: TransactionWithdrawalUseCase;
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

    makeWithdrawalUseCase = new TransactionWithdrawalUseCase(mockTransactionRepo, mockWalletService);
  });

  it('should execute withdrawal transaction successfully', async () => {
    const input: TransactionWithdrawalDTO = {
      transactionId: 'any_transaction_id',
      walletId: 'any_wallet_id',
      amount: 10,
      operationType: TransactionTypeEnum.Withdrawal,
    };

    mockTransactionRepo.create.mockResolvedValue(transaction);
    mockWalletService.getCurrentBalance.mockRejectedValueOnce(0);

    // Act
    const sut = await makeWithdrawalUseCase.execute(input);

    // Assert
    expect(sut).toEqual(transaction);
    expect(mockTransactionRepo.create).toHaveBeenCalledWith(expect.any(Transaction));
    expect(mockTransactionRepo.create).toHaveBeenCalledTimes(1);
  });
});
