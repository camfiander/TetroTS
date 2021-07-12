import { Tetromino, PieceRotation, tetr } from "./Shared";
import { getTetrominoBlocks, getTetrominoColorsHex } from "./tetrominos";

export class Piece {
  shape: Tetromino;
  next: Tetromino;
  color: number;
  rotation: PieceRotation;
  blocks: number[][];
  origin: number[];

  constructor(shape?: Tetromino) {
    if (shape === undefined) {
      this.shape = tetr[Math.floor(Math.random() * 7)];
    } else {
      this.shape = shape;
    }
    this.next = tetr[Math.floor(Math.random() * 7)];

    this.color = getTetrominoColorsHex(this.shape);
    this.rotation = 0;
    this.blocks = getTetrominoBlocks(this.shape);
    this.origin = [0, 3];
  }

  reset(shape?: Tetromino) {
    console.log("reset");
    this.shape = this.next;
    if (shape === undefined) {
      this.next = tetr[Math.floor(Math.random() * 7)];
    } else {
      this.next = shape;
    }
    this.color = getTetrominoColorsHex(this.shape);
    this.rotation = 0;
    this.blocks = getTetrominoBlocks(this.shape);
    this.origin = [0, 3];
  }

  setBlocks(blocks: number[][]) {
    this.blocks = blocks;
  }
}
