import { describe, expect, it } from 'vitest';
import { Horizontal, Vertical } from '../src/axis';
import { vector } from '../src/vector';

describe('axis', () => {
  it('horizontal extracts x from vector', () => {
    expect(Horizontal.atVector(vector(1, 20))).toBe(1);
  });

  it('vertical extracts y from vector', () => {
    expect(Vertical.atVector(vector(1, 20))).toBe(20);
  });

  it('horizontal extracts width from dimension', () => {
    expect(Horizontal.atDimension({ width: 100, height: 200 })).toBe(100);
  });

  it('vertical extracts height from dimension', () => {
    expect(Vertical.atDimension({ width: 100, height: 200 })).toBe(200);
  });
});
