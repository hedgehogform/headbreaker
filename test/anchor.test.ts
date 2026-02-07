import { describe, expect, it } from 'vitest';
import { anchor, Anchor } from '../src/anchor';

describe('anchor', () => {
  it('can equal', () => {
    expect(anchor(0, 0).equal(anchor(0, 0))).toBe(true);
    expect(anchor(0, 0).equal(anchor(10, 0))).toBe(false);
    expect(anchor(0, 0).equal(anchor(0, 10))).toBe(false);
  });

  it('can check position', () => {
    expect(anchor(0, 0).isAt(0, 0)).toBe(true);
    expect(anchor(0, 0).isAt(10, 0)).toBe(false);
    expect(anchor(0, 0).isAt(0, 10)).toBe(false);
  });

  it('can translate vertically', () => {
    expect(anchor(1, 5).translated(0, 4)).toEqual(anchor(1, 9));
    expect(anchor(1, 5).translated(0, -5)).toEqual(anchor(1, 0));
  });

  it('can translate horizontally', () => {
    expect(anchor(1, 5).translated(4, 0)).toEqual(anchor(5, 5));
    expect(anchor(1, 5).translated(-1, 0)).toEqual(anchor(0, 5));
  });

  it('can check proximity when orthogonally close', () => {
    expect(anchor(0, 0).closeTo(anchor(0, 0), 2)).toBe(true);
    expect(anchor(0, 0).closeTo(anchor(0, 2), 2)).toBe(true);
    expect(anchor(0, 0).closeTo(anchor(0, 1), 2)).toBe(true);
    expect(anchor(0, 0).closeTo(anchor(0, -2), 2)).toBe(true);
    expect(anchor(0, 0).closeTo(anchor(0, -1), 2)).toBe(true);
    expect(anchor(0, 0).closeTo(anchor(2, 0), 2)).toBe(true);
    expect(anchor(0, 0).closeTo(anchor(-2, 0), 2)).toBe(true);
  });

  it('can check proximity when orthogonally away', () => {
    expect(anchor(0, 0).closeTo(anchor(0, 2), 1)).toBe(false);
    expect(anchor(0, 0).closeTo(anchor(0, -2), 1)).toBe(false);
    expect(anchor(0, 0).closeTo(anchor(2, 0), 1)).toBe(false);
    expect(anchor(0, 0).closeTo(anchor(-2, 0), 1)).toBe(false);
  });

  it('can create random anchors', () => {
    expect(Anchor.atRandom(100, 100).x).toBeLessThan(100);
    expect(Anchor.atRandom(100, 100).x).toBeGreaterThanOrEqual(0);
    expect(Anchor.atRandom(100, 50).y).toBeLessThan(50);
    expect(Anchor.atRandom(100, 50).y).toBeGreaterThanOrEqual(0);
  });

  it('can compute diff', () => {
    expect(anchor(5, 10).diff(anchor(2, 3))).toEqual([3, 7]);
    expect(anchor(0, 0).diff(anchor(1, 1))).toEqual([-1, -1]);
  });

  it('can convert to pair', () => {
    expect(anchor(3, 7).asPair()).toEqual([3, 7]);
  });

  it('can convert to vector', () => {
    expect(anchor(3, 7).asVector()).toEqual({ x: 3, y: 7 });
  });

  it('can export', () => {
    expect(anchor(3, 7).export()).toEqual({ x: 3, y: 7 });
  });

  it('can import', () => {
    const a = Anchor.import({ x: 5, y: 10 });
    expect(a.x).toBe(5);
    expect(a.y).toBe(10);
  });

  it('can copy', () => {
    const a = anchor(3, 7);
    const b = a.copy();
    expect(b).toEqual(a);
    expect(b).not.toBe(a);
    b.translate(1, 1);
    expect(a.x).toBe(3);
    expect(b.x).toBe(4);
  });
});
