import "./style.css";
import { Tetris } from "./tetris";
import { getTetrominoBlocks, getTetrominoColors } from "./tetrominos";
import { Piece } from "./Piece";

const game = document.querySelector<HTMLCanvasElement>("#game")!;

const tetris = new Tetris();
const nextPiece = new Piece(tetris.cursor.next);
nextPiece.origin[0] = 1;
nextPiece.origin[1] = 11;

let shadowOffset: number = 0;

const ctx = game.getContext("2d")!;

const scoreDiv: HTMLElement = document.querySelector("#score")!;

const drawLoop = setInterval(() => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 320, 768);

  // Draw next piece
  if (nextPiece.shape !== tetris.cursor.next) {
    nextPiece.shape = tetris.cursor.next;
    nextPiece.setBlocks(getTetrominoBlocks(nextPiece.shape));

    ctx.fillStyle = "#303030";
    ctx.fillRect(320, 0, 320, 240);

    drawPiece(nextPiece, getTetrominoColors(nextPiece.shape));
  }

  //Draw static board
  for (let y = 0; y < 24; y++) {
    for (let x = 0; x < 10; x++) {
      if (tetris.board.blocks[y][x] !== 0) {
        ctx.fillStyle = "#" + tetris.board.blocks[y][x].toString(16);
        ctx.fillRect(x * 32 + 1, y * 32 + 1, 30, 30);
      }
    }
  }

  //Draw Shadow
  updateShadow();
  ctx.fillStyle = "#b0b0b0";

  for (let y = 0; y < tetris.cursor.blocks.length; y++) {
    for (let x = 0; x < tetris.cursor.blocks[0].length; x++) {
      if (tetris.cursor.blocks[y][x] !== 0) {
        ctx.fillRect(
          (x + tetris.cursor.origin[1]) * 32 + 1,
          (y + tetris.cursor.origin[0] + shadowOffset) * 32 + 1,
          30,
          30
        );
      }
    }
  }

  drawPiece(tetris.cursor, "#b0b0b0", shadowOffset);

  drawPiece(tetris.cursor, getTetrominoColors(tetris.cursor.shape));

  //Draw score
  scoreDiv.innerHTML = tetris.score.toString();
}, 33);

function updateShadow() {
  let offset = 0;
  while (
    tetris.board.isEmpty(
      tetris.cursor.blocks,
      tetris.cursor.origin[0] + 1 + offset,
      tetris.cursor.origin[1]
    )
  ) {
    offset++;
  }
  shadowOffset = offset;
}

function drawPiece(p: Piece, fillStyle?: string, offset?: number) {
  if (fillStyle !== undefined) {
    ctx.fillStyle = fillStyle;
  }

  for (let y = 0; y < p.blocks.length; y++) {
    for (let x = 0; x < p.blocks[0].length; x++) {
      if (p.blocks[y][x] !== 0) {
        ctx.fillRect(
          (x + p.origin[1]) * 32 + 1,
          (y + p.origin[0] + (offset === undefined ? 0 : offset)) * 32 + 1,
          30,
          30
        );
      }
    }
  }
}

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey) {
    return;
  }

  switch (e.key) {
    case "a":
      tetris.control.inputLeft();
      break;
    case "d":
      tetris.control.inputRight();
      break;
    case "o":
      tetris.control.rotate90CCW();
      break;
    case "p":
      tetris.control.rotate90();
      break;
    case " ":
      tetris.control.hardDrop();
      break;
    case "s":
      tetris.setSoftDrop(true);
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "s":
      tetris.setSoftDrop(false);
      break;
    case "a":
      tetris.control.releaseLeft();
      break;
    case "d":
      tetris.control.releaseRight();
  }
});
