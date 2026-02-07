import type Piece from '../src/piece';
import { beforeEach, describe, expect, it } from 'vitest';
import Puzzle from '../src/puzzle';
import * as Shuffler from '../src/shuffler';
import { vector } from '../src/vector';

function hasDuplicates(result: { x: number; y: number }[]): boolean {
  return result.some(it =>
    result.some(
      other => other !== it && it.x === other.x && it.y === other.y,
    ),
  );
}

describe('shuffler', () => {
  describe('complete puzzles', () => {
    let puzzle: Puzzle;
    let pieces: Piece[];

    beforeEach(() => {
      puzzle = new Puzzle();
      pieces = [
        puzzle.newPiece({}, { centralAnchor: vector(0, 0) }),
        puzzle.newPiece({}, { centralAnchor: vector(10, 0) }),
        puzzle.newPiece({}, { centralAnchor: vector(0, 10) }),
        puzzle.newPiece({}, { centralAnchor: vector(10, 10) }),
        puzzle.newPiece({}, { centralAnchor: vector(0, 20) }),
        puzzle.newPiece({}, { centralAnchor: vector(10, 20) }),
      ];
    });

    it('grid', () => {
      const result = Shuffler.grid(pieces);
      expect(hasDuplicates(result)).toBe(false);
    });

    it('columns', () => {
      const result = Shuffler.columns(pieces);
      expect(result.map(it => it.x)).toEqual([0, 10, 0, 10, 0, 10]);
      expect(hasDuplicates(result)).toBe(false);
    });

    it('line', () => {
      const result = Shuffler.line(pieces);
      expect(result.map(it => it.y)).toEqual([0, 0, 0, 0, 0, 0]);
      expect(
        result.every((it, index) => (index % 2 === 0 ? it.x < 30 : it.x >= 30)),
      ).toBe(true);
      expect(hasDuplicates(result)).toBe(false);
    });

    it('noop', () => {
      expect(Shuffler.noop(pieces)).toEqual([
        vector(0, 0),
        vector(10, 0),
        vector(0, 10),
        vector(10, 10),
        vector(0, 20),
        vector(10, 20),
      ]);
    });

    it('noisy', () => {
      expect(Shuffler.noise(vector(0, 0))(pieces)).toEqual([
        vector(0, 0),
        vector(10, 0),
        vector(0, 10),
        vector(10, 10),
        vector(0, 20),
        vector(10, 20),
      ]);
    });

    it('padder', () => {
      expect(Shuffler.padder(5, 2, 3)(pieces)).toEqual([
        vector(0, 0),
        vector(15, 0),
        vector(0, 15),
        vector(15, 15),
        vector(0, 30),
        vector(15, 30),
      ]);
    });
  });

  describe('incomplete puzzles', () => {
    let puzzle: Puzzle;
    let pieces: Piece[];

    beforeEach(() => {
      puzzle = new Puzzle();
      pieces = [
        puzzle.newPiece({}, { centralAnchor: vector(0, 0) }),
        puzzle.newPiece({}, { centralAnchor: vector(0, 10) }),
        puzzle.newPiece({}, { centralAnchor: vector(0, 20) }),
        puzzle.newPiece({}, { centralAnchor: vector(10, 0) }),
      ];
    });

    it('line', () => {
      const result = Shuffler.line(pieces);
      expect(result.map(it => it.y)).toEqual([0, 0, 0, 0]);
      expect(result.slice(0, 3).every(it => it.x <= 20)).toBe(true);
      expect(result[3].x).toBe(30);
      expect(hasDuplicates(result)).toBe(false);
    });
  });

  it('random shuffler produces valid vectors', () => {
    const puzzle = new Puzzle();
    const pieces = [
      puzzle.newPiece({}, { centralAnchor: vector(0, 0) }),
      puzzle.newPiece({}, { centralAnchor: vector(10, 0) }),
    ];
    const result = Shuffler.random(100, 100)(pieces);
    expect(result.length).toBe(2);
    result.forEach((v) => {
      expect(v.x).toBeGreaterThanOrEqual(0);
      expect(v.x).toBeLessThan(100);
      expect(v.y).toBeGreaterThanOrEqual(0);
      expect(v.y).toBeLessThan(100);
    });
  });
});
