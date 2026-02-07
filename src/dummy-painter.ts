import type Canvas from './canvas'
import type { Figure } from './canvas'
import type { Outline } from './outline'
import type Piece from './piece'
import Painter from './painter'

export default class DummyPainter extends Painter {
  initialize(canvas: Canvas, _id: string): void {
    canvas._nullLayer = { drawn: false, figures: 0 }
  }

  draw(canvas: Canvas): void {
    canvas._nullLayer!.drawn = true
  }

  sketch(
    canvas: Canvas,
    _piece: Piece,
    _figure: Figure,
    _outline: Outline,
  ): void {
    canvas._nullLayer!.figures++
  }
}
