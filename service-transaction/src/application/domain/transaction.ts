import { Entity } from '../entity';
import { TransactionCreatedHandler } from '../use-case/transaction/transaction-deposited.handler';
import { TransactionCompletedEvent } from './events/transaction-completed-event';

export enum TransactionStatusEnum {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELED = 'CANCELED',
}

export enum TransactionTypeEnum {
  Deposit = 'DEPOSIT',
  Withdrawal = 'WITHDRAWAL',
  Purchase = 'PURCHASE',
  Refund = 'REFUND',
  Reversal = 'REVERSAL',
}

interface TransactionProps {
  walletId: string;
  eventId: string;
  type?: TransactionTypeEnum;
  amount?: number;
  afterBalance?: number;
  status?: TransactionStatusEnum;
  failingReason?: string;
  externalReference?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Transaction extends Entity<TransactionProps> {
  get walletId(): string {
    return this.props.walletId;
  }

  get eventId(): string {
    return this.props.eventId;
  }

  get type(): TransactionTypeEnum {
    return this.props.type;
  }

  get amount(): number | undefined {
    return this.props.amount;
  }

  get afterBalance(): number | undefined {
    return this.props.afterBalance;
  }

  get status(): TransactionStatusEnum {
    return this.props.status;
  }

  get externalReference(): string | undefined {
    return this.props.externalReference;
  }

  get failingReason(): string | undefined {
    return this.props.failingReason;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  private constructor(props: TransactionProps, id?: string) {
    super(props, id);
  }

  public deposit(value: number, currentBalance: number): void {
    this.props.type = TransactionTypeEnum.Deposit;
    this.props.amount = value;
    if (currentBalance && value < 0.01) {
      this.props.afterBalance = currentBalance;
      this.failedTransaction('A valid amount must be deposited.');
    }
    this.props.afterBalance = currentBalance + value;
    this.successTransaction();
  }

  public withdrawal(value: number, currentBalance: number): void {
    this.props.type = TransactionTypeEnum.Withdrawal;
    this.props.amount = value;
    if (currentBalance && value < 0.01) {
      this.props.afterBalance = currentBalance;
      this.failedTransaction('Invalid amount for withdrawal.');
    }
    if (value > currentBalance) {
      this.props.afterBalance = currentBalance;
      this.failedTransaction('Your current balance is insufficient for this withdrawal.');
    }
    this.props.afterBalance = currentBalance - value;
    this.successTransaction();
  }

  public purchase(value: number, currentBalance: number, purchaseId: string): void {
    this.props.type = TransactionTypeEnum.Purchase;
    this.props.amount = value;
    this.props.externalReference = purchaseId;
    if (currentBalance && value < 0.01) {
      this.props.afterBalance = currentBalance;
      this.failedTransaction('Invalid purchase amount.');
    }
    if (value > currentBalance) {
      this.props.afterBalance = currentBalance;
      this.failedTransaction('Your current balance is insufficient for this purchase.');
    }
    this.props.afterBalance = currentBalance - value;
    this.successTransaction();
  }

  public refund(transaction: Transaction, currentBalance: number): void {
    if (transaction.status !== TransactionStatusEnum.COMPLETED) throw Error('Is not a valid transaction.');
    if (transaction.type !== TransactionTypeEnum.Purchase) throw Error('Not is posible refunded this transaction.');
    this.props.type = TransactionTypeEnum.Refund;
    this.props.amount = transaction.amount;
    this.props.externalReference = transaction.id;
    this.props.afterBalance = currentBalance + transaction.amount;
    this.successTransaction();
  }

  public reversal(transaction: Transaction, currentBalance: number): void {
    if (transaction.status !== TransactionStatusEnum.COMPLETED) throw Error('Is not a valid transaction.');
    if (transaction.type === TransactionTypeEnum.Reversal) throw Error('Not is posible reversal this transaction.');

    this.props.type = TransactionTypeEnum.Reversal;
    this.props.amount = transaction.amount;
    this.props.externalReference = transaction.id;
    if (transaction.type === TransactionTypeEnum.Purchase || transaction.type === TransactionTypeEnum.Withdrawal) {
      this.props.afterBalance = currentBalance + transaction.amount;
    }

    if (transaction.type === TransactionTypeEnum.Deposit || transaction.type === TransactionTypeEnum.Refund) {
      this.props.afterBalance = currentBalance - transaction.amount;
    }
    this.successTransaction();
  }

  public static create(props: TransactionProps, id?: string): Transaction {
    const transaction = new Transaction(
      {
        ...props,
        eventId: props.eventId,
        status: props.status ?? TransactionStatusEnum.PENDING,
        updatedAt: props.updatedAt ?? new Date(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return transaction;
  }

  private failedTransaction(messageError: string) {
    this.props.failingReason = messageError;
    this.props.status = TransactionStatusEnum.FAILED;
    throw Error(messageError);
  }

  private successTransaction() {
    this.props.status = TransactionStatusEnum.COMPLETED;
    new TransactionCreatedHandler().handle(
      new TransactionCompletedEvent(
        this.id,
        this.walletId,
        this.type,
        this.createdAt.toISOString(),
        this.amount,
        this.status,
        this.afterBalance,
        this.externalReference,
      ),
    );
  }
}
