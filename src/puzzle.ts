import type { Anchor } from './anchor'
import type { ConnectionRequirement } from './connector'
import type { Pair } from './pair'
import type {
  ConnectionListener,
  PieceConfig,
  PieceDump,
  PieceMetadata,
  TranslationListener,
} from './piece'
import type { Size } from './size'
import type { Structure } from './structure'
import type { ValidationListener, Validator } from './validator'
import type { Vector } from './vector'
import {

  Connector,
  noConnectionRequirements,
} from './connector'
import * as dragMode from './drag-mode'
import Piece from './piece'
import * as Shuffler from './shuffler'
import { radius } from './size'
import {
  NullValidator,

} from './validator'

export interface PuzzleDump {
  pieceRadius: Vector
  proximity: number
  pieces: PieceDump[]
}

export interface Settings {
  pieceRadius?: Vector | number
  proximity?: number
}

export default class Puzzle {
  pieceSize: Size
  proximity: number
  pieces: Piece[]
  validator: Validator
  dragMode: dragMode.DragMode
  horizontalConnector: Connector
  verticalConnector: Connector

  constructor({ pieceRadius = 2, proximity = 1 }: Settings = {}) {
    this.pieceSize = radius(pieceRadius)
    this.proximity = proximity
    this.pieces = []
    this.validator = new NullValidator()
    this.dragMode = dragMode.TryDisconnection
    this.horizontalConnector = Connector.horizontal()
    this.verticalConnector = Connector.vertical()
  }

  newPiece(structure: Structure = {}, config: PieceConfig = {}): Piece {
    const piece = new Piece(structure, config)
    this.addPiece(piece)
    return piece
  }

  addPiece(piece: Piece): void {
    this.pieces.push(piece)
    piece.belongTo(this)
  }

  addPieces(pieces: Piece[]): void {
    pieces.forEach(it => this.addPiece(it))
  }

  annotate(metadata: Partial<PieceMetadata>[]): void {
    this.pieces.forEach((piece, index) => piece.annotate(metadata[index]))
  }

  relocateTo(points: Pair[]): void {
    this.pieces.forEach((piece, index) => piece.relocateTo(...points[index]))
  }

  autoconnect(): void {
    this.pieces.forEach(it => this.autoconnectWith(it))
  }

  disconnect(): void {
    this.pieces.forEach(it => it.disconnect())
  }

  autoconnectWith(piece: Piece): void {
    this.pieces
      .filter(it => it !== piece)
      .forEach((other) => {
        piece.tryConnectWith(other)
        other.tryConnectWith(piece, true)
      })
  }

  shuffle(maxX: number, maxY: number): void {
    this.shuffleWith(Shuffler.random(maxX, maxY))
  }

  shuffleWith(shuffler: Shuffler.Shuffler): void {
    this.disconnect()
    shuffler(this.pieces).forEach(({ x, y }, index) => {
      this.pieces[index].relocateTo(x, y)
    })
    this.autoconnect()
  }

  translate(dx: number, dy: number): void {
    this.pieces.forEach(it => it.translate(dx, dy))
  }

  reframe(min: Vector, max: Vector): void {
    let dx: number
    const leftOffstage
      = min.x - Math.min(...this.pieces.map(it => it.leftAnchor.x))
    if (leftOffstage > 0) {
      dx = leftOffstage
    }
    else {
      const rightOffstage
        = max.x - Math.max(...this.pieces.map(it => it.rightAnchor.x))
      dx = Math.min(rightOffstage, 0)
    }

    let dy: number
    const upOffstage
      = min.y - Math.min(...this.pieces.map(it => it.upAnchor.y))
    if (upOffstage > 0) {
      dy = upOffstage
    }
    else {
      const downOffstage
        = max.y - Math.max(...this.pieces.map(it => it.downAnchor.y))
      dy = Math.min(downOffstage, 0)
    }

    this.translate(dx, dy)
  }

  onTranslate(f: TranslationListener): void {
    this.pieces.forEach(it => it.onTranslate(f))
  }

  onConnect(f: ConnectionListener): void {
    this.pieces.forEach(it => it.onConnect(f))
  }

  onDisconnect(f: ConnectionListener): void {
    this.pieces.forEach(it => it.onDisconnect(f))
  }

  onValid(f: ValidationListener): void {
    this.validator.onValid(f)
  }

  get points(): Pair[] {
    return this.pieces.map(it => it.centralAnchor!.asPair())
  }

  get refs(): Pair[] {
    return this.points.map(([x, y], index) => {
      const d = this.pieces[index].diameter
      return [x / d.x, y / d.y]
    })
  }

  get metadata(): PieceMetadata[] {
    return this.pieces.map(it => it.metadata)
  }

  get head(): Piece {
    return this.pieces[0]
  }

  get headAnchor(): Anchor {
    return this.head.centralAnchor!
  }

  get verticalRequirement(): ConnectionRequirement {
    return this.verticalConnector.requirement
  }

  get horizontalRequirement(): ConnectionRequirement {
    return this.horizontalConnector.requirement
  }

  attachHorizontalConnectionRequirement(
    requirement: ConnectionRequirement,
  ): void {
    this.horizontalConnector.attachRequirement(requirement)
  }

  attachVerticalConnectionRequirement(
    requirement: ConnectionRequirement,
  ): void {
    this.verticalConnector.attachRequirement(requirement)
  }

  attachConnectionRequirement(requirement: ConnectionRequirement): void {
    this.attachHorizontalConnectionRequirement(requirement)
    this.attachVerticalConnectionRequirement(requirement)
  }

  clearConnectionRequirements(): void {
    this.attachConnectionRequirement(noConnectionRequirements)
  }

  attachValidator(validator: Validator): void {
    this.validator = validator
  }

  isValid(): boolean {
    return this.validator.isValid(this)
  }

  get valid(): boolean | undefined {
    return this.validator.valid
  }

  validate(): void {
    this.validator.validate(this)
  }

  updateValidity(): void {
    this.validator.validate(this)
  }

  get connected(): boolean {
    return this.pieces.every(it => it.connected)
  }

  get pieceDiameter(): Vector {
    return this.pieceSize.diameter
  }

  get pieceRadius(): Vector {
    return this.pieceSize.radius
  }

  forceConnectionWhileDragging(): void {
    this.dragMode = dragMode.ForceConnection
  }

  forceDisconnectionWhileDragging(): void {
    this.dragMode = dragMode.ForceDisconnection
  }

  tryDisconnectionWhileDragging(): void {
    this.dragMode = dragMode.TryDisconnection
  }

  dragShouldDisconnect(piece: Piece, dx: number, dy: number): boolean {
    return this.dragMode.dragShouldDisconnect(piece, dx, dy)
  }

  export(options: { compact?: boolean } = {}): PuzzleDump {
    return {
      pieceRadius: this.pieceRadius,
      proximity: this.proximity,
      pieces: this.pieces.map(it => it.export(options)),
    }
  }

  static import(dump: PuzzleDump): Puzzle {
    const puzzle = new Puzzle({
      pieceRadius: dump.pieceRadius,
      proximity: dump.proximity,
    })
    puzzle.addPieces(dump.pieces.map(it => Piece.import(it)))
    puzzle.autoconnect()
    return puzzle
  }
}
