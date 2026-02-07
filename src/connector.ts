import { pivot } from './prelude';
import type Piece from './piece';

export type ConnectionRequirement = (one: Piece, other: Piece) => boolean;

export function noConnectionRequirements(_one: Piece, _other: Piece): boolean {
  return true;
}

export class Connector {
  axis: 'x' | 'y';
  forward: 'right' | 'down';
  backward: 'left' | 'up';
  forwardAnchor: string;
  backwardAnchor: string;
  forwardConnection: string;
  backwardConnection: string;
  requirement: ConnectionRequirement;

  constructor(axis: 'x' | 'y', forward: 'right' | 'down', backward: 'left' | 'up') {
    this.axis = axis;
    this.forward = forward;
    this.backward = backward;
    this.forwardAnchor = `${forward}Anchor`;
    this.backwardAnchor = `${backward}Anchor`;
    this.forwardConnection = `${forward}Connection`;
    this.backwardConnection = `${backward}Connection`;
    this.requirement = noConnectionRequirements;
  }

  attract(one: Piece, other: Piece, back: boolean = false): void {
    const [iron, magnet] = pivot(one, other, back);
    let dx: number, dy: number;
    if ((magnet.centralAnchor as any)[this.axis] > (iron.centralAnchor as any)[this.axis]) {
      [dx, dy] = (magnet as any)[this.backwardAnchor].diff((iron as any)[this.forwardAnchor]);
    } else {
      [dx, dy] = (magnet as any)[this.forwardAnchor].diff((iron as any)[this.backwardAnchor]);
    }
    iron.push(dx, dy);
  }

  openMovement(one: Piece, delta: number): boolean {
    return (delta > 0 && !(one as any)[this.forwardConnection])
      || (delta < 0 && !(one as any)[this.backwardConnection])
      || delta === 0;
  }

  canConnectWith(one: Piece, other: Piece, proximity: number): boolean {
    return this.closeTo(one, other, proximity) && this.match(one, other) && this.requirement(one, other);
  }

  closeTo(one: Piece, other: Piece, proximity: number): boolean {
    return (one as any)[this.forwardAnchor].closeTo((other as any)[this.backwardAnchor], proximity);
  }

  match(one: Piece, other: Piece): boolean {
    return (one as any)[this.forward].match((other as any)[this.backward]);
  }

  connectWith(one: Piece, other: Piece, proximity: number, back: boolean): void {
    if (!this.canConnectWith(one, other, proximity)) {
      throw new Error(`can not connect ${this.forward}!`);
    }
    if ((one as any)[this.forwardConnection] !== other) {
      this.attract(other, one, back);
      (one as any)[this.forwardConnection] = other;
      (other as any)[this.backwardConnection] = one;
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
