import {
  Piece,
  PieceType,
  Position,
  samePosition,
  TeamType,
} from "../../Constants";

export const isOccupied = (
  position: Position,
  boardState: Piece[]
): boolean => {
  const piece = boardState.find((p) => samePosition(p.position, position));

  if (piece) {
    return true;
  } else {
    return false;
  }
};

export const tileIsOccupiedByOpponent = (
  position: Position,
  boardState: Piece[],
  team: TeamType
): boolean => {
  const piece = boardState.find(
    (p) => samePosition(p.position, position) && p.team !== team
  );

  if (piece) {
    return true;
  } else {
    return false;
  }
};

export const isEmptyOrOccupiedByOpponent = (
  position: Position,
  boardState: Piece[],
  team: TeamType
): boolean => {
  return (
    !isOccupied(position, boardState) ||
    tileIsOccupiedByOpponent(position, boardState, team)
  );
};

export const isEnPassentMove = (
  initialPosition: Position,
  desiredPosition: Position,
  type: PieceType,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  const pawnDirection = team === TeamType.WHITE ? 1 : -1;
  const x = desiredPosition.x;
  const y = desiredPosition.y;
  const px = initialPosition.x;
  const py = initialPosition.y;

  if (type === PieceType.PAWN) {
    if ((x - px === -1 || x - px === 1) && y - py === pawnDirection) {
      const piece = boardState.find(
        (p) =>
          p.position.x === x &&
          p.position.y === y - pawnDirection &&
          p.enPassent
      );
      if (piece) {
        return true;
      }
    }
  }

  return false;
};
