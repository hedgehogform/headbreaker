import type Canvas from './canvas'
import type { Figure, Group } from './canvas'
import type { Outline } from './outline'
import type Piece from './piece'
import type Puzzle from './puzzle'
import type { Vector } from './vector'

export type VectorAction = (dx: number, dy: number) => void
export type Action = () => void

export default class Painter {
  resize(_canvas: Canvas, _width: number, _height: number): void {
    // No-op: Override in subclass
  }

  initialize(_canvas: Canvas, _id: string): void {
    // No-op: Override in subclass
  }

  reinitialize(_canvas: Canvas): void {
    // No-op: Override in subclass
  }

  draw(_canvas: Canvas): void {
    // No-op: Override in subclass
  }

  scale(_canvas: Canvas, _factor: Vector): void {
    // No-op: Override in subclass
  }

  sketch(
    _canvas: Canvas,
    _piece: Piece,
    _figure: Figure,
    _outline: Outline,
  ): void {
    // No-op: Override in subclass
  }

  fill(_canvas: Canvas, _piece: Piece, _figure: Figure): void {
    // No-op: Override in subclass
  }

  label(_canvas: Canvas, _piece: Piece, _figure: Figure): void {
    // No-op: Override in subclass
  }

  physicalTranslate(_canvas: Canvas, _group: Group, _piece: Piece): void {
    // No-op: Override in subclass
  }

  logicalTranslate(_canvas: Canvas, _piece: Piece, _group: Group): void {
    // No-op: Override in subclass
  }

  onDrag(
    _canvas: Canvas,
    _piece: Piece,
    _group: Group,
    _f: VectorAction,
  ): void {
    // No-op: Override in subclass
  }

  onDragEnd(_canvas: Canvas, _piece: Piece, _group: Group, _f: Action): void {
    // No-op: Override in subclass
  }

  registerKeyboardGestures(
    _canvas: Canvas,
    _gestures: Record<string, (puzzle: Puzzle) => void>,
  ): void {
    // No-op: Override in subclass
  }
}
