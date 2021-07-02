import { GameBoard } from "./GameBoard";
import { Piece } from "./Piece";
import * as Shared from "./Shared";

export interface GameLogic {
  cursor: Piece;
  board: GameBoard;
  score: number;
  tick: () => void;
}

export class Logic implements GameLogic {
  cursor: Piece;
  board: GameBoard;
  score: number;

  constructor(cursor: Piece, board: GameBoard) {
    this.cursor = cursor;
    this.board = board;
    this.score = 0;
  }

  tick() {
    console.log("tick");
    if (
      this.board.isEmpty(
        this.cursor.blocks,
        this.cursor.origin[0] + 1,
        this.cursor.origin[1]
      )
    ) {
      this.cursor.origin[0] += 1;
    } else {
      this.board.add(this.cursor);
      this.cursor.reset();
      this.score += this.board.clearLines();
    }
  }
}
