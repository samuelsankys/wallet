import { Statement } from 'src/entity/statement';

export abstract class IStatementDAO {
  abstract save(statement: Statement): Promise<void>;
  abstract find(walletId: string): Promise<Statement[]>;
}
