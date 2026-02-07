import type { Vector } from './vector'
import * as VectorModule from './vector'

export interface Size {
  radius: Vector
  diameter: Vector
}

export function radius(value: Vector | number): Size {
  const v = VectorModule.cast(value)
  return {
    radius: v,
    diameter: VectorModule.multiply(v, 2),
  }
}

export function diameter(value: Vector | number): Size {
  const v = VectorModule.cast(value)
  return {
    radius: VectorModule.multiply(v, 0.5),
    diameter: v,
  }
}
