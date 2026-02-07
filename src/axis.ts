import type { Vector } from './vector';

export interface Axis {
  atVector: (vector: Vector) => number;
  atDimension: (image: { width: number; height: number }) => number;
}

export const Vertical: Axis = {
  atVector(vector: Vector): number {
    return vector.y;
  },
  atDimension(image: { width: number; height: number }): number {
    return image.height;
  },
};

export const Horizontal: Axis = {
  atVector(vector: Vector): number {
    return vector.x;
  },
  atDimension(image: { width: number; height: number }): number {
    return image.width;
  },
};
