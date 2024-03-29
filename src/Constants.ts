export const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const GRID_SIZE = 75;

export function samePosition(p1: Position, p2: Position) {
  return p1.x === p2.x && p1.y === p2.y;
}

export interface Position {
  x: number;
  y: number;
}

export enum PieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING,
}

export enum TeamType {
  BLACK,
  WHITE,
}

export interface Piece {
  image: string;
  position: Position;
  type: PieceType;
  team: TeamType;
  enPassent?: boolean;
  possibleMoves?: Position[];
}

export const initialBoardState: Piece[] = [
  {
    image: `assets/images/rook_b.png`,
    position: {
      x: 0,
      y: 7,
    },
    type: PieceType.ROOK,
    team: TeamType.BLACK,
  },
  {
    image: `assets/images/knight_b.png`,
    position: {
      x: 1,
      y: 7,
    },
    type: PieceType.KNIGHT,
    team: TeamType.BLACK,
  },
  {
    image: `assets/images/bishop_b.png`,
    position: {
      x: 2,
      y: 7,
    },
    type: PieceType.BISHOP,
    team: TeamType.BLACK,
  },
  {
    image: `assets/images/queen_b.png`,
    position: {
      x: 3,
      y: 7,
    },
    type: PieceType.QUEEN,
    team: TeamType.BLACK,
  },
  {
    image: `assets/images/king_b.png`,
    position: {
      x: 4,
      y: 7,
    },
    type: PieceType.KING,
    team: TeamType.BLACK,
  },
  {
    image: `assets/images/bishop_b.png`,
    position: {
      x: 5,
      y: 7,
    },
    type: PieceType.BISHOP,
    team: TeamType.BLACK,
  },
  {
    image: `assets/images/knight_b.png`,
    position: {
      x: 6,
      y: 7,
    },
    type: PieceType.KNIGHT,
    team: TeamType.BLACK,
  },
  {
    image: `assets/images/rook_b.png`,
    position: {
      x: 7,
      y: 7,
    },
    type: PieceType.ROOK,
    team: TeamType.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: {
      x: 0,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: {
      x: 1,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: {
      x: 2,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: {
      x: 3,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: {
      x: 4,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: {
      x: 5,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: {
      x: 6,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: {
      x: 7,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK,
  },

  {
    image: `assets/images/rook_w.png`,
    position: {
      x: 0,
      y: 0,
    },
    type: PieceType.ROOK,
    team: TeamType.WHITE,
  },
  {
    image: `assets/images/knight_w.png`,
    position: {
      x: 1,
      y: 0,
    },
    type: PieceType.KNIGHT,
    team: TeamType.WHITE,
  },
  {
    image: `assets/images/bishop_w.png`,
    position: {
      x: 2,
      y: 0,
    },
    type: PieceType.BISHOP,
    team: TeamType.WHITE,
  },
  {
    image: `assets/images/queen_w.png`,
    position: {
      x: 3,
      y: 0,
    },
    type: PieceType.QUEEN,
    team: TeamType.WHITE,
  },
  {
    image: `assets/images/king_w.png`,
    position: {
      x: 4,
      y: 0,
    },
    type: PieceType.KING,
    team: TeamType.WHITE,
  },
  {
    image: `assets/images/bishop_w.png`,
    position: {
      x: 5,
      y: 0,
    },
    type: PieceType.BISHOP,
    team: TeamType.WHITE,
  },
  {
    image: `assets/images/knight_w.png`,
    position: {
      x: 6,
      y: 0,
    },
    type: PieceType.KNIGHT,
    team: TeamType.WHITE,
  },
  {
    image: `assets/images/rook_w.png`,
    position: {
      x: 7,
      y: 0,
    },
    type: PieceType.ROOK,
    team: TeamType.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: {
      x: 0,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: {
      x: 1,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: {
      x: 2,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: {
      x: 3,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: {
      x: 4,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: {
      x: 5,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: {
      x: 6,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: {
      x: 7,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE,
  },
];
