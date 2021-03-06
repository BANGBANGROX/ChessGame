import { Piece, Position, TeamType } from "../../Constants";
import { isOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";

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
      !isOccupied({ x, y: y - pawnDirection }, boardState) &&
      !isOccupied(desiredPosition, boardState)
    );
  } else if (px === x && y - py === pawnDirection) {
    return !isOccupied(desiredPosition, boardState);
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
