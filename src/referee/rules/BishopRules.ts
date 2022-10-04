import { Piece, Position, samePosition, TeamType } from "../../Constants";
import {
  isEmptyOrOccupiedByOpponent,
  tileIsOccupied,
  tileIsOccupiedByOpponent,
} from "./GeneralRules";

export const bishopMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  const x = desiredPosition.x;
  const y = desiredPosition.y;
  const px = initialPosition.x;
  const py = initialPosition.y;

  for (let i = 1; i < 8; ++i) {
    // TOP RIGHT Movement
    if (x > px && y > py) {
      let passedPosition: Position = { x: px + i, y: py + i };

      if (samePosition(passedPosition, desiredPosition)) {
        return isEmptyOrOccupiedByOpponent(desiredPosition, boardState, team);
      }

      if (tileIsOccupied(passedPosition, boardState)) {
        return false;
      }
    }

    // BOTTOM RIGHT Movement
    if (x > px && y < py) {
      let passedPosition: Position = { x: px + i, y: py - i };

      if (samePosition(passedPosition, desiredPosition)) {
        return isEmptyOrOccupiedByOpponent(desiredPosition, boardState, team);
      }

      if (tileIsOccupied(passedPosition, boardState)) {
        return false;
      }
    }

    // TOP LEFT Movement
    if (x < px && y > py) {
      let passedPosition: Position = { x: px - i, y: py + i };

      if (samePosition(passedPosition, desiredPosition)) {
        return isEmptyOrOccupiedByOpponent(desiredPosition, boardState, team);
      }

      if (tileIsOccupied(passedPosition, boardState)) {
        return false;
      }
    }

    // BOTTOM LEFT Movement
    if (x < px && y < py) {
      let passedPosition: Position = { x: px - i, y: py - i };

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

export const getPossibleBishopMoves = (
  bishop: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  // Upper right Movement
  for (let i = 1; i < 8; ++i) {
    const destination: Position = {
      x: bishop.position.x + i,
      y: bishop.position.y + i,
    };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
      possibleMoves.push(destination);
      break;
    } else break;
  }

  // Bottom right movement
  for (let i = 1; i < 8; ++i) {
    const destination: Position = {
      x: bishop.position.x + i,
      y: bishop.position.y - i,
    };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
      possibleMoves.push(destination);
      break;
    } else break;
  }

  // Upper left movement
  for (let i = 1; i < 8; ++i) {
    const destination: Position = {
      x: bishop.position.x - i,
      y: bishop.position.y + i,
    };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
      possibleMoves.push(destination);
      break;
    } else break;
  }

  // Bottom left movement
  for (let i = 1; i < 8; ++i) {
    const destination: Position = {
      x: bishop.position.x - i,
      y: bishop.position.y - i,
    };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
      possibleMoves.push(destination);
      break;
    } else break;
  }

  return possibleMoves;
};
