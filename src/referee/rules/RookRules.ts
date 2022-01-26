import { Piece, Position, samePosition, TeamType } from "../../Constants";
import { isEmptyOrOccupiedByOpponent, isOccupied } from "./GeneralRules";

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

      if (isOccupied(passedPosition, boardState)) {
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

      if (isOccupied(passedPosition, boardState)) {
        return false;
      }
    }
  }
  return false;
};
