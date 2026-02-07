import * as Pair from './pair';

export interface Vector {
  x: number;
  y: number;
}

export function vector(x: number, y: number): Vector {
  return { x, y };
}

export function cast(value: Vector | number | null | undefined): Vector {
  if (value == null) {
    return vector(0, 0);
  }
  if (typeof value === 'number') {
    return vector(value, value);
  }
  return value;
}

export function zero(): Vector {
  return vector(0, 0);
}

export function equal(one: Vector, other: Vector, delta: number = 0): boolean {
  return Pair.equal(one.x, one.y, other.x, other.y, delta);
}

export function copy({ x, y }: Vector): Vector {
  return { x, y };
}

export function update(v: Vector, x: number, y: number): void {
  v.x = x;
  v.y = y;
}

export function diff(one: Vector, other: Vector): Pair.Pair {
  return Pair.diff(one.x, one.y, other.x, other.y);
}

export function multiply(one: Vector | number, other: Vector | number): Vector {
  return apply(one, other, (v1, v2) => v1 * v2);
}

export function divide(one: Vector | number, other: Vector | number): Vector {
  return apply(one, other, (v1, v2) => v1 / v2);
}

export function plus(one: Vector | number, other: Vector | number): Vector {
  return apply(one, other, (v1, v2) => v1 + v2);
}

export function minus(one: Vector | number, other: Vector | number): Vector {
  return apply(one, other, (v1, v2) => v1 - v2);
}

export function min(one: Vector | number, other: Vector | number): Vector {
  return apply(one, other, Math.min);
}

export function max(one: Vector | number, other: Vector | number): Vector {
  return apply(one, other, Math.max);
}

export function apply(one: Vector | number, other: Vector | number, f: (a: number, b: number) => number): Vector {
  const first = cast(one);
  const second = cast(other);
  return { x: f(first.x, second.x), y: f(first.y, second.y) };
}

export const inner = {
  min(one: Vector): number {
    return this.apply(one, Math.min);
  },

  max(one: Vector): number {
    return this.apply(one, Math.max);
  },

  apply(one: Vector, f: (a: number, b: number) => number): number {
    return f(one.x, one.y);
  },
};
