import * as Shared from './Shared';
import { PieceRotation } from './Shared';
import { GameBoard } from "./GameBoard";
import { Piece } from "./Piece";
import { GameLogic } from './GameLogic';

export interface GameControl{
    cursor: Piece;
    board: GameBoard;
    moveLeft: () => void;
    moveRight: () => void;
    rotate90: () => void;
    rotate90CCW: () => void;
    hardDrop: () => void;
    softDrop: (dropping: boolean) => void;
}

export class Control implements GameControl{
    cursor: Piece;
    board: GameBoard;
    logic: GameLogic;

    softdropInterval: any;

    constructor(cursor: Piece,board: GameBoard, logic: GameLogic){
        this.cursor = cursor;
        this.board = board;
        this.logic = logic;
        // this.softdropInterval = setInterval()
    }

    moveLeft(){
        if(this.board.isEmpty(this.cursor.blocks,this.cursor.origin[0],this.cursor.origin[1]-1)){
            this.cursor.origin[1] -= 1;
        }
    };

    moveRight(){
        if(this.board.isEmpty(this.cursor.blocks,this.cursor.origin[0],this.cursor.origin[1]+1)){
            this.cursor.origin[1] += 1;
        }
    };

    rotate90(){
        let newShape = rotate90(this.cursor.blocks);
        if(this.board.isEmpty(newShape,this.cursor.origin[0],this.cursor.origin[1])){
            this.cursor.setBlocks(newShape);
            this.cursor.rotation = ((this.cursor.rotation+1)%4) as PieceRotation;
        }
    };

    rotate90CCW(){
        let newShape = rotate90CCW(this.cursor.blocks);
        if(this.board.isEmpty(newShape,this.cursor.origin[0],this.cursor.origin[1])){
            this.cursor.setBlocks(newShape);
            this.cursor.rotation = ((this.cursor.rotation-1)%4) as PieceRotation;
        }
    };
    hardDrop(){
        while(this.board.isEmpty(this.cursor.blocks,this.cursor.origin[0]+1,this.cursor.origin[1])){
            this.cursor.origin[0] += 1;
        }
        this.logic.tick();
    }
    softDrop(dropping: boolean){
        if(dropping && this.board.isEmpty(this.cursor.blocks,this.cursor.origin[0],this.cursor.origin[1]+1)){
            this.cursor.origin[0] += 1;
        }
    }
    
}



//Rotate a 2D matrix 90 degrees counter-clockwise about its center
function rotate90(arr: number[][]){
    let rot: number[][] = new Array(arr[0].length);

    let length = arr.length;
    let width = arr[0].length;
    for(let i = 0; i<length; i++){
        for(let j = 0; j<width; j++){
            if(rot[j] === undefined){
                rot[j] = new Array(arr.length);
            }
            rot[j][length-1-i] = arr[i][j];
        }
    }
    return rot;
}

//Rotate a 2D matrix 90 degrees clockwise about its center
function rotate90CCW(arr: number[][]){
    let rot: number[][] = new Array(arr[0].length);

    let length = arr.length;
    let width = arr[0].length;
    for(let i = 0; i<length; i++){
        for(let j = 0; j<width; j++){
            if(rot[width-1-j] === undefined){
                rot[width-1-j] = new Array(arr.length);
            }
            rot[width-1-j][i] = arr[i][j];
        }
    }
    return rot;
}