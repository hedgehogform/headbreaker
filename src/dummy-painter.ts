import type Canvas from './canvas';
import type Piece from './piece';
import Painter from './painter';
import type { Figure } from './canvas';
import type { Outline } from './outline';

export default class DummyPainter extends Painter {
  initialize(canvas: Canvas, _id: string): void {
    (canvas as any)['__nullLayer__'] = { drawn: false, figures: 0 };
  }

  draw(canvas: Canvas): void {
    (canvas as any)['__nullLayer__'].drawn = true;
  }

  sketch(canvas: Canvas, _piece: Piece, _figure: Figure, _outline: Outline): void {
    (canvas as any)['__nullLayer__'].figures++;
  }
}
