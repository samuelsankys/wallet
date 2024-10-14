import { v4 as uuid } from 'uuid';
import { AggregateRoot } from '@nestjs/cqrs';

export abstract class Entity<T> extends AggregateRoot {
  protected readonly _id: string;
  public readonly props: T;

  get id() {
    return this._id;
  }

  constructor(props: T, id?: string) {
    super();
    this._id = id || uuid();
    this.props = props;
  }
}
