import { Piece, Position, TeamType } from "../../Constants";
import { isEmptyOrOccupiedByOpponent } from "./GeneralRules";

export const knightMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  const x = desiredPosition.x;
  const y = desiredPosition.y;
  const px = initialPosition.x;
  const py = initialPosition.y;

  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      // TOP and DOWN movement
      if (y - py === 2 * i) {
        if (x - px === j) {
          return isEmptyOrOccupiedByOpponent(desiredPosition, boardState, team);
        }
      }

      // RIGHT and LEFT movement
      if (x - px === 2 * i) {
        if (y - py === j) {
          return isEmptyOrOccupiedByOpponent(desiredPosition, boardState, team);
        }
      }
    }
  }

  return false;
};
