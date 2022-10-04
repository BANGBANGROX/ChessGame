import { Piece, Position, TeamType } from "../../Constants";
import { bishopMove, getPossibleBishopMoves } from "./BishopRules";
import { getPossibleRookMoves, rookMove } from "./RookRules";

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

export const getPossibleQueenMoves = (
  queen: Piece,
  boardState: Piece[]
): Position[] => {
  const rookMoves: Position[] = getPossibleRookMoves(queen, boardState);
  const bishopMoves: Position[] = getPossibleBishopMoves(queen, boardState);
  const possibleMoves = rookMoves.concat(bishopMoves);

  return possibleMoves;
};
