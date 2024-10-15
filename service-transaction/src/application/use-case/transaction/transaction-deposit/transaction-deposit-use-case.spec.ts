import { ITransactionRepository } from '../../../repositories/transaction.repository';
import { TransactionDepositUseCase } from './transaction-deposit.use-case';
import { TransactionDepositDTO } from './transaction-deposit.dto';
import { Transaction } from 'src/application/domain/transaction';
import { IBalanceService } from 'src/infra/gateways/service-balance.interface';

describe('TransactionDepositUseCase', () => {
  let transactionDepositUseCase: TransactionDepositUseCase;
  let mockTransactionRepo: jest.Mocked<ITransactionRepository>;
  let mockBalanceService: jest.Mocked<IBalanceService>;
  let transaction: Transaction;

  beforeEach(async () => {
    transaction = Transaction.create({ walletId: 'any_wallet_id', eventId: 'any_event_id' }, 'any_transaction_id');
    mockBalanceService = {
      getCurrentBalance: jest.fn(),
      saveCurrentBalance: jest.fn(),
    };
    mockTransactionRepo = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
    };

    transactionDepositUseCase = new TransactionDepositUseCase(mockTransactionRepo, mockBalanceService);
  });

  it('should execute deposit transaction successfully', async () => {
    const input: TransactionDepositDTO = {
      eventId: 'any_transaction_id',
      walletId: 'any_wallet_id',
      amount: 10,
    };

    mockTransactionRepo.create.mockResolvedValue(transaction);
    mockBalanceService.getCurrentBalance.mockResolvedValue(0);
    const result = await transactionDepositUseCase.execute(input);
    expect(result).toBeUndefined();
    expect(mockTransactionRepo.create).toHaveBeenCalledWith(expect.any(Transaction));
    expect(mockTransactionRepo.create).toHaveBeenCalledTimes(1);
  });
});
