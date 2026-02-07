import { describe, expect, it } from 'vitest';
import { diameter, radius } from '../src/size';
import { vector } from '../src/vector';

describe('size', () => {
  it('radius from number', () => {
    const s = radius(5);
    expect(s.radius).toEqual(vector(5, 5));
    expect(s.diameter).toEqual(vector(10, 10));
  });

  it('radius from vector', () => {
    const s = radius(vector(3, 5));
    expect(s.radius).toEqual(vector(3, 5));
    expect(s.diameter).toEqual(vector(6, 10));
  });

  it('diameter from number', () => {
    const s = diameter(10);
    expect(s.radius).toEqual(vector(5, 5));
    expect(s.diameter).toEqual(vector(10, 10));
  });

  it('diameter from vector', () => {
    const s = diameter(vector(6, 10));
    expect(s.radius).toEqual(vector(3, 5));
    expect(s.diameter).toEqual(vector(6, 10));
  });
});
