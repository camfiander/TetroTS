import { GameBoard, Board } from './GameBoard';
import { GameControl, Control } from './GameControl';
import { GameLogic, Logic } from './GameLogic';
import { Piece } from './Piece';

const cursor: Piece = new Piece();

export class Tetris{
    public cursor!: Piece;
    public board!: GameBoard;
    public control!: GameControl;
    public logic!: GameLogic;

    private logicInverval: number;

    constructor(){
        this.cursor = cursor;
        this.board = new Board();
        this.logic = new Logic(cursor,this.board);
        this.control = new Control(cursor,this.board, this.logic);

        this.logicInverval = setInterval((x: GameLogic) => {
            x.tick();
        },180,this.logic);
        
    }

    setSoftDrop(isDropping: boolean){
        let speed = isDropping ? 60 : this.getLevelSpeed();

        clearInterval(this.logicInverval);
        this.logic.tick();
        this.logicInverval = setInterval((x: GameLogic) => {
            x.tick();
        },speed,this.logic);
    }

    getLevelSpeed(){
        return 180;
    }

}