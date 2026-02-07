import type Piece from './piece'
import type { PieceCondition, PuzzleCondition } from './validator'
import type { Vector } from './vector'
import { PuzzleValidator } from './validator'
import * as VectorModule from './vector'

export interface SpatialMetadataFields {
  targetPosition?: Vector
  currentPosition?: Vector
}

function diffToTarget(piece: Piece): [number, number] {
  return VectorModule.diff(
    piece.metadata.targetPosition,
    piece.centralAnchor!.asVector(),
  )
}

export const relativePosition: PuzzleCondition = (puzzle) => {
  const diff0 = diffToTarget(puzzle.head)
  return puzzle.pieces.every(piece =>
    PuzzleValidator.equalDiffs(diff0, diffToTarget(piece)),
  )
}

export const solved: PuzzleCondition = puzzle =>
  relativePosition(puzzle) && PuzzleValidator.connected(puzzle)

export const absolutePosition: PieceCondition = piece =>
  VectorModule.equal(
    piece.centralAnchor!.asVector(),
    piece.metadata.targetPosition,
  )

export function initialize(
  metadata: SpatialMetadataFields,
  target: Vector,
  current?: Vector,
): void {
  metadata.targetPosition = metadata.targetPosition || target
  metadata.currentPosition
    = metadata.currentPosition
      || current
      || VectorModule.copy(metadata.targetPosition)
}
