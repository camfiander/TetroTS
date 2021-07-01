const TetrominoBlocks: {[id:string]: number[][]} = {
    i: [[0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]],

    j: [[1,0,0],
        [1,1,1],
        [0,0,0]],

    l: [[0,0,1],
        [1,1,1],
        [0,0,0]],

    o: [[1,1],
        [1,1]],

    s: [[0,1,1],
        [1,1,0],
        [0,0,0]],

    t: [[0,1,0],
        [1,1,1],
        [0,0,0]],

    z: [[1,1,0],
        [0,1,1],
        [0,0,0]],
}

export function getTetrominoBlocks(shape: string): number[][]{
    return TetrominoBlocks[shape.toLowerCase()];
}

