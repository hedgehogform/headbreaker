import type Piece from './piece';
import type { Vector } from './vector';
import { Anchor } from './anchor';

export type Shuffler = (pieces: Piece[]) => Vector[];

function sampleIndex(list: unknown[]): number {
  return Math.round(Math.random() * (list.length - 1));
}

export function random(maxX: number, maxY: number): Shuffler {
  return pieces => pieces.map(_it => Anchor.atRandom(maxX, maxY));
}

export const grid: Shuffler = (pieces) => {
  const destinations = pieces.map(it => it.centralAnchor!.asVector());
  for (let i = 0; i < destinations.length; i++) {
    const j = sampleIndex(destinations);
    const temp = destinations[j];
    destinations[j] = destinations[i];
    destinations[i] = temp;
  }
  return destinations;
};

export const columns: Shuffler = (pieces) => {
  const destinations = pieces.map(it => it.centralAnchor!.asVector());
  const columnsMap = new Map<number, Vector[]>();

  for (const destination of destinations) {
    if (!columnsMap.get(destination.x)) {
      columnsMap.set(
        destination.x,
        destinations.filter(it => it.x === destination.x),
      );
    }
    const column = columnsMap.get(destination.x)!;
    const j = sampleIndex(column);
    const temp = column[j].y;
    column[j].y = destination.y;
    destination.y = temp;
  }
  return destinations;
};

export const line: Shuffler = (pieces) => {
  const destinations = pieces.map(it => it.centralAnchor!.asVector());
  const cols = new Set(destinations.map(it => it.x));
  const maxX = Math.max(...cols);
  const minX = Math.min(...cols);
  const width = (maxX - minX) / (cols.size - 1);
  const pivotX = minX + width / 2;

  const lineLength = destinations.length * width;
  const linePivot = destinations.filter(it => it.x < pivotX).length * width;

  const init: number[] = [];
  const tail: number[] = [];

  for (let i = 0; i < linePivot; i += width) {
    init.push(i);
  }
  for (let i = init[init.length - 1] + width; i < lineLength; i += width) {
    tail.push(i);
  }

  for (const destination of destinations) {
    const source = destination.x < pivotX ? init : tail;
    const index = sampleIndex(source);
    destination.y = 0;
    destination.x = source[index];
    source.splice(index, 1);
  }
  return destinations;
};

export function padder(
  padding: number,
  width: number,
  height: number,
): Shuffler {
  return (pieces) => {
    const destinations = pieces.map(it => it.centralAnchor!.asVector());
    let dx = 0;
    let dy = 0;
    for (let j = 0; j < height; j++) {
      for (let i = 0; i < width; i++) {
        const destination = destinations[i + width * j];
        destination.x += dx;
        destination.y += dy;
        dx += padding;
      }
      dx = 0;
      dy += padding;
    }
    return destinations;
  };
}

export function noise(maxDistance: Vector): Shuffler {
  return (pieces) => {
    return pieces.map(it =>
      Anchor.atRandom(2 * maxDistance.x, 2 * maxDistance.y)
        .translate(-maxDistance.x, -maxDistance.y)
        .translate(it.centralAnchor!.x, it.centralAnchor!.y)
        .asVector(),
    );
  };
}

export const noop: Shuffler = pieces => pieces.map(it => it.centralAnchor!);
