import {UPDATE_FRAME_IN_MILLISECONDS} from "./const.js";

import { 
  buildBoardArray, 
  clearTetrominosFromBoard, 
  fillBoardWithTetrominoInInitialPosition, 
  formatToRenderConsole, 
  getRandomTetromino, 
  getTetrominosIndices, 
  move,
  putTetrominosInsideBoard
} from "./util.js";

let boards: number[] = buildBoardArray();
const tetrominos: number[] = getRandomTetromino();
fillBoardWithTetrominoInInitialPosition(boards, tetrominos);

function update(){
    console.clear();      
    let tetrominosIndices = getTetrominosIndices(boards);   
    tetrominosIndices = move(tetrominosIndices, "down");  
    tetrominosIndices = move(tetrominosIndices, "right");    
    boards = clearTetrominosFromBoard(boards); 
    boards = putTetrominosInsideBoard(boards, tetrominosIndices); 
    console.table(formatToRenderConsole(boards));
}

update();
update();
//update();
//setInterval(update, UPDATE_FRAME_IN_MILLISECONDS);