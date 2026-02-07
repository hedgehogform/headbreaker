export interface Orthogonal<A> {
  up: A;
  down: A;
  left: A;
  right: A;
}

export type Mapper<A, B> = (value: A) => B;

export function pivot<T>(one: T, other: T, back: boolean = false): [T, T] {
  return back ? [one, other] : [other, one];
}

export function orthogonalMap<A, B>(
  values: (A | null | undefined)[],
  mapper: Mapper<A, B>,
  replacement: A | null = null
): (B | null | undefined)[] {
  return values.map(it => {
    const value = it || replacement;
    return value ? mapper(value as A) : value as null | undefined;
  });
}

export function orthogonalTransform<A, B>(
  values: (A | null | undefined)[],
  mapper: Mapper<A, B>,
  replacement: A | null = null
): Orthogonal<B | null | undefined> {
  const [right, down, left, up] = orthogonalMap(values, mapper, replacement);
  return { right, down, left, up };
}

export function itself<A>(arg: A): A {
  return arg;
}
