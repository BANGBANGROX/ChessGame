import {
  Piece,
  PieceType,
  Position,
  samePosition,
  TeamType,
} from "../../Constants";
import {
  isEmptyOrOccupiedByOpponent,
  tileIsOccupied,
  tileIsOccupiedByOpponent,
} from "./GeneralRules";

export const rookMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  const x = desiredPosition.x;
  const y = desiredPosition.y;
  const px = initialPosition.x;
  const py = initialPosition.y;

  // VERTICAL Movement
  if (x === px) {
    const multiplier = y > py ? 1 : -1;

    for (let i = 1; i < 8; ++i) {
      let passedPosition: Position = { x, y: py + multiplier * i };

      if (samePosition(passedPosition, desiredPosition)) {
        return isEmptyOrOccupiedByOpponent(desiredPosition, boardState, team);
      }

      if (tileIsOccupied(passedPosition, boardState)) {
        return false;
      }
    }
  }

  // HORIZONTAL Movement
  if (y === py) {
    const multiplier = x > px ? 1 : -1;

    for (let i = 1; i < 8; ++i) {
      let passedPosition: Position = { x: px + multiplier * i, y };

      if (samePosition(passedPosition, desiredPosition)) {
        return isEmptyOrOccupiedByOpponent(desiredPosition, boardState, team);
      }

      if (tileIsOccupied(passedPosition, boardState)) {
        return false;
      }
    }
  }
  return false;
};

export const getPossibleRookMoves = (
  rook: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  // Upper Movement
  for (let i = 1; i < 8; ++i) {
    const destination: Position = {
      x: rook.position.x,
      y: rook.position.y + i,
    };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardState, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else break;
  }

  // Downward movement
  for (let i = 1; i < 8; ++i) {
    const destination: Position = {
      x: rook.position.x,
      y: rook.position.y - i,
    };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardState, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else break;
  }

  // Rightward movement
  for (let i = 1; i < 8; ++i) {
    const destination: Position = {
      x: rook.position.x + i,
      y: rook.position.y,
    };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardState, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else break;
  }

  // Leftward movement
  for (let i = 1; i < 8; ++i) {
    const destination: Position = {
      x: rook.position.x - i,
      y: rook.position.y,
    };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardState, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else break;
  }

  return possibleMoves;
};
