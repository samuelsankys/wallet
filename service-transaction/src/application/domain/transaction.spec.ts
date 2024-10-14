import { Transaction, TransactionStatusEnum, TransactionTypeEnum } from '../../../../service-statement/src/domain/transaction';

describe('Transaction Entity', () => {
  let transaction: Transaction;

  beforeEach(() => {
    jest.clearAllMocks();

    transaction = Transaction.create({
      walletId: 'any_id',
    });
  });

  it('should create a new transaction with default values', () => {
    const transactionProps = {
      walletId: 'any_id',
      type: TransactionTypeEnum.Deposit,
      amount: 100.0,
    };

    const transaction = Transaction.create(transactionProps);

    expect(transaction.walletId).toBe('any_id');
    expect(transaction.type).toBe(TransactionTypeEnum.Deposit);
    expect(transaction.amount).toBe(100.0);
    expect(transaction.status).toBe(TransactionStatusEnum.PENDING);
    expect(transaction.createdAt).toBeInstanceOf(Date);
    expect(transaction.updatedAt).toBeInstanceOf(Date);
    expect(transaction.afterBalance).toBeUndefined();
    expect(transaction.externalReference).toBeUndefined();
  });

  it('should throw an error if the transaction amount is invalid for deposit', () => {
    const currentBalance = 100;
    const amount = -10;

    expect(() => {
      transaction.deposit(amount, currentBalance);
    }).toThrow('A valid amount must be deposited.');
    expect(transaction.amount).toBe(amount);
    expect(transaction.afterBalance).toBe(currentBalance);
    expect(transaction.type).toBe(TransactionTypeEnum.Deposit);
    expect(transaction.status).toBe(TransactionStatusEnum.FAILED);
  });

  it('should make deposit success', () => {
    const currentBalance = 100;
    const amount = 10;

    transaction.deposit(amount, currentBalance);

    expect(transaction.amount).toBe(amount);
    expect(transaction.afterBalance).toBe(currentBalance + amount);
    expect(transaction.type).toBe(TransactionTypeEnum.Deposit);
    expect(transaction.status).toBe(TransactionStatusEnum.COMPLETED);
  });

  it('should throw an error if amount is negative for withdrawal', () => {
    const currentBalance = 100;
    const amount = -10;

    expect(() => {
      transaction.withdrawal(amount, currentBalance);
    }).toThrow('Invalid amount for withdrawal.');
    expect(transaction.amount).toBe(amount);
    expect(transaction.afterBalance).toBe(currentBalance);
    expect(transaction.type).toBe(TransactionTypeEnum.Withdrawal);
    expect(transaction.status).toBe(TransactionStatusEnum.FAILED);
  });

  it('should throw an error if amount greater than the balance for withdrawal', () => {
    const currentBalance = 100;
    const amount = 200;

    expect(() => {
      transaction.withdrawal(amount, currentBalance);
    }).toThrow('Your current balance is insufficient for this withdrawal.');
    expect(transaction.amount).toBe(amount);
    expect(transaction.afterBalance).toBe(currentBalance);
    expect(transaction.type).toBe(TransactionTypeEnum.Withdrawal);
    expect(transaction.status).toBe(TransactionStatusEnum.FAILED);
  });

  it('should make withdrawal success ', () => {
    const currentBalance = 100;
    const amount = 10;

    transaction.withdrawal(amount, currentBalance);

    expect(transaction.amount).toBe(amount);
    expect(transaction.afterBalance).toBe(90);
    expect(transaction.type).toBe(TransactionTypeEnum.Withdrawal);
    expect(transaction.status).toBe(TransactionStatusEnum.COMPLETED);
  });

  it('should throw an error if amount is negative for purchase', () => {
    const currentBalance = 100;
    const amount = -10;
    const purchaseId = 'any_purchase_id';

    expect(() => {
      transaction.purchase(amount, currentBalance, purchaseId);
    }).toThrow('Invalid purchase amount.');
    expect(transaction.amount).toBe(amount);
    expect(transaction.afterBalance).toBe(currentBalance);
    expect(transaction.externalReference).toBe(purchaseId);
    expect(transaction.type).toBe(TransactionTypeEnum.Purchase);
    expect(transaction.status).toBe(TransactionStatusEnum.FAILED);
  });

  it('should throw an error if amount greater than the balance for purchase', () => {
    const currentBalance = 100;
    const amount = 200;
    const purchaseId = 'any_purchase_id';

    expect(() => {
      transaction.purchase(amount, currentBalance, purchaseId);
    }).toThrow('Your current balance is insufficient for this purchase.');
    expect(transaction.amount).toBe(amount);
    expect(transaction.afterBalance).toBe(currentBalance);
    expect(transaction.externalReference).toBe(purchaseId);
    expect(transaction.type).toBe(TransactionTypeEnum.Purchase);
    expect(transaction.status).toBe(TransactionStatusEnum.FAILED);
  });

  it('should make purchase success ', () => {
    const currentBalance = 100;
    const amount = 10;
    const purchaseId = 'any_purchase_id';

    transaction.purchase(amount, currentBalance, purchaseId);

    expect(transaction.amount).toBe(amount);
    expect(transaction.afterBalance).toBe(90);
    expect(transaction.externalReference).toBe(purchaseId);
    expect(transaction.type).toBe(TransactionTypeEnum.Purchase);
    expect(transaction.status).toBe(TransactionStatusEnum.COMPLETED);
  });

  it('should throw an error if not is complete transaction', () => {
    const currentBalance = 100;
    const notCompletedTransaction = Transaction.create({
      walletId: 'any_another_id',
      amount: 10,
      status: TransactionStatusEnum.FAILED,
      type: TransactionTypeEnum.Purchase,
    });

    expect(() => {
      transaction.refund(notCompletedTransaction, currentBalance);
    }).toThrow('Is not a valid transaction.');
  });

  it('should throw an error if transaction type is different purchase refund', () => {
    const currentBalance = 100;
    const notCompletedTransaction = Transaction.create({
      walletId: 'any_another_id',
      amount: 10,
      status: TransactionStatusEnum.COMPLETED,
      type: TransactionTypeEnum.Refund,
    });

    expect(() => {
      transaction.refund(notCompletedTransaction, currentBalance);
    }).toThrow('Not is posible refunded this transaction.');
  });

  it('should make refund success', () => {
    const completedTransaction = Transaction.create({
      walletId: 'any_another_id',
      amount: 10,
      status: TransactionStatusEnum.COMPLETED,
      type: TransactionTypeEnum.Purchase,
    });
    const currentBalance = 100;

    transaction.refund(completedTransaction, currentBalance);

    expect(transaction.amount).toBe(completedTransaction.amount);
    expect(transaction.afterBalance).toBe(completedTransaction.amount + currentBalance);
    expect(transaction.externalReference).toBe(completedTransaction.id);
    expect(transaction.type).toBe(TransactionTypeEnum.Refund);
    expect(transaction.status).toBe(TransactionStatusEnum.COMPLETED);
  });

  it('should throw an error if transaction already is reversal', () => {
    const currentBalance = 100;
    const notCompletedTransaction = Transaction.create({
      walletId: 'any_another_id',
      amount: 10,
      status: TransactionStatusEnum.COMPLETED,
      type: TransactionTypeEnum.Reversal,
    });

    expect(() => {
      transaction.reversal(notCompletedTransaction, currentBalance);
    }).toThrow('Not is posible reversal this transaction.');
  });

  it('should make reversal deposit success', () => {
    const completedTransaction = Transaction.create({
      walletId: 'any_another_id',
      amount: 10,
      status: TransactionStatusEnum.COMPLETED,
      type: TransactionTypeEnum.Deposit,
    });
    const currentBalance = 100;

    transaction.reversal(completedTransaction, currentBalance);

    expect(transaction.amount).toBe(completedTransaction.amount);
    expect(transaction.afterBalance).toBe(currentBalance - completedTransaction.amount);
    expect(transaction.externalReference).toBe(completedTransaction.id);
    expect(transaction.type).toBe(TransactionTypeEnum.Reversal);
    expect(transaction.status).toBe(TransactionStatusEnum.COMPLETED);
  });

  it('should make reversal purchase success', () => {
    const completedTransaction = Transaction.create({
      walletId: 'any_another_id',
      amount: 10,
      status: TransactionStatusEnum.COMPLETED,
      type: TransactionTypeEnum.Purchase,
    });
    const currentBalance = 100;

    transaction.reversal(completedTransaction, currentBalance);

    expect(transaction.amount).toBe(completedTransaction.amount);
    expect(transaction.afterBalance).toBe(currentBalance + completedTransaction.amount);
    expect(transaction.externalReference).toBe(completedTransaction.id);
    expect(transaction.type).toBe(TransactionTypeEnum.Reversal);
    expect(transaction.status).toBe(TransactionStatusEnum.COMPLETED);
  });

  it('should make reversal withdrawal success', () => {
    const completedTransaction = Transaction.create({
      walletId: 'any_another_id',
      amount: 10,
      status: TransactionStatusEnum.COMPLETED,
      type: TransactionTypeEnum.Withdrawal,
    });
    const currentBalance = 100;

    transaction.reversal(completedTransaction, currentBalance);

    expect(transaction.amount).toBe(completedTransaction.amount);
    expect(transaction.afterBalance).toBe(currentBalance + completedTransaction.amount);
    expect(transaction.externalReference).toBe(completedTransaction.id);
    expect(transaction.type).toBe(TransactionTypeEnum.Reversal);
    expect(transaction.status).toBe(TransactionStatusEnum.COMPLETED);
  });

  it('should make reversal Refund success', () => {
    const completedTransaction = Transaction.create({
      walletId: 'any_another_id',
      amount: 10,
      status: TransactionStatusEnum.COMPLETED,
      type: TransactionTypeEnum.Refund,
    });
    const currentBalance = 100;

    transaction.reversal(completedTransaction, currentBalance);

    expect(transaction.amount).toBe(completedTransaction.amount);
    expect(transaction.afterBalance).toBe(currentBalance - completedTransaction.amount);
    expect(transaction.externalReference).toBe(completedTransaction.id);
    expect(transaction.type).toBe(TransactionTypeEnum.Reversal);
    expect(transaction.status).toBe(TransactionStatusEnum.COMPLETED);
  });
});
