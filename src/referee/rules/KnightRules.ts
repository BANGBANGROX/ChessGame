import { Piece, Position, TeamType } from "../../Constants";
import {
  isEmptyOrOccupiedByOpponent,
  tileIsOccupied,
  tileIsOccupiedByOpponent,
} from "./GeneralRules";

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

export const getPossibleKnightMoves = (
  knight: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      const verticalMove: Position = {
        x: knight.position.x + j,
        y: knight.position.y + i * 2,
      };
      const horizontalMove: Position = {
        x: knight.position.x + 2 * i,
        y: knight.position.y + j,
      };

      if (isEmptyOrOccupiedByOpponent(verticalMove, boardState, knight.team)) {
        possibleMoves.push(verticalMove);
      }

      if (
        isEmptyOrOccupiedByOpponent(horizontalMove, boardState, knight.team)
      ) {
        possibleMoves.push(horizontalMove);
      }
    }
  }

  return possibleMoves;
};
