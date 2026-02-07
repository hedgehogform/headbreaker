import type { Anchor } from './anchor';
import type { Insert } from './insert';
import type Piece from './piece';
import { pivot } from './prelude';

export type ConnectionRequirement = (one: Piece, other: Piece) => boolean;

export function noConnectionRequirements(_one: Piece, _other: Piece): boolean {
  return true;
}

type InsertKey = 'right' | 'down' | 'left' | 'up';
type AnchorKey = 'rightAnchor' | 'downAnchor' | 'leftAnchor' | 'upAnchor';
type ConnectionKey
  = | 'rightConnection'
    | 'downConnection'
    | 'leftConnection'
    | 'upConnection';

interface PieceAccessor {
  forward: InsertKey;
  backward: InsertKey;
  forwardAnchor: AnchorKey;
  backwardAnchor: AnchorKey;
  forwardConnection: ConnectionKey;
  backwardConnection: ConnectionKey;
}

export class Connector {
  axis: 'x' | 'y';
  private readonly accessor: PieceAccessor;
  requirement: ConnectionRequirement;

  constructor(
    axis: 'x' | 'y',
    forward: 'right' | 'down',
    backward: 'left' | 'up',
  ) {
    this.axis = axis;
    this.accessor = {
      forward,
      backward,
      forwardAnchor: `${forward}Anchor` as AnchorKey,
      backwardAnchor: `${backward}Anchor` as AnchorKey,
      forwardConnection: `${forward}Connection` as ConnectionKey,
      backwardConnection: `${backward}Connection` as ConnectionKey,
    };
    this.requirement = noConnectionRequirements;
  }

  private getInsert(piece: Piece, key: InsertKey): Insert {
    return piece[key];
  }

  private getAnchor(piece: Piece, key: AnchorKey): Anchor {
    return piece[key];
  }

  private getConnection(piece: Piece, key: ConnectionKey): Piece | null {
    return piece[key];
  }

  private setConnection(
    piece: Piece,
    key: ConnectionKey,
    value: Piece | null,
  ): void {
    piece[key] = value;
  }

  attract(one: Piece, other: Piece, back: boolean = false): void {
    const [iron, magnet] = pivot(one, other, back);
    let dx: number, dy: number;
    if (magnet.centralAnchor![this.axis] > iron.centralAnchor![this.axis]) {
      [dx, dy] = this.getAnchor(magnet, this.accessor.backwardAnchor).diff(
        this.getAnchor(iron, this.accessor.forwardAnchor),
      );
    }
    else {
      [dx, dy] = this.getAnchor(magnet, this.accessor.forwardAnchor).diff(
        this.getAnchor(iron, this.accessor.backwardAnchor),
      );
    }
    iron.push(dx, dy);
  }

  openMovement(one: Piece, delta: number): boolean {
    return (
      (delta > 0
        && !this.getConnection(one, this.accessor.forwardConnection))
      || (delta < 0
        && !this.getConnection(one, this.accessor.backwardConnection))
      || delta === 0
    );
  }

  canConnectWith(one: Piece, other: Piece, proximity: number): boolean {
    return (
      this.closeTo(one, other, proximity)
      && this.match(one, other)
      && this.requirement(one, other)
    );
  }

  closeTo(one: Piece, other: Piece, proximity: number): boolean {
    return this.getAnchor(one, this.accessor.forwardAnchor).closeTo(
      this.getAnchor(other, this.accessor.backwardAnchor),
      proximity,
    );
  }

  match(one: Piece, other: Piece): boolean {
    return this.getInsert(one, this.accessor.forward).match(
      this.getInsert(other, this.accessor.backward),
    );
  }

  connectWith(
    one: Piece,
    other: Piece,
    proximity: number,
    back: boolean,
  ): void {
    if (!this.canConnectWith(one, other, proximity)) {
      throw new Error(`can not connect ${this.accessor.forward}!`);
    }
    if (this.getConnection(one, this.accessor.forwardConnection) !== other) {
      const iron = other;
      const magnet = one;
      this.attract(iron, magnet, back);
      this.setConnection(one, this.accessor.forwardConnection, other);
      this.setConnection(other, this.accessor.backwardConnection, one);
      one.fireConnect(other);
    }
  }

  attachRequirement(requirement: ConnectionRequirement): void {
    this.requirement = requirement;
  }

  static horizontal(): Connector {
    return new Connector('x', 'right', 'left');
  }

  static vertical(): Connector {
    return new Connector('y', 'down', 'up');
  }
}
