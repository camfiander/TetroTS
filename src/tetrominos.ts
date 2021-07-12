const TetrominoBlocks: { [id: string]: number[][] } = {
  i: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],

  j: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],

  l: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],

  o: [
    [1, 1],
    [1, 1],
  ],

  s: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],

  t: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],

  z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
};

export function getTetrominoBlocks(shape: string): number[][] {
  return TetrominoBlocks[shape.toLowerCase()];
}

const TetrominoColors: { [id: string]: string } = {
  i: "#31C7EF",
  t: "#AD4D9C",
  l: "#EF7921",
  j: "#5A65AD",
  s: "#42B642",
  z: "#EF2029",
  o: "#F7D308",
};

const TetrominoColorsHex: { [id: string]: number } = {
  i: 0x31c7ef,
  t: 0xad4d9c,
  l: 0xef7921,
  j: 0x5a65ad,
  s: 0x42b642,
  z: 0xef2029,
  o: 0xf7d308,
};

export function getTetrominoColors(shape: string): string {
  return TetrominoColors[shape.toLowerCase()];
}

export function getTetrominoColorsHex(shape: string): number {
  return TetrominoColorsHex[shape.toLowerCase()];
}
