import { Piece, Position, TeamType } from "../../Constants";
import { bishopMove } from "./BishopRules";
import { rookMove } from "./RookRules";

export const queenMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  return (
    bishopMove(initialPosition, desiredPosition, team, boardState) ||
    rookMove(initialPosition, desiredPosition, team, boardState)
  );
};
