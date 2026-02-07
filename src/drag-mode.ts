import type Piece from './piece'

export interface DragMode {
  dragShouldDisconnect: (piece: Piece, dx: number, dy: number) => boolean
}

export const TryDisconnection: DragMode = {
  dragShouldDisconnect(piece: Piece, dx: number, dy: number): boolean {
    return piece.horizontalConnector.openMovement(piece, dx)
      && piece.verticalConnector.openMovement(piece, dy)
  },
}

export const ForceDisconnection: DragMode = {
  dragShouldDisconnect(_piece: Piece, _dx: number, _dy: number): boolean {
    return true
  },
}

export const ForceConnection: DragMode = {
  dragShouldDisconnect(_piece: Piece, _dx: number, _dy: number): boolean {
    return false
  },
}
