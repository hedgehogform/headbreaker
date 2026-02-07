import * as VectorModule from './vector';
import type { Vector } from './vector';
import type Piece from './piece';
import { PuzzleValidator } from './validator';
import type { PieceCondition, PuzzleCondition } from './validator';

export interface SpatialMetadataFields {
  targetPosition?: Vector;
  currentPosition?: Vector;
}

function diffToTarget(piece: Piece): [number, number] {
  return VectorModule.diff(piece.metadata.targetPosition, piece.centralAnchor!.asVector());
}

export const solved: PuzzleCondition = (puzzle) =>
  relativePosition(puzzle) && PuzzleValidator.connected(puzzle);

export const relativePosition: PuzzleCondition = (puzzle) => {
  const diff0 = diffToTarget(puzzle.head);
  return puzzle.pieces.every(piece => PuzzleValidator.equalDiffs(diff0, diffToTarget(piece)));
};

export const absolutePosition: PieceCondition = (piece) =>
  VectorModule.equal(piece.centralAnchor!.asVector(), piece.metadata.targetPosition);

export function initialize(metadata: any, target: Vector, current?: Vector): void {
  metadata.targetPosition = metadata.targetPosition || target;
  metadata.currentPosition = metadata.currentPosition || current || VectorModule.copy(metadata.targetPosition);
}
