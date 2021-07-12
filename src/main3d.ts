import "./style.css";
import { Tetris } from "./tetris";
import { getTetrominoBlocks, getTetrominoColors } from "./tetrominos";
import { Piece } from "./Piece";
import * as THREE from "three";
import { GameBoard } from "./GameBoard";
import { NUM_COLS, NUM_ROWS } from "./Shared";
import { MeshBasicMaterial } from "three";

const scene: THREE.Scene = new THREE.Scene();
const camera: THREE.Camera = new THREE.PerspectiveCamera(
  120,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(5, -10, 10);

const cubeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);

//Create 3d game board
const board = new THREE.Group();
// board.position.z = 4;
scene.add(board);

const blockMesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>[][] =
  new Array<THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>[]>(NUM_ROWS);

for (let i = 0; i < NUM_ROWS; i++) {
  blockMesh[i] = new Array<
    THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>
  >(NUM_COLS);
  for (let j = 0; j < NUM_COLS; j++) {
    let blockMaterial = new MeshBasicMaterial();
    let mesh = new THREE.Mesh(cubeGeometry, blockMaterial);
    mesh.position.y = -i;
    mesh.position.x = j;
    mesh.visible = false;
    blockMesh[i][j] = mesh;
    board.add(mesh);
  }
}

const tetris = new Tetris();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
  drawBoard(tetris.board);
  drawCursor(tetris.cursor);
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

//Input Control
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

function drawBoard(board: GameBoard) {
  for (let y = 0; y < 24; y++) {
    for (let x = 0; x < 10; x++) {
      //if block at x,y is different from what's being rendered at x,y:
      if (board.blocks[y][x] !== blockMesh[y][x].material.color.getHex()) {
        drawCube(x, y, board.blocks[y][x]);
      }
    }
  }
}

function drawCursor(p: Piece) {
  for (let y = 0; y < p.blocks.length; y++) {
    for (let x = 0; x < p.blocks[0].length; x++) {
      if (p.blocks[y][x] !== 0) {
        drawCube(x + p.origin[1], y + p.origin[0], p.color);
      }
    }
  }
}

function drawCube(x: number, y: number, color: number) {
  blockMesh[y][x].material.color = new THREE.Color(color);
  blockMesh[y][x].visible = color > 0;
}
