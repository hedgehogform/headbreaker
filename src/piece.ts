import * as Pair from "./pair";
import { anchor, Anchor } from "./anchor";
import { None, type Insert } from "./insert";
import { Connector } from "./connector";
import * as Structure from "./structure";
import { itself, orthogonalTransform, type Orthogonal } from "./prelude";
import type { Vector } from "./vector";
import type { Size } from "./size";
import type Puzzle from "./puzzle";
import type { ImageLike } from "./image-metadata";

export type TranslationListener = (
  piece: Piece,
  dx: number,
  dy: number,
) => void;
export type ConnectionListener = (piece: Piece, target: Piece) => void;

export interface LabelMetadata {
  text?: string;
  fontSize?: number;
  x?: number;
  y?: number;
  fontFamily?: string;
  color?: string;
}

export interface PieceMetadata {
  id: string | number;
  targetPosition: Vector;
  currentPosition: Vector;
  color?: string;
  fixed?: boolean;
  strokeColor?: string;
  image?: ImageLike;
  label: LabelMetadata;
  scale?: number;
  [key: string]: unknown;
}

export interface PieceConfig {
  centralAnchor?: Vector;
  size?: Size;
  metadata?: Partial<PieceMetadata>;
}

export interface PieceConnectionDump {
  id: string | number | undefined;
}

export interface PieceDump {
  centralAnchor: Vector | null;
  size?: { radius: Vector };
  metadata: Partial<PieceMetadata>;
  connections?: Orthogonal<PieceConnectionDump | null | undefined>;
  structure: string;
}

export default class Piece {
  up: Insert;
  down: Insert;
  left: Insert;
  right: Insert;
  metadata: PieceMetadata;
  centralAnchor!: Anchor | null;
  _size: Size | null;
  puzzle!: Puzzle;

  upConnection: Piece | null = null;
  downConnection: Piece | null = null;
  leftConnection: Piece | null = null;
  rightConnection: Piece | null = null;

  private _horizontalConnector: Connector | null = null;
  private _verticalConnector: Connector | null = null;

  translateListeners: TranslationListener[] = [];
  connectListeners: ConnectionListener[] = [];
  disconnectListeners: ConnectionListener[] = [];

  constructor(
    {
      up = None,
      down = None,
      left = None,
      right = None,
    }: Structure.Structure = {},
    config: PieceConfig = {},
  ) {
    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
    this.metadata = {} as PieceMetadata;
    this.centralAnchor = null;
    this._size = null;
    this.configure(config);
  }

  configure(config: PieceConfig): void {
    if (config.centralAnchor) {
      this.centerAround(Anchor.import(config.centralAnchor));
    }
    if (config.metadata) {
      this.annotate(config.metadata);
    }
    if (config.size) {
      this.resize(config.size);
    }
  }

  annotate(metadata: Partial<PieceMetadata> | null | undefined): void {
    Object.assign(this.metadata, metadata);
  }

  reannotate(metadata: Partial<PieceMetadata>): void {
    this.metadata = metadata as PieceMetadata;
  }

  belongTo(puzzle: Puzzle): void {
    this.puzzle = puzzle;
  }

  get presentConnections(): Piece[] {
    return this.connections.filter(itself) as Piece[];
  }

  get connections(): (Piece | null)[] {
    return [
      this.rightConnection,
      this.downConnection,
      this.leftConnection,
      this.upConnection,
    ];
  }

  get inserts(): Insert[] {
    return [this.right, this.down, this.left, this.up];
  }

  onTranslate(f: TranslationListener): void {
    this.translateListeners.push(f);
  }

  onConnect(f: ConnectionListener): void {
    this.connectListeners.push(f);
  }

  onDisconnect(f: ConnectionListener): void {
    this.disconnectListeners.push(f);
  }

  fireTranslate(dx: number, dy: number): void {
    this.translateListeners.forEach((it) => it(this, dx, dy));
  }

  fireConnect(other: Piece): void {
    this.connectListeners.forEach((it) => it(this, other));
  }

  fireDisconnect(others: Piece[]): void {
    others.forEach((other) => {
      this.disconnectListeners.forEach((it) => it(this, other));
    });
  }

  connectVerticallyWith(other: Piece, back: boolean = false): void {
    this.verticalConnector.connectWith(this, other, this.proximity, back);
  }

  attractVertically(other: Piece, back: boolean = false): void {
    this.verticalConnector.attract(this, other, back);
  }

  connectHorizontallyWith(other: Piece, back: boolean = false): void {
    this.horizontalConnector.connectWith(this, other, this.proximity, back);
  }

  attractHorizontally(other: Piece, back: boolean = false): void {
    this.horizontalConnector.attract(this, other, back);
  }

  tryConnectWith(other: Piece, back: boolean = false): void {
    this.tryConnectHorizontallyWith(other, back);
    this.tryConnectVerticallyWith(other, back);
  }

  tryConnectHorizontallyWith(other: Piece, back: boolean = false): void {
    if (this.canConnectHorizontallyWith(other)) {
      this.connectHorizontallyWith(other, back);
    }
  }

  tryConnectVerticallyWith(other: Piece, back: boolean = false): void {
    if (this.canConnectVerticallyWith(other)) {
      this.connectVerticallyWith(other, back);
    }
  }

  disconnect(): void {
    if (!this.connected) return;
    const connections = this.presentConnections;

    if (this.upConnection) {
      this.upConnection.downConnection = null;
      this.upConnection = null;
    }
    if (this.downConnection) {
      this.downConnection.upConnection = null;
      this.downConnection = null;
    }
    if (this.leftConnection) {
      this.leftConnection.rightConnection = null;
      this.leftConnection = null;
    }
    if (this.rightConnection) {
      this.rightConnection.leftConnection = null;
      this.rightConnection = null;
    }
    this.fireDisconnect(connections);
  }

  centerAround(a: Anchor): void {
    if (this.centralAnchor) {
      throw new Error(
        "this pieces has already being centered. Use recenterAround instead",
      );
    }
    this.centralAnchor = a;
  }

  locateAt(x: number, y: number): void {
    this.centerAround(anchor(x, y));
  }

  isAt(x: number, y: number): boolean {
    return this.centralAnchor!.isAt(x, y);
  }

  recenterAround(a: Anchor, quiet: boolean = false): void {
    const [dx, dy] = a.diff(this.centralAnchor!);
    this.translate(dx, dy, quiet);
  }

  relocateTo(x: number, y: number, quiet: boolean = false): void {
    this.recenterAround(anchor(x, y), quiet);
  }

  translate(dx: number, dy: number, quiet: boolean = false): void {
    if (!Pair.isNull(dx, dy)) {
      this.centralAnchor!.translate(dx, dy);
      if (!quiet) {
        this.fireTranslate(dx, dy);
      }
    }
  }

  push(
    dx: number,
    dy: number,
    quiet: boolean = false,
    pushedPieces: Piece[] = [this],
  ): void {
    this.translate(dx, dy, quiet);
    const stationaries = this.presentConnections.filter(
      (it) => !pushedPieces.includes(it),
    );
    pushedPieces.push(...stationaries);
    stationaries.forEach((it) => it.push(dx, dy, false, pushedPieces));
  }

  drag(dx: number, dy: number, quiet: boolean = false): void {
    if (Pair.isNull(dx, dy)) return;
    if (this.dragShouldDisconnect(dx, dy)) {
      this.disconnect();
      this.translate(dx, dy, quiet);
    } else {
      this.push(dx, dy, quiet);
    }
  }

  dragShouldDisconnect(dx: number, dy: number): boolean {
    return this.puzzle.dragShouldDisconnect(this, dx, dy);
  }

  drop(): void {
    this.puzzle.autoconnectWith(this);
  }

  dragAndDrop(dx: number, dy: number): void {
    this.drag(dx, dy);
    this.drop();
  }

  canConnectHorizontallyWith(other: Piece): boolean {
    return this.horizontalConnector.canConnectWith(this, other, this.proximity);
  }

  canConnectVerticallyWith(other: Piece): boolean {
    return this.verticalConnector.canConnectWith(this, other, this.proximity);
  }

  verticallyCloseTo(other: Piece): boolean {
    return this.verticalConnector.closeTo(this, other, this.proximity);
  }

  horizontallyCloseTo(other: Piece): boolean {
    return this.horizontalConnector.closeTo(this, other, this.proximity);
  }

  verticallyMatch(other: Piece): boolean {
    return this.verticalConnector.match(this, other);
  }

  horizontallyMatch(other: Piece): boolean {
    return this.horizontalConnector.match(this, other);
  }

  get connected(): boolean {
    return !!(
      this.upConnection ||
      this.downConnection ||
      this.leftConnection ||
      this.rightConnection
    );
  }

  get downAnchor(): Anchor {
    return this.centralAnchor!.translated(0, this.radius.y);
  }

  get rightAnchor(): Anchor {
    return this.centralAnchor!.translated(this.radius.x, 0);
  }

  get upAnchor(): Anchor {
    return this.centralAnchor!.translated(0, -this.radius.y);
  }

  get leftAnchor(): Anchor {
    return this.centralAnchor!.translated(-this.radius.x, 0);
  }

  resize(size: Size): void {
    this._size = size;
  }

  get radius(): Vector {
    return this.size.radius;
  }

  get diameter(): Vector {
    return this.size.diameter;
  }

  get size(): Size {
    return this._size || this.puzzle.pieceSize;
  }

  get proximity(): number {
    return this.puzzle.proximity;
  }

  get id(): string | number {
    return this.metadata.id;
  }

  get horizontalConnector(): Connector {
    return this.getConnector("horizontal");
  }

  get verticalConnector(): Connector {
    return this.getConnector("vertical");
  }

  getConnector(kind: "vertical" | "horizontal"): Connector {
    if (kind === "horizontal") {
      if (this.puzzle && !this._horizontalConnector) {
        return this.puzzle.horizontalConnector;
      }
      this._horizontalConnector ??= Connector.horizontal();
      return this._horizontalConnector;
    } else {
      if (this.puzzle && !this._verticalConnector) {
        return this.puzzle.verticalConnector;
      }
      this._verticalConnector ??= Connector.vertical();
      return this._verticalConnector;
    }
  }

  export({ compact = false } = {}): PieceDump {
    const base: PieceDump = {
      centralAnchor: this.centralAnchor ? this.centralAnchor.export() : null,
      structure: Structure.serialize(this),
      metadata: this.metadata,
    };
    if (this._size) {
      base.size = { radius: this._size.radius };
    }
    return compact
      ? base
      : Object.assign(base, {
          connections: orthogonalTransform(this.connections, (it: Piece) => ({
            id: it.id,
          })),
        });
  }

  static import(dump: PieceDump): Piece {
    return new Piece(Structure.deserialize(dump.structure), {
      centralAnchor: dump.centralAnchor ?? undefined,
      metadata: dump.metadata,
      size: dump.size as Size | undefined,
    });
  }
}
