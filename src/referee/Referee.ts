import { PieceType, TeamType, Piece, Position } from "../Constants";
import {
  pawnMove,
  knightMove,
  bishopMove,
  rookMove,
  queenMove,
  kingMove,
  getPossiblePawnMoves,
  getPossibleKnightMoves,
  getPossibleBishopMoves,
  getPossibleRookMoves,
  getPossibleQueenMoves,
  getPossibleKingMoves,
} from "./rules";

export default class Referee {
  isEnPassentMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    const pawnDirection = team === TeamType.WHITE ? 1 : -1;
    const x = desiredPosition.x;
    const y = desiredPosition.y;
    const px = initialPosition.x;
    const py = initialPosition.y;

    if (type === PieceType.PAWN) {
      if ((x - px === -1 || x - px === 1) && y - py === pawnDirection) {
        const piece = boardState.find(
          (p) =>
            p.position.x === x &&
            p.position.y === y - pawnDirection &&
            p.enPassent
        );
        if (piece) {
          return true;
        }
      }
    }

    return false;
  }

  isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    if (type === PieceType.PAWN) {
      return pawnMove(initialPosition, desiredPosition, team, boardState);
    } else if (type === PieceType.KNIGHT) {
      return knightMove(initialPosition, desiredPosition, team, boardState);
    } else if (type === PieceType.BISHOP) {
      return bishopMove(initialPosition, desiredPosition, team, boardState);
    } else if (type === PieceType.ROOK) {
      return rookMove(initialPosition, desiredPosition, team, boardState);
    } else if (type === PieceType.QUEEN) {
      return queenMove(initialPosition, desiredPosition, team, boardState);
    } else if (type == PieceType.KING) {
      return kingMove(initialPosition, desiredPosition, team, boardState);
    }

    return false;
  }

  getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
    switch (piece.type) {
      case PieceType.PAWN:
        return getPossiblePawnMoves(piece, boardState);
      case PieceType.KNIGHT:
        return getPossibleKnightMoves(piece, boardState);
      case PieceType.BISHOP:
        return getPossibleBishopMoves(piece, boardState);
      case PieceType.ROOK:
        return getPossibleRookMoves(piece, boardState);
      case PieceType.QUEEN:
        return getPossibleQueenMoves(piece, boardState);
      case PieceType.KING:
        return getPossibleKingMoves(piece, boardState);
      default:
        return [];
    }
  }
}
