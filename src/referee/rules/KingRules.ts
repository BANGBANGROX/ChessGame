import { Piece, Position, TeamType } from "../../Constants";
import { isEmptyOrOccupiedByOpponent } from "./GeneralRules";

export const kingMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  const x = desiredPosition.x;
  const y = desiredPosition.y;
  const px = initialPosition.x;
  const py = initialPosition.y;

  if (
    (px == x && Math.abs(py - y) == 1) ||
    (py == y && Math.abs(px - x) == 1) ||
    (Math.abs(px - x) == 1 && Math.abs(py - y) == 1)
  ) {
    return isEmptyOrOccupiedByOpponent(desiredPosition, boardState, team);
  }

  return false;
};
