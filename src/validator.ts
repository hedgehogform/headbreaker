import type Puzzle from './puzzle';
import type Piece from './piece';
import * as Pair from './pair';

export type ValidationListener = (puzzle: Puzzle) => void;
export type PieceCondition = (piece: Piece) => boolean;
export type PuzzleCondition = (puzzle: Puzzle) => boolean;
export type Validator = PieceValidator | PuzzleValidator | NullValidator;

abstract class AbstractValidator {
  validListeners: ValidationListener[];
  _valid: boolean | undefined;

  constructor() {
    this.validListeners = [];
    this._valid = undefined;
  }

  validate(puzzle: Puzzle): void {
    const wasValid = this._valid;
    this.updateValidity(puzzle);
    if (this._valid && !wasValid) {
      this.fireValid(puzzle);
    }
  }

  updateValidity(puzzle: Puzzle): void {
    this._valid = this.isValid(puzzle);
  }

  abstract isValid(puzzle: Puzzle): boolean;

  fireValid(puzzle: Puzzle): void {
    this.validListeners.forEach(it => it(puzzle));
  }

  onValid(f: ValidationListener): void {
    this.validListeners.push(f);
  }

  get valid(): boolean | undefined {
    return this._valid;
  }

  get isNull(): boolean {
    return false;
  }
}

export class PieceValidator extends AbstractValidator {
  condition: PieceCondition;

  constructor(f: PieceCondition) {
    super();
    this.condition = f;
  }

  isValid(puzzle: Puzzle): boolean {
    return puzzle.pieces.every(it => this.condition(it));
  }
}

export class PuzzleValidator extends AbstractValidator {
  condition: PuzzleCondition;

  constructor(f: PuzzleCondition) {
    super();
    this.condition = f;
  }

  isValid(puzzle: Puzzle): boolean {
    return this.condition(puzzle);
  }

  static DIFF_DELTA = 0.01;

  static equalDiffs([dx0, dy0]: Pair.Pair, [dx, dy]: Pair.Pair): boolean {
    return Pair.equal(dx0, dy0, dx, dy, PuzzleValidator.DIFF_DELTA);
  }

  static connected: PuzzleCondition = (puzzle: Puzzle) => puzzle.connected;

  static relativeRefs(expected: Pair.Pair[]): PuzzleCondition {
    return (puzzle: Puzzle) => {
      function d(x: number, y: number, index: number): Pair.Pair {
        return Pair.diff(x, y, ...expected[index]);
      }
      const refs = puzzle.refs;
      const [x0, y0] = refs[0];
      const diff0 = d(x0, y0, 0);
      return refs.every(([x, y], index) => PuzzleValidator.equalDiffs(diff0, d(x, y, index)));
    };
  }
}

export class NullValidator extends AbstractValidator {
  isValid(_puzzle: Puzzle): boolean {
    return false;
  }

  get isNull(): boolean {
    return true;
  }
}
