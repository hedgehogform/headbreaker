import type Canvas from './canvas'
import type { Figure, Group } from './canvas'
import type { Outline } from './outline'
import type { Action, VectorAction } from './painter'
import type Piece from './piece'
import type Puzzle from './puzzle'
import type { Vector } from './vector'
import Konva from 'konva'
import Painter from './painter'
import * as Pair from './pair'
import * as VectorModule from './vector'
import { vector } from './vector'

function currentPositionDiff(model: Piece, group: Group): Pair.Pair {
  return Pair.diff(
    group.x(),
    group.y(),
    model.metadata.currentPosition.x,
    model.metadata.currentPosition.y,
  )
}

export default class KonvaPainter extends Painter {
  initialize(canvas: Canvas, id: string): void {
    const stage = new Konva.Stage({
      container: id,
      width: canvas.width,
      height: canvas.height,
      draggable: !canvas.fixed,
    })
    this._initializeLayer(stage, canvas)
  }

  private _initializeLayer(stage: Konva.Stage, canvas: Canvas): void {
    const layer = new Konva.Layer()
    stage.add(layer)
    canvas._konvaLayer = layer
  }

  draw(canvas: Canvas): void {
    canvas._konvaLayer!.draw()
  }

  reinitialize(canvas: Canvas): void {
    const layer = canvas._konvaLayer!
    const stage = layer.getStage()
    layer.destroy()
    this._initializeLayer(stage, canvas)
  }

  resize(canvas: Canvas, width: number, height: number): void {
    const layer = canvas._konvaLayer!
    const stage = layer.getStage()
    stage.width(width)
    stage.height(height)
  }

  scale(canvas: Canvas, factor: Vector): void {
    canvas._konvaLayer!.getStage().scale(factor)
  }

  sketch(canvas: Canvas, piece: Piece, figure: Figure, outline: Outline): void {
    figure.group = new Konva.Group({
      x: piece.metadata.currentPosition.x,
      y: piece.metadata.currentPosition.y,
      draggable: !piece.metadata.fixed,
      dragBoundFunc: canvas.preventOffstageDrag
        ? (position: Vector) => {
            const furthermost = VectorModule.minus(
              vector(canvas.width, canvas.height),
              piece.size.radius,
            )
            return VectorModule.max(
              VectorModule.min(position, furthermost),
              piece.size.radius,
            )
          }
        : undefined,
    })

    figure.shape = new Konva.Line({
      points: outline.draw(piece, piece.diameter, canvas.borderFill),
      bezier: outline.isBezier(),
      tension: outline.isBezier() ? undefined : canvas.lineSoftness,
      stroke: piece.metadata.strokeColor || canvas.strokeColor,
      strokeWidth: canvas.strokeWidth,
      closed: true,
      ...VectorModule.multiply(piece.radius, -1),
    })
    this.fill(canvas, piece, figure)
    figure.group.add(figure.shape)
    canvas._konvaLayer!.add(figure.group)
  }

  fill(canvas: Canvas, piece: Piece, figure: Figure): void {
    const image = canvas.imageMetadataFor(piece)
    figure.shape?.fill(image ? null : piece.metadata.color || 'black')
    figure.shape?.fillPatternImage(image?.content)
    figure.shape?.fillPatternScale(
      image?.scale ? { x: image.scale, y: image.scale } : undefined,
    )
    figure.shape?.fillPatternOffset(
      image ? VectorModule.divide(image.offset!, image.scale!) : undefined,
    )
  }

  label(_canvas: Canvas, piece: Piece, figure: Figure): void {
    figure.label = new Konva.Text({
      ...VectorModule.minus(
        {
          x: piece.metadata.label.x || figure.group!.width() / 2,
          y: piece.metadata.label.y || figure.group!.height() / 2,
        },
        piece.radius,
      ),
      text: piece.metadata.label.text,
      fontSize: piece.metadata.label.fontSize,
      fontFamily: piece.metadata.label.fontFamily || 'Sans Serif',
      fill: piece.metadata.label.color || 'white',
    })
    figure.group!.add(figure.label)
  }

  physicalTranslate(_canvas: Canvas, group: Group, piece: Piece): void {
    group.x(piece.centralAnchor!.x)
    group.y(piece.centralAnchor!.y)
  }

  logicalTranslate(_canvas: Canvas, piece: Piece, group: Group): void {
    VectorModule.update(piece.metadata.currentPosition, group.x(), group.y())
  }

  onDrag(canvas: Canvas, piece: Piece, group: Group, f: VectorAction): void {
    group.on('mouseover', () => {
      document.body.style.cursor = 'pointer'
    })
    group.on('mouseout', () => {
      document.body.style.cursor = 'default'
    })
    group.on('dragmove', () => {
      const [dx, dy] = currentPositionDiff(piece, group)
      group.zIndex(canvas.figuresCount - 1)
      f(dx, dy)
    })
  }

  onDragEnd(_canvas: Canvas, _piece: Piece, group: Group, f: Action): void {
    group.on('dragend', () => {
      f()
    })
  }

  registerKeyboardGestures(
    canvas: Canvas,
    gestures: Record<string, (puzzle: Puzzle) => void>,
  ): void {
    const container = canvas._konvaLayer!.getStage().container()
    container.tabIndex = -1
    this._registerKeyDown(canvas, container, gestures)
    this._registerKeyUp(canvas, container, gestures)
  }

  private _registerKeyDown(
    canvas: Canvas,
    container: HTMLDivElement,
    gestures: Record<string, (puzzle: Puzzle) => void>,
  ): void {
    container.addEventListener('keydown', (e: KeyboardEvent) => {
      for (const key in gestures) {
        if (e.key === key) {
          gestures[key](canvas.puzzle)
        }
      }
    })
  }

  private _registerKeyUp(
    canvas: Canvas,
    container: HTMLDivElement,
    gestures: Record<string, (puzzle: Puzzle) => void>,
  ): void {
    container.addEventListener('keyup', (e: KeyboardEvent) => {
      for (const key in gestures) {
        if (e.key === key) {
          canvas.puzzle.tryDisconnectionWhileDragging()
        }
      }
    })
  }
}
