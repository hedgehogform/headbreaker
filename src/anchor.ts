import type { Vector } from './vector'
import { between } from './between'
import * as Pair from './pair'
import { vector } from './vector'

export class Anchor {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  equal(other: Anchor): boolean {
    return this.isAt(other.x, other.y)
  }

  isAt(x: number, y: number): boolean {
    return Pair.equal(this.x, this.y, x, y)
  }

  translated(dx: number, dy: number): Anchor {
    return this.copy().translate(dx, dy)
  }

  translate(dx: number, dy: number): this {
    this.x += dx
    this.y += dy
    return this
  }

  closeTo(other: Anchor, tolerance: number): boolean {
    return between(this.x, other.x - tolerance, other.x + tolerance)
      && between(this.y, other.y - tolerance, other.y + tolerance)
  }

  copy(): Anchor {
    return new Anchor(this.x, this.y)
  }

  diff(other: Anchor): Pair.Pair {
    return Pair.diff(this.x, this.y, other.x, other.y)
  }

  asPair(): Pair.Pair {
    return [this.x, this.y]
  }

  asVector(): Vector {
    return vector(this.x, this.y)
  }

  export(): Vector {
    return this.asVector()
  }

  static atRandom(maxX: number, maxY: number): Anchor {
    return new Anchor(Math.random() * maxX, Math.random() * maxY)
  }

  static import(v: Vector): Anchor {
    return anchor(v.x, v.y)
  }
}

export function anchor(x: number, y: number): Anchor {
  return new Anchor(x, y)
}
