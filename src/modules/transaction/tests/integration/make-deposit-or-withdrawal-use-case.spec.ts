import { ITransactionRepository } from '../../repositories/transaction.repository';
import { Transaction, TransactionTypeEnum } from '../../domain/transaction';

import { MakeDepositOrWithdrawalUseCase } from '../../use-cases/make-deposit-or-withdrawal/make-depositor-withdrawal.use-case';
import { MakeDepositOrWithdrawalDTO } from '../../use-cases/make-deposit-or-withdrawal/make-deposit-or-withdrawal.dto';

describe('MakeDepositUseCase', () => {
  let makeDepositOrWithdrawalUseCase: MakeDepositOrWithdrawalUseCase;
  let mockTransactionRepo: jest.Mocked<ITransactionRepository>;
  let transaction: Transaction;

  beforeEach(async () => {
    transaction: Transaction.create({
      walletId: 'any_wallet_id',
    });

    mockTransactionRepo = {
      create: jest.fn(),
    };

    makeDepositOrWithdrawalUseCase = new MakeDepositOrWithdrawalUseCase(
      mockTransactionRepo,
    );
  });

  it('should execute deposit transaction successfully', async () => {
    const input: MakeDepositOrWithdrawalDTO = {
      walletId: 'any_wallet_id',
      amount: 10,
      operationType: TransactionTypeEnum.Deposit,
    };

    mockTransactionRepo.create.mockResolvedValue(transaction);

    // Act
    const result = await makeDepositOrWithdrawalUseCase.execute(input);

    // Assert
    expect(result).toEqual(transaction);
    expect(mockTransactionRepo.create).toHaveBeenCalledWith(
      expect.any(Transaction),
    );
    expect(mockTransactionRepo.create).toHaveBeenCalledTimes(1);
  });
});
