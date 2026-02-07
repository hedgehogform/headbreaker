export type Pair = [number, number];

export function isNull(x: number, y: number): boolean {
  return equal(x, y, 0, 0);
}

export function equal(x1: number, y1: number, x2: number, y2: number, delta: number = 0): boolean {
  return Math.abs(x1 - x2) <= delta && Math.abs(y1 - y2) <= delta;
}

export function diff(x1: number, y1: number, x2: number, y2: number): Pair {
  return [x1 - x2, y1 - y2];
}
