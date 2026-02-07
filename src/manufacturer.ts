import type { Anchor } from './anchor'
import type { PieceMetadata } from './piece'
import type Piece from './piece'
import type { Settings } from './puzzle'
import type { InsertsGenerator } from './sequence'
import type { Vector } from './vector'
import { anchor } from './anchor'
import * as Metadata from './metadata'
import Puzzle from './puzzle'
import { fixed, InsertSequence } from './sequence'

export default class Manufacturer {
  insertsGenerator: InsertsGenerator
  metadata: Partial<PieceMetadata>[]
  headAnchor: Anchor | null
  structure: Settings
  width!: number
  height!: number

  constructor() {
    this.insertsGenerator = fixed
    this.metadata = []
    this.headAnchor = null
    this.structure = {}
  }

  withMetadata(metadata: Partial<PieceMetadata>[]): void {
    this.metadata = metadata
  }

  withInsertsGenerator(generator: InsertsGenerator): void {
    this.insertsGenerator = generator || this.insertsGenerator
  }

  withHeadAt(a: Anchor): void {
    this.headAnchor = a
  }

  withStructure(structure: Settings): void {
    this.structure = structure
  }

  withDimensions(width: number, height: number): void {
    this.width = width
    this.height = height
  }

  build(): Puzzle {
    const puzzle = new Puzzle(this.structure)
    const positioner = new Positioner(puzzle, this.headAnchor)

    const verticalSequence = this._newSequence()
    let horizontalSequence: InsertSequence

    for (let y = 0; y < this.height; y++) {
      horizontalSequence = this._newSequence()
      verticalSequence.next()

      for (let x = 0; x < this.width; x++) {
        horizontalSequence.next()
        const piece = this._buildPiece(
          puzzle,
          horizontalSequence,
          verticalSequence,
        )
        piece.centerAround(positioner.naturalAnchor(x, y))
      }
    }
    this._annotateAll(puzzle.pieces)
    return puzzle
  }

  private _annotateAll(pieces: Piece[]): void {
    pieces.forEach((piece, index) => this._annotate(piece, index))
  }

  private _annotate(piece: Piece, index: number): void {
    const baseMetadata = this.metadata[index]
    const metadata: Partial<PieceMetadata> = baseMetadata
      ? Metadata.copy(baseMetadata)
      : {}
    metadata.id = metadata.id || String(index + 1)
    piece.annotate(metadata)
  }

  private _newSequence(): InsertSequence {
    return new InsertSequence(this.insertsGenerator)
  }

  private _buildPiece(
    puzzle: Puzzle,
    horizontalSequence: InsertSequence,
    verticalSequence: InsertSequence,
  ): Piece {
    return puzzle.newPiece({
      left: horizontalSequence.previousComplement(),
      up: verticalSequence.previousComplement(),
      right: horizontalSequence.current(this.width),
      down: verticalSequence.current(this.height),
    })
  }
}

class Positioner {
  puzzle: Puzzle
  offset: Vector

  constructor(puzzle: Puzzle, headAnchor: Anchor | null) {
    this.puzzle = puzzle
    if (headAnchor) {
      this.offset = headAnchor.asVector()
    }
    else {
      this.offset = this.pieceDiameter
    }
  }

  get pieceDiameter(): Vector {
    return this.puzzle.pieceDiameter
  }

  naturalAnchor(x: number, y: number): Anchor {
    return anchor(
      x * this.pieceDiameter.x + this.offset.x,
      y * this.pieceDiameter.y + this.offset.y,
    )
  }
}
