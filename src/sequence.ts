import { Tab, Slot, None, type Insert } from './insert';

export type InsertsGenerator = (index: number) => Insert;

export function fixed(_n: number): Insert {
  return Tab;
}

export function flipflop(n: number): Insert {
  return n % 2 === 0 ? Tab : Slot;
}

export function twoAndTwo(n: number): Insert {
  return n % 4 < 2 ? Tab : Slot;
}

export function random(_: number): Insert {
  return Math.random() < 0.5 ? Tab : Slot;
}

export class InsertSequence {
  generator: InsertsGenerator;
  n: number;
  private _previous!: Insert;
  private _current: Insert;

  constructor(generator: InsertsGenerator) {
    this.generator = generator;
    this.n = 0;
    this._current = None;
  }

  previousComplement(): Insert {
    return this._previous.complement();
  }

  current(max: number): Insert {
    if (this.n === max) {
      return None;
    }
    return this._current;
  }

  next(): Insert {
    this._previous = this._current;
    this._current = this.generator(this.n++);
    return this._current;
  }
}
