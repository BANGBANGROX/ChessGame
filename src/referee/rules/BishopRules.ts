import { Piece, Position, samePosition, TeamType } from "../../Constants";
import { isEmptyOrOccupiedByOpponent, isOccupied } from "./GeneralRules";

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

      if (isOccupied(passedPosition, boardState)) {
        return false;
      }
    }

    // BOTTOM RIGHT Movement
    if (x > px && y < py) {
      let passedPosition: Position = { x: px + i, y: py - i };

      if (samePosition(passedPosition, desiredPosition)) {
        return isEmptyOrOccupiedByOpponent(desiredPosition, boardState, team);
      }

      if (isOccupied(passedPosition, boardState)) {
        return false;
      }
    }

    // TOP LEFT Movement
    if (x < px && y > py) {
      let passedPosition: Position = { x: px - i, y: py + i };

      if (samePosition(passedPosition, desiredPosition)) {
        return isEmptyOrOccupiedByOpponent(desiredPosition, boardState, team);
      }

      if (isOccupied(passedPosition, boardState)) {
        return false;
      }
    }

    // BOTTOM LEFT Movement
    if (x < px && y < py) {
      let passedPosition: Position = { x: px - i, y: py - i };

      if (samePosition(passedPosition, desiredPosition)) {
        return isEmptyOrOccupiedByOpponent(desiredPosition, boardState, team);
      }

      if (isOccupied(passedPosition, boardState)) {
        return false;
      }
    }
  }

  return false;
};
