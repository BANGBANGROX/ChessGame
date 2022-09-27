import "./Chessboard.css";
import Tile from "../Tile/Tile";
import Referee from "../../referee/Referee";
import React, { useRef, useState } from "react";
import {
  VERTICAL_AXIS,
  GRID_SIZE,
  HORIZONTAL_AXIS,
  PieceType,
  TeamType,
  initialBoardState,
  Piece,
  samePosition,
  Position,
} from "../../Constants";

export default function Chessboard() {
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [grabPosition, setGrabPosition] = useState<Position>({ x: -1, y: -1 });
  const referee = new Referee();

  const chessboardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  function updateValidMoves() {
    setPieces((currentPieces) => {
      return currentPieces.map((p) => {
        p.possibleMoves = referee.getValidMoves(p, currentPieces);
        return p;
      });
    });
  }

  function grabPiece(e: React.MouseEvent) {
    updateValidMoves();

    const element = e.target as HTMLElement;
    const chessboard = chessboardRef.current;

    if (element.classList.contains("chess-piece") && chessboard) {
      const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const grabY = Math.abs(
        Math.ceil(
          (e.clientY - chessboard.offsetTop - GRID_SIZE * 8) / GRID_SIZE
        )
      );
      setGrabPosition({ x: grabX, y: grabY });

      const x = e.clientX - GRID_SIZE / 2;
      const y = e.clientY - GRID_SIZE / 2;

      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setActivePiece(element);
    }
  }

  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;

    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
      let x = e.clientX - 37.5;
      let y = e.clientY - 37.5;

      activePiece.style.position = "absolute";
      x = Math.max(Math.min(x, maxX), minX); // if x > maxX then x = maxX and if x < minX then x = minX
      y = Math.max(Math.min(y, maxY), minY); // if y > maxY then y = maxY and if y < minY then y = minY

      activePiece.style.left = `${x}px`;
      activePiece.style.top = `${y}px`;
    }
  }

  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;

    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const y = Math.abs(
        Math.ceil(
          (e.clientY - chessboard.offsetTop - GRID_SIZE * 8) / GRID_SIZE
        )
      );

      const currentPiece = pieces.find((p) =>
        samePosition(p.position, grabPosition)
      );

      if (currentPiece) {
        const validMove = referee.isValidMove(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const isEnPassentMove = referee.isEnPassentMove(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const pawnDirection = currentPiece.team === TeamType.WHITE ? 1 : -1;

        if (isEnPassentMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              piece.enPassent = false;
              piece.position.x = x;
              piece.position.y = y;
              results.push(piece);
            } else if (
              !samePosition(piece.position, { x, y: y - pawnDirection })
            ) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassent = false;
              }
              results.push(piece);
            }

            return results;
          }, [] as Piece[]);
          setPieces(updatedPieces);
        } else if (validMove) {
          // Updates the piece position
          // And if the piece is attacked/captured it removes it
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              // Special move
              piece.enPassent =
                Math.abs(y - grabPosition.y) === 2 &&
                piece.type === PieceType.PAWN;

              piece.position.x = x;
              piece.position.y = y;

              const promotionRow = piece.team === TeamType.WHITE ? 7 : 0;

              if (y === promotionRow && piece.type === PieceType.PAWN) {
                modalRef.current?.classList.remove("hidden");
                setPromotionPawn(piece);
              }

              results.push(piece);
            } else if (!samePosition(piece.position, { x, y })) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassent = false;
              }
              results.push(piece);
            }

            return results;
          }, [] as Piece[]);

          setPieces(updatedPieces);
        } else {
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
        setActivePiece(null);
      }
    }
  }

  function promotePawn(pieceType: PieceType) {
    if (promotionPawn === undefined) return;

    const updatedPieces = pieces.reduce((results, piece) => {
      if (samePosition(piece.position, promotionPawn.position)) {
        piece.type = pieceType;
        let image = "";
        const teamType = piece.team === TeamType.WHITE ? "w" : "b";
        if (pieceType === PieceType.ROOK) image = "rook";
        if (pieceType === PieceType.BISHOP) image = "bishop";
        if (pieceType === PieceType.KNIGHT) image = "knight";
        if (pieceType === PieceType.QUEEN) image = "queen";
        piece.image = `assets/images/${image}_${teamType}.png`;
      }
      results.push(piece);
      return results;
    }, [] as Piece[]);

    setPieces(updatedPieces);
    modalRef.current?.classList.add("hidden");
  }

  function promotionTeam() {
    return promotionPawn?.team === TeamType.WHITE ? "w" : "b";
  }

  let board = [];

  for (let j = VERTICAL_AXIS.length - 1; j >= 0; --j) {
    for (let i = 0; i < HORIZONTAL_AXIS.length; ++i) {
      const number = i + j + 2;
      const piece = pieces.find((p) =>
        samePosition(p.position, { x: i, y: j })
      );
      let image = piece ? piece.image : undefined;
      let currentPiece =
        activePiece !== null
          ? pieces.find((p) => samePosition(p.position, grabPosition))
          : undefined;
      let hightlight = currentPiece?.possibleMoves
        ? currentPiece.possibleMoves.some((p) =>
            samePosition(p, { x: i, y: j })
          )
        : false;

      board.push(
        <Tile
          key={`${i}${j}`}
          number={number}
          image={image}
          highlight={hightlight}
        />
      );
    }
  }

  return (
    <>
      <div id="pawn-promotion-modal" className="hidden" ref={modalRef}>
        <div className="modal-body">
          <img
            onClick={() => promotePawn(PieceType.ROOK)}
            src={`/assets/images/rook_${promotionTeam()}.png`}
          />
          <img
            onClick={() => promotePawn(PieceType.BISHOP)}
            src={`/assets/images/bishop_${promotionTeam()}.png`}
          />
          <img
            onClick={() => promotePawn(PieceType.KNIGHT)}
            src={`/assets/images/knight_${promotionTeam()}.png`}
          />
          <img
            onClick={() => promotePawn(PieceType.QUEEN)}
            src={`/assets/images/queen_${promotionTeam()}.png`}
          />
        </div>
      </div>
      <div
        onMouseMove={(e) => movePiece(e)}
        onMouseDown={(e) => grabPiece(e)}
        onMouseUp={(e) => dropPiece(e)}
        id="chessboard"
        ref={chessboardRef}
      >
        {board}
      </div>
    </>
  );
}
