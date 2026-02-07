import * as Pair from './pair';
import Piece from './piece';
import Puzzle from './puzzle';
import Manufacturer from './manufacturer';
import { twoAndTwo, type InsertsGenerator } from './sequence';
import * as Structure from './structure';
import * as ImageMetadata from './image-metadata';
import * as VectorModule from './vector';
import { vector, type Vector } from './vector';
import * as Metadata from './metadata';
import * as SpatialMetadata from './spatial-metadata';
import { PuzzleValidator, PieceValidator, type Validator, type ValidationListener } from './validator';
import { Horizontal, Vertical, type Axis } from './axis';
import * as Shuffler from './shuffler';
import { diameter, type Size } from './size';
import { itself } from './prelude';
import { Classic, type Outline } from './outline';
import type Painter from './painter';
import type { ConnectionRequirement } from './connector';
import type { ImageMetadata as ImageMetadataType } from './image-metadata';

export type Shape = any;
export type Group = any;
export type Label = any;

export interface Figure {
  shape: Shape;
  group: Group;
  label?: Label;
}

export type CanvasConnectionListener = (piece: Piece, figure: Figure, targetPiece: Piece, targetFigure: Figure) => void;
export type CanvasTranslationListener = (piece: Piece, figure: Figure, dx: number, dy: number) => void;

export interface LabelMetadata {
  text?: string;
  fontSize?: number;
  x?: number;
  y?: number;
  fontFamily?: string;
  color?: string;
}

export interface CanvasMetadata {
  id?: string;
  targetPosition?: Vector;
  currentPosition?: Vector;
  color?: string;
  fixed?: boolean;
  strokeColor?: string;
  image?: any;
  label?: LabelMetadata;
  scale?: number;
}

export interface Template {
  structure: Structure.StructureLike;
  size?: Size;
  metadata: CanvasMetadata;
}

export default class Canvas {
  width: number;
  height: number;
  pieceSize: Size;
  borderFill: Vector;
  imageMetadata: ImageMetadataType | null;
  strokeWidth: number;
  strokeColor: string;
  lineSoftness: number;
  preventOffstageDrag: boolean;
  proximity: number;
  fixed: boolean;
  _painter: Painter;
  _maxPiecesCount: Vector | null;
  _puzzleDiameter: Vector | null;
  _imageAdjuster: (image: ImageMetadataType) => ImageMetadataType;
  _outline: Outline;
  _puzzle: Puzzle | null = null;
  figures: Record<string, Figure> = {};
  templates: Record<string, Template> = {};
  _figurePadding: Vector | null = null;
  _drawn: boolean = false;
  autoconnected: boolean = false;

  constructor(id: string, {
    width,
    height,
    pieceSize = 50,
    proximity = 10,
    borderFill = 0,
    strokeWidth = 3,
    strokeColor = 'black',
    lineSoftness = 0,
    preventOffstageDrag = false,
    image = null,
    fixed = false,
    painter = null,
    puzzleDiameter = null,
    maxPiecesCount = null,
    outline = null
  }: {
    width: number;
    height: number;
    pieceSize?: Vector | number;
    proximity?: number;
    borderFill?: Vector | number;
    strokeWidth?: number;
    strokeColor?: string;
    lineSoftness?: number;
    preventOffstageDrag?: boolean;
    image?: any;
    fixed?: boolean;
    painter?: Painter | null;
    puzzleDiameter?: Vector | number | null;
    maxPiecesCount?: Vector | number | null;
    outline?: Outline | null;
  }) {
    this.width = width;
    this.height = height;
    this.pieceSize = diameter(pieceSize);
    this.borderFill = VectorModule.cast(borderFill);
    this.imageMetadata = ImageMetadata.asImageMetadata(image);
    this.strokeWidth = strokeWidth;
    this.strokeColor = strokeColor;
    this.lineSoftness = lineSoftness;
    this.preventOffstageDrag = preventOffstageDrag;
    this.proximity = proximity;
    this.fixed = fixed;

    this._painter = painter || new ((globalThis as any)['headbreaker']?.['painters']?.['Konva'] ?? class { initialize() {} })();
    this._painter.initialize(this, id);

    this._maxPiecesCount = maxPiecesCount ? VectorModule.cast(maxPiecesCount) : null;
    this._puzzleDiameter = puzzleDiameter ? VectorModule.cast(puzzleDiameter) : null;
    this._imageAdjuster = itself;
    this._outline = outline || Classic;
  }

  sketchPiece({ structure, size = undefined, metadata }: Template): void {
    SpatialMetadata.initialize(metadata, VectorModule.zero());
    this.renderPiece(this._newPiece(structure, size ?? null, metadata));
  }

  renderPiece(piece: Piece): void {
    const figure: Figure = { label: null, group: null, shape: null };
    this.figures[piece.metadata.id] = figure;
    this._painter.sketch(this, piece, figure, this._outline);

    const label = piece.metadata.label as LabelMetadata | undefined;
    if (label && label.text) {
      label.fontSize = label.fontSize || piece.diameter.y * 0.55;
      label.y = label.y || (piece.diameter.y - label.fontSize) / 2;
      this._painter.label(this, piece, figure);
    }

    this._bindGroupToPiece(figure.group, piece);
    this._bindPieceToGroup(piece, figure.group);
  }

  renderPieces(pieces: Piece[]): void {
    pieces.forEach(it => {
      this._annotatePiecePosition(it);
      this.renderPiece(it);
    });
  }

  renderPuzzle(puzzle: Puzzle): void {
    this.pieceSize = puzzle.pieceSize;
    this.proximity = puzzle.proximity * 2;
    this._puzzle = puzzle;
    this.renderPieces(puzzle.pieces);
  }

  autogenerate({
    horizontalPiecesCount = 5,
    verticalPiecesCount = 5,
    insertsGenerator = twoAndTwo,
    metadata = []
  }: {
    horizontalPiecesCount?: number;
    verticalPiecesCount?: number;
    insertsGenerator?: InsertsGenerator;
    metadata?: CanvasMetadata[];
  } = {}): void {
    const manufacturer = new Manufacturer();
    manufacturer.withDimensions(horizontalPiecesCount, verticalPiecesCount);
    manufacturer.withInsertsGenerator(insertsGenerator);
    manufacturer.withMetadata(metadata);
    this.autogenerateWithManufacturer(manufacturer);
  }

  autogenerateWithManufacturer(manufacturer: Manufacturer): void {
    manufacturer.withStructure(this.settings);
    this._puzzle = manufacturer.build();
    this._maxPiecesCount = vector(manufacturer.width, manufacturer.height);
    this.renderPieces(this.puzzle.pieces);
  }

  defineTemplate(name: string, template: Template): void {
    this.templates[name] = template;
  }

  sketchPieceUsingTemplate(id: string, templateName: string): void {
    const options = this.templates[templateName];
    if (!options) {
      throw new Error(`Unknown template ${id}`);
    }
    const metadata = Metadata.copy(options.metadata);
    (metadata as any).id = id;
    this.sketchPiece({ structure: options.structure, metadata });
  }

  shuffle(farness: number = 1): void {
    const offset = this.pieceRadius;
    this.puzzle.shuffle(farness * (this.width - offset.x), farness * (this.height - offset.y));
    this.puzzle.translate(offset.x, offset.y);
    this.autoconnected = true;
  }

  shuffleColumns(farness: number = 1): void {
    this.shuffleWith(farness, Shuffler.columns);
  }

  shuffleGrid(farness: number = 1): void {
    this.shuffleWith(farness, Shuffler.grid);
  }

  shuffleLine(farness: number = 1): void {
    this.shuffleWith(farness, Shuffler.line);
  }

  shuffleWith(farness: number, shuffler: Shuffler.Shuffler): void {
    this.solve();
    this.puzzle.shuffleWith(Shuffler.padder(this.proximity * 3, this.maxPiecesCount.x, this.maxPiecesCount.y));
    this.puzzle.shuffleWith(shuffler);
    this.puzzle.shuffleWith(Shuffler.noise(VectorModule.cast(this.proximity * farness / 2)));
    this.autoconnected = true;
  }

  solve(): void {
    this.puzzle.pieces.forEach(it => {
      const { x, y } = it.metadata.targetPosition;
      it.relocateTo(x, y);
    });
    this.autoconnect();
  }

  autoconnect(): void {
    this.puzzle.autoconnect();
    this.autoconnected = true;
  }

  registerKeyboardGestures(gestures: Record<string, (puzzle: Puzzle) => void> = {
    16: (puzzle) => puzzle.forceConnectionWhileDragging(),
    17: (puzzle) => puzzle.forceDisconnectionWhileDragging()
  }): void {
    this._painter.registerKeyboardGestures(this, gestures);
  }

  draw(): void {
    if (this._drawn) {
      throw new Error('This canvas has already been drawn. Call redraw instead');
    }
    if (!this.autoconnected) {
      this.autoconnect();
    }
    this.puzzle.updateValidity();
    this.autoconnected = false;
    this.redraw();
    this._drawn = true;
  }

  redraw(): void {
    this._painter.draw(this);
  }

  refill(): void {
    this.puzzle.pieces.forEach(piece => {
      this._painter.fill(this, piece, this.getFigure(piece));
    });
  }

  clear(): void {
    this._puzzle = null;
    this.figures = {};
    this.templates = {};
    this._figurePadding = null;
    this._drawn = false;
    this._painter.reinitialize(this);
  }

  attachConnectionRequirement(requirement: ConnectionRequirement): void {
    this.puzzle.attachConnectionRequirement(requirement);
  }

  clearConnectionRequirements(): void {
    this.puzzle.clearConnectionRequirements();
  }

  attachValidator(validator: Validator): void {
    this.puzzle.attachValidator(validator);
  }

  attachSolvedValidator(): void {
    this.puzzle.attachValidator(new PuzzleValidator(SpatialMetadata.solved));
  }

  attachRelativePositionValidator(): void {
    this.puzzle.attachValidator(new PuzzleValidator(SpatialMetadata.relativePosition));
  }

  attachRelativeRefsValidator(expected: [number, number][]): void {
    this.puzzle.attachValidator(new PuzzleValidator(PuzzleValidator.relativeRefs(expected)));
  }

  attachAbsolutePositionValidator(): void {
    this.puzzle.attachValidator(new PieceValidator(SpatialMetadata.absolutePosition));
  }

  onConnect(f: CanvasConnectionListener): void {
    this.puzzle.onConnect((piece, target) => {
      f(piece, this.getFigure(piece), target, this.getFigure(target));
    });
  }

  onDisconnect(f: CanvasConnectionListener): void {
    this.puzzle.onDisconnect((piece, target) => {
      f(piece, this.getFigure(piece), target, this.getFigure(target));
    });
  }

  onTranslate(f: CanvasTranslationListener): void {
    this.puzzle.onTranslate((piece, dx, dy) => {
      f(piece, this.getFigure(piece), dx, dy);
    });
  }

  reframeWithinDimensions(): void {
    if (!this.fixed) throw new Error('Only fixed canvas can be reframed');
    this.puzzle.reframe(
      this.figurePadding,
      VectorModule.minus(vector(this.width, this.height), this.figurePadding)
    );
  }

  onValid(f: ValidationListener): void {
    this.puzzle.onValid(f);
  }

  get valid(): boolean | undefined {
    return this.puzzle.valid;
  }

  getFigure(piece: Piece): Figure {
    return this.getFigureById(piece.metadata.id);
  }

  getFigureById(id: string): Figure {
    return this.figures[id];
  }

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this._painter.resize(this, width, height);
  }

  scale(factor: Vector | number): void {
    this._painter.scale(this, VectorModule.cast(factor));
  }

  private _annotatePiecePosition(piece: Piece): void {
    const p = piece.centralAnchor!.asVector();
    SpatialMetadata.initialize(piece.metadata, p, VectorModule.copy(p));
  }

  private _bindGroupToPiece(group: Group, piece: Piece): void {
    piece.onTranslate((_piece, _dx, _dy) => {
      this._painter.physicalTranslate(this, group, piece);
      this._painter.logicalTranslate(this, piece, group);
    });
  }

  private _bindPieceToGroup(piece: Piece, group: Group): void {
    this._painter.onDrag(this, piece, group, (dx: number, dy: number) => {
      if (!Pair.isNull(dx, dy)) {
        piece.drag(dx, dy, true);
        this._painter.logicalTranslate(this, piece, group);
        this.redraw();
      }
    });
    this._painter.onDragEnd(this, piece, group, () => {
      piece.drop();
      this.puzzle.validate();
      this.redraw();
    });
  }

  _baseImageMetadataFor(piece: Piece): ImageMetadataType | null {
    if (this.imageMetadata) {
      const s = piece.metadata.scale || this.imageMetadata.scale || 1;
      const offset = VectorModule.plus(
        piece.metadata.targetPosition || VectorModule.zero(),
        this.imageMetadata.offset || VectorModule.zero()
      );
      return { content: this.imageMetadata.content, offset, scale: s };
    }
    return ImageMetadata.asImageMetadata(piece.metadata.image);
  }

  imageMetadataFor(piece: Piece): ImageMetadataType | null {
    const base = this._baseImageMetadataFor(piece);
    if (!base) return null;
    return this._imageAdjuster(base);
  }

  adjustImagesToPuzzle(axis: Axis): void {
    this._imageAdjuster = (image) => {
      const s = axis.atVector(this.puzzleDiameter) / axis.atDimension(image.content);
      const offset = VectorModule.plus(image.offset!, VectorModule.minus(this.borderFill, this.pieceDiameter));
      return { content: image.content, scale: s, offset };
    };
  }

  adjustImagesToPuzzleWidth(): void { this.adjustImagesToPuzzle(Horizontal); }
  adjustImagesToPuzzleHeight(): void { this.adjustImagesToPuzzle(Vertical); }

  adjustImagesToPiece(axis: Axis): void {
    this._imageAdjuster = (image) => {
      const s = axis.atVector(this.pieceDiameter) / axis.atDimension(image.content);
      const offset = VectorModule.plus(image.offset!, this.borderFill);
      return { content: image.content, scale: s, offset };
    };
  }

  adjustImagesToPieceWidth(): void { this.adjustImagesToPiece(Horizontal); }
  adjustImagesToPieceHeight(): void { this.adjustImagesToPiece(Vertical); }

  private _initializeEmptyPuzzle(): void {
    this._puzzle = new Puzzle(this.settings);
  }

  private _newPiece(structureLike: Structure.StructureLike, size: Size | null, metadata: any): Piece {
    return this.puzzle.newPiece(
      Structure.asStructure(structureLike),
      { centralAnchor: vector(metadata.currentPosition.x, metadata.currentPosition.y), metadata, size: size ?? undefined }
    );
  }

  get puzzleDiameter(): Vector {
    return this._puzzleDiameter || this.estimatedPuzzleDiameter;
  }

  get estimatedPuzzleDiameter(): Vector {
    return VectorModule.plus(VectorModule.multiply(this.pieceDiameter, this.maxPiecesCount), this.strokeWidth * 2);
  }

  get maxPiecesCount(): Vector {
    if (!this._maxPiecesCount) {
      throw new Error('max pieces count was not specified');
    }
    return this._maxPiecesCount;
  }

  get pieceRadius(): Vector {
    return this.pieceSize.radius;
  }

  get pieceDiameter(): Vector {
    return this.pieceSize.diameter;
  }

  get figurePadding(): Vector {
    if (!this._figurePadding) {
      this._figurePadding = VectorModule.plus(this.strokeWidth, this.borderFill);
    }
    return this._figurePadding;
  }

  get figuresCount(): number {
    return Object.values(this.figures).length;
  }

  get puzzle(): Puzzle {
    if (!this._puzzle) {
      this._initializeEmptyPuzzle();
    }
    return this._puzzle!;
  }

  get settings() {
    return { pieceRadius: this.pieceRadius, proximity: this.proximity };
  }
}
