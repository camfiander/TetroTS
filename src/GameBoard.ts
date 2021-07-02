import * as Shared from "./Shared";
import { Piece } from "./Piece";

export interface GameBoard {
  blocks: number[][];
  add: (p: Piece) => void;
  getFullLines: () => number[];
  gameOver: () => void;
  clearLines: () => number;
  isEmpty: (blocks: number[][], rowIdx: number, offset: number) => boolean;
}

export class Board implements GameBoard {
  blocks: number[][];

  constructor() {
    this.blocks = new Array(Shared.NUM_ROWS);

    for (let i = 0; i < Shared.NUM_ROWS; i++) {
      this.blocks[i] = new Array(Shared.NUM_COLS).fill(0);
    }
  }

  getFullLines() {
    let lines: number[] = this.blocks.map((row) =>
      row.reduce((x, y) => x * y, 1)
    );
    return lines;
  }

  clearLines(): number {
    let clearCount: number = 0;
    let keepRow: boolean[] = [];
    this.blocks.forEach((row) => {
      if (row.every((x) => x !== 0)) {
        clearCount++;
        keepRow.push(false);
      } else {
        keepRow.push(true);
      }
    });
    if (clearCount > 0) {
      let newBlocks: number[][] = [];
      for (let i = 0; i < clearCount; i++) {
        newBlocks.push(new Array(Shared.NUM_COLS).fill(0));
      }
      for (let i = 0; i < this.blocks.length; i++) {
        if (keepRow[i]) {
          newBlocks.push(this.blocks[i]);
        }
      }
      this.blocks = newBlocks;
    }
    return clearCount;
  }

  gameOver() {
    console.log("GAME OVER");
  }

  add(p: Piece) {
    console.log("ADD");
    let rowOffset = p.origin[0];
    let offset = p.origin[1];

    for (let i = 0; i < p.blocks.length; i++) {
      this.addRow(p.blocks[i], rowOffset + i, offset);
    }
  }

  addRow(x: number[], rowIdx: number, offset: number) {
    if (rowIdx >= Shared.NUM_ROWS) {
      return;
    }
    for (let i = 0; i < x.length && i + offset < Shared.NUM_COLS; i++) {
      if (i + offset >= 0) {
        this.blocks[rowIdx][i + offset] |= x[i];
      }
    }
  }

  isEmpty(blocks: number[][], rowIdx: number, offset: number): boolean {
    for (let i = 0; i < blocks.length; i++) {
      for (let j = 0; j < blocks[0].length; j++) {
        if (blocks[i][j] !== 0) {
          if (
            rowIdx + i >= Shared.NUM_ROWS ||
            offset + j < 0 ||
            offset + j >= Shared.NUM_COLS
          ) {
            return false;
          }
          if (this.blocks[rowIdx + i][offset + j] !== 0) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
