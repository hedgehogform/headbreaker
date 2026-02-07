import type Canvas from './canvas';
import type Piece from './piece';
import Painter from './painter';
import type { Figure, Group } from './canvas';
import type { Outline } from './outline';
import type { Vector } from './vector';
import type { VectorAction, Action } from './painter';
import * as VectorModule from './vector';
import { vector } from './vector';
import * as Pair from './pair';

declare const require: ((id: string) => any) | undefined;

let Konva: any;
try {
  // Use require so esbuild can statically resolve the konva dependency.
  // In IIFE builds konva is bundled; in CJS/ESM builds it stays external.
  Konva = typeof require !== 'undefined' ? require('konva') : null;
} catch (_e) {
  Konva = null;
}

if (!Konva) {
  Konva = {
    Stage: class {
      constructor(_options: any) {
        throw new Error('Konva not loaded');
      }
    }
  };
}

function currentPositionDiff(model: Piece, group: any): Pair.Pair {
  return Pair.diff(group.x(), group.y(), model.metadata.currentPosition.x, model.metadata.currentPosition.y);
}

export default class KonvaPainter extends Painter {
  initialize(canvas: Canvas, id: string): void {
    const stage = new Konva.Stage({
      container: id,
      width: canvas.width,
      height: canvas.height,
      draggable: !canvas.fixed,
    });
    this._initializeLayer(stage, canvas);
  }

  private _initializeLayer(stage: any, canvas: Canvas): void {
    const layer = new Konva.Layer();
    stage.add(layer);
    (canvas as any)['__konvaLayer__'] = layer;
  }

  draw(canvas: Canvas): void {
    (canvas as any)['__konvaLayer__'].draw();
  }

  reinitialize(canvas: Canvas): void {
    const layer = (canvas as any)['__konvaLayer__'];
    const stage = layer.getStage();
    layer.destroy();
    this._initializeLayer(stage, canvas);
  }

  resize(canvas: Canvas, width: number, height: number): void {
    const layer = (canvas as any)['__konvaLayer__'];
    const stage = layer.getStage();
    stage.width(width);
    stage.height(height);
  }

  scale(canvas: Canvas, factor: Vector): void {
    (canvas as any)['__konvaLayer__'].getStage().scale(factor);
  }

  sketch(canvas: Canvas, piece: Piece, figure: Figure, outline: Outline): void {
    figure.group = new Konva.Group({
      x: piece.metadata.currentPosition.x,
      y: piece.metadata.currentPosition.y,
      draggable: !piece.metadata.fixed,
      dragBoundFunc: canvas.preventOffstageDrag ? (position: Vector) => {
        const furthermost = VectorModule.minus(vector(canvas.width, canvas.height), piece.size.radius);
        return VectorModule.max(VectorModule.min(position, furthermost), piece.size.radius);
      } : null,
    });

    figure.shape = new Konva.Line({
      points: outline.draw(piece, piece.diameter, canvas.borderFill),
      bezier: outline.isBezier(),
      tension: outline.isBezier() ? null : canvas.lineSoftness,
      stroke: piece.metadata.strokeColor || canvas.strokeColor,
      strokeWidth: canvas.strokeWidth,
      closed: true,
      ...VectorModule.multiply(piece.radius, -1),
    });
    this.fill(canvas, piece, figure);
    figure.group.add(figure.shape);
    (canvas as any)['__konvaLayer__'].add(figure.group);
  }

  fill(canvas: Canvas, piece: Piece, figure: Figure): void {
    const image = canvas.imageMetadataFor(piece);
    figure.shape.fill(!image ? piece.metadata.color || 'black' : null);
    figure.shape.fillPatternImage(image && image.content);
    figure.shape.fillPatternScale(image && { x: image.scale, y: image.scale });
    figure.shape.fillPatternOffset(image && VectorModule.divide(image.offset!, image.scale!));
  }

  label(_canvas: Canvas, piece: Piece, figure: Figure): void {
    figure.label = new Konva.Text({
      ...VectorModule.minus({
        x: piece.metadata.label.x || (figure.group.width() / 2),
        y: piece.metadata.label.y || (figure.group.height() / 2),
      }, piece.radius),
      text: piece.metadata.label.text,
      fontSize: piece.metadata.label.fontSize,
      fontFamily: piece.metadata.label.fontFamily || 'Sans Serif',
      fill: piece.metadata.label.color || 'white',
    });
    figure.group.add(figure.label);
  }

  physicalTranslate(_canvas: Canvas, group: Group, piece: Piece): void {
    group.x(piece.centralAnchor!.x);
    group.y(piece.centralAnchor!.y);
  }

  logicalTranslate(_canvas: Canvas, piece: Piece, group: Group): void {
    VectorModule.update(piece.metadata.currentPosition, group.x(), group.y());
  }

  onDrag(canvas: Canvas, piece: Piece, group: Group, f: VectorAction): void {
    group.on('mouseover', () => {
      document.body.style.cursor = 'pointer';
    });
    group.on('mouseout', () => {
      document.body.style.cursor = 'default';
    });
    group.on('dragmove', () => {
      const [dx, dy] = currentPositionDiff(piece, group);
      group.zIndex(canvas.figuresCount - 1);
      f(dx, dy);
    });
  }

  onDragEnd(_canvas: Canvas, _piece: Piece, group: Group, f: Action): void {
    group.on('dragend', () => {
      f();
    });
  }

  registerKeyboardGestures(canvas: Canvas, gestures: Record<string, any>): void {
    const container = (canvas as any)['__konvaLayer__'].getStage().container();
    container.tabIndex = -1;
    this._registerKeyDown(canvas, container, gestures);
    this._registerKeyUp(canvas, container, gestures);
  }

  private _registerKeyDown(canvas: Canvas, container: any, gestures: Record<string, any>): void {
    container.addEventListener('keydown', (e: any) => {
      for (const keyCode in gestures) {
        if (e.keyCode == keyCode) {
          gestures[keyCode](canvas.puzzle);
        }
      }
    });
  }

  private _registerKeyUp(canvas: Canvas, container: any, gestures: Record<string, any>): void {
    container.addEventListener('keyup', (e: any) => {
      for (const keyCode in gestures) {
        if (e.keyCode == keyCode) {
          canvas.puzzle.tryDisconnectionWhileDragging();
        }
      }
    });
  }
}
