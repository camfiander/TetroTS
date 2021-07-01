import { Tetromino, PieceRotation, tetr } from "./Shared";
import { getTetrominoBlocks } from "./tetrominos";

export class Piece{
    shape: Tetromino;
    // color: number;
    rotation: PieceRotation;
    blocks: number[][];
    origin: number[];

    constructor(shape?: Tetromino){
        if(shape === undefined){
            this.shape = tetr[Math.floor(Math.random()*7)];
        }else{
            this.shape = shape;
        }
        // this.color = getTetrominoColor(shape);
        this.rotation = 0;
        this.blocks = getTetrominoBlocks(this.shape);
        this.origin = [0,3];
    }

    reset(shape?: Tetromino){
        console.log("reset");
        if(shape === undefined){
            this.shape = tetr[Math.floor(Math.random()*7)];
        }else{
            this.shape = shape;
        }
        // this.color = getTetrominoColor(shape);
        this.rotation = 0;
        this.blocks = getTetrominoBlocks(this.shape);
        this.origin = [0,3];
    }

    setBlocks(blocks: number[][]){
        this.blocks = blocks;
    }

}