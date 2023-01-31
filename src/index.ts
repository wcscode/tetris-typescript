import {UPDATE_FRAME_IN_MILLISECONDS} from "./const.js";

import { 
  buildBoardArray, 
  clearTetrominosFromBoard, 
  fillBoardWithTetrominoInInitialPosition, 
  formatToRenderConsole, 
  getRandomTetromino, 
  getTetrominosIndices, 
  move
} from "./util.js";

const boards: number[] = buildBoardArray();
const tetrominos: number[] = getRandomTetromino();

fillBoardWithTetrominoInInitialPosition(boards, tetrominos)

function update(){
    console.clear();      
    const tetrominosIndices = getTetrominosIndices(boards);
    clearTetrominosFromBoard(boards, tetrominosIndices);
    move(boards, tetrominosIndices, "down");
    move(boards, getTetrominosIndices(boards), "down");

  console.table(formatToRenderConsole(boards));

}
update();
//setInterval(update, UPDATE_FRAME_IN_MILLISECONDS);