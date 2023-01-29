import Board from './Board.js';
import { buildInitialHtmlBoard } from './util.js';

const board: Board = new Board(10, 25);
const htmlBoard = buildInitialHtmlBoard('board', board);

function update(timestamp: number){

}

function render(){

    for(let width = 0; width < board.getWidth(); ++width){
        for(let height = 0; height < board.getHeight(); ++width){

        }
    }
}

function loop(timestamp: number) {
    update(timestamp);
    render();
}

loop(0);
requestAnimationFrame(loop);

