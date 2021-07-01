import './style.css'
import * as Shared from './Shared';
import { Tetris } from './tetris';
  
const app = document.querySelector<HTMLDivElement>('#app')!

const game = document.querySelector<HTMLCanvasElement>('#game');

const tetris = new Tetris();

if(game){
  const ctx = game.getContext('2d');
  if(ctx){
    const drawLoop = setInterval(() => {
      ctx.fillStyle = 'black';
      ctx.fillRect(0,0,320,768);
      ctx.fillStyle = 'white';

      for(let y = 0; y < 24; y++){
        for(let x = 0; x < 10; x++){
          if(tetris.board.blocks[y][x] !== 0){
            ctx.fillRect((x*32)+1,(y*32)+1,30,30);
          }
        }
      }

      for(let y = 0; y < tetris.cursor.blocks.length; y++){
        for(let x = 0; x < tetris.cursor.blocks[0].length; x++){
          if(tetris.cursor.blocks[y][x] !== 0){
            ctx.fillRect(((x+tetris.cursor.origin[1])*32)+1,((y+tetris.cursor.origin[0])*32)+1,30,30);
          }
        }
      }

    },33);
  }
}

document.addEventListener('keydown', (e) => {
  if(e.ctrlKey){
    return;
  }

  switch(e.key){
    case 'a':
      tetris.control.moveLeft();
      break;
    case 'd':
      tetris.control.moveRight();
      break;
    case 'o':
      tetris.control.rotate90CCW();
      break;
    case 'p':
      tetris.control.rotate90();
      break;
    case ' ':
      tetris.control.hardDrop();
      break;
    case 's':
      tetris.setSoftDrop(true);
    }
});

document.addEventListener('keyup', (e) => {
  switch(e.key){
    case 's':
      tetris.setSoftDrop(false);
  }
})

