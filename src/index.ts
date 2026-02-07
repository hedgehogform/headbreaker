import DummyPainter from "./dummy-painter";
import KonvaPainter from "./konva-painter";

export { anchor, Anchor } from "./anchor";
export {
  vector,
  cast,
  copy,
  equal,
  zero,
  update,
  diff,
  multiply,
  divide,
  plus,
  minus,
  apply,
  min,
  max,
  inner,
} from "./vector";
export * as Vector from "./vector";
export { radius, diameter } from "./size";
export type { Size } from "./size";
export * as Pair from "./pair";
export { Tab, Slot, None } from "./insert";
export type { Insert } from "./insert";
export { Horizontal, Vertical } from "./axis";
export type { Axis } from "./axis";
export { default as Puzzle } from "./puzzle";
export type { PuzzleDump, Settings } from "./puzzle";
export { default as Piece } from "./piece";
export type {
  PieceConfig,
  PieceDump,
  TranslationListener,
  ConnectionListener,
} from "./piece";
export { default as Canvas } from "./canvas";
export type { Figure, Template, CanvasMetadata, LabelMetadata } from "./canvas";
export { default as Manufacturer } from "./manufacturer";
export {
  InsertSequence,
  fixed,
  flipflop,
  twoAndTwo,
  random as randomSequence,
} from "./sequence";
export type { InsertsGenerator } from "./sequence";
export { PieceValidator, PuzzleValidator, NullValidator } from "./validator";
export type {
  Validator,
  ValidationListener,
  PieceCondition,
  PuzzleCondition,
} from "./validator";
export * as Structure from "./structure";

export { Classic, Squared, Rounded } from "./outline";
export * as Shuffler from "./shuffler";
export * as SpatialMetadata from "./spatial-metadata";
export * as Metadata from "./metadata";
export * as connector from "./connector";
export * as dragMode from "./drag-mode";
export * as generators from "./sequence";
export { DummyPainter, KonvaPainter };
export { default as Painter } from "./painter";
export const painters = {
  Dummy: DummyPainter,
  Konva: KonvaPainter,
} as const;

export * as Outline from "./outline";
export * as outline from "./outline";
