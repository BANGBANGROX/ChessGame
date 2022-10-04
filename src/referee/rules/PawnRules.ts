import {
  Piece,
  PieceType,
  Position,
  samePosition,
  TeamType,
} from "../../Constants";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";

export const pawnMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  const x = desiredPosition.x;
  const y = desiredPosition.y;
  const px = initialPosition.x;
  const py = initialPosition.y;

  const specialRow = team === TeamType.WHITE ? 1 : 6;
  const pawnDirection = team === TeamType.WHITE ? 1 : -1;

  // MOVEMENT LOGIC
  if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
    return (
      !tileIsOccupied({ x, y: y - pawnDirection }, boardState) &&
      !tileIsOccupied(desiredPosition, boardState)
    );
  } else if (px === x && y - py === pawnDirection) {
    return !tileIsOccupied(desiredPosition, boardState);
  }
  // ATTACKING LOGIC
  else if (x - px === -1 && y - py === pawnDirection) {
    // Attack in upper or bottom left corner
    if (tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
      return true;
    }
  } else if (x - px === 1 && y - py == pawnDirection) {
    // Attack in upper or bottom right corner
    if (tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
      return true;
    }
  }

  return false;
};

export const getPossiblePawnMoves = (
  pawn: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];
  const pawnDirection = pawn.team === TeamType.WHITE ? 1 : -1;
  const specialRow = pawn.team === TeamType.WHITE ? 1 : 6;
  const normalMove: Position = {
    x: pawn.position.x,
    y: pawn.position.y + pawnDirection,
  };
  const specialMove: Position = {
    x: normalMove.x,
    y: normalMove.y + pawnDirection,
  };
  const upperLeftAttack: Position = { x: normalMove.x - 1, y: normalMove.y };
  const upperRightAttack: Position = { x: normalMove.x + 1, y: normalMove.y };
  const leftPosition: Position = { x: pawn.position.x - 1, y: pawn.position.y };
  const rightPosition: Position = {
    x: pawn.position.x + 1,
    y: pawn.position.y,
  };

  if (!tileIsOccupied(normalMove, boardState)) {
    possibleMoves.push(normalMove);

    if (
      pawn.position.y === specialRow &&
      !tileIsOccupied(specialMove, boardState)
    ) {
      possibleMoves.push(specialMove);
    }
  }

  if (tileIsOccupiedByOpponent(upperLeftAttack, boardState, pawn.team)) {
    possibleMoves.push(upperLeftAttack);
  } else if (!tileIsOccupied(upperLeftAttack, boardState)) {
    const leftPiece = boardState.find((p) =>
      samePosition(leftPosition, p.position)
    );
    if (leftPiece != null && leftPiece.enPassent) {
      possibleMoves.push(upperLeftAttack);
    }
  }

  if (tileIsOccupiedByOpponent(upperRightAttack, boardState, pawn.team)) {
    possibleMoves.push(upperRightAttack);
  } else if (!tileIsOccupied(upperRightAttack, boardState)) {
    const rightPiece = boardState.find((p) =>
      samePosition(p.position, rightPosition)
    );
    if (rightPiece != null && rightPiece.enPassent) {
      possibleMoves.push(upperRightAttack);
    }
  }

  return possibleMoves;
};
