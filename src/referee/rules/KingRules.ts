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

export const getPossibleKingMoves = (
  king: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  for (let i = -1; i < 2; ++i) {
    for (let j = -1; j < 2; ++j) {
      const destination: Position = {
        x: king.position.x + i,
        y: king.position.y + j,
      };

      if (isEmptyOrOccupiedByOpponent(destination, boardState, king.team)) {
        possibleMoves.push(destination);
      }
    }
  }

  return possibleMoves;
};
