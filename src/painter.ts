import type Canvas from './canvas';
import type Piece from './piece';
import type { Vector } from './vector';
import type { Figure, Group } from './canvas';
import type { Outline } from './outline';

export type VectorAction = (dx: number, dy: number) => void;
export type Action = () => void;

export default class Painter {
  resize(_canvas: Canvas, _width: number, _height: number): void {}
  initialize(_canvas: Canvas, _id: string): void {}
  reinitialize(_canvas: Canvas): void {}
  draw(_canvas: Canvas): void {}
  scale(_canvas: Canvas, _factor: Vector): void {}
  sketch(_canvas: Canvas, _piece: Piece, _figure: Figure, _outline: Outline): void {}
  fill(_canvas: Canvas, _piece: Piece, _figure: Figure): void {}
  label(_canvas: Canvas, _piece: Piece, _figure: Figure): void {}
  physicalTranslate(_canvas: Canvas, _group: Group, _piece: Piece): void {}
  logicalTranslate(_canvas: Canvas, _piece: Piece, _group: Group): void {}
  onDrag(_canvas: Canvas, _piece: Piece, _group: Group, _f: VectorAction): void {}
  onDragEnd(_canvas: Canvas, _piece: Piece, _group: Group, _f: Action): void {}
  registerKeyboardGestures(_canvas: Canvas, _gestures: Record<string, any>): void {}
}
