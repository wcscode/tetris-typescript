import {UPDATE_FRAME_IN_MILLISECONDS} from "./const.js";
import { 
  buildBoardArray, 
  clearTetrominosFromBoard, 
  action, 
  key,
  formatToRenderConsole, 
  getRandomTetromino, 
  mapOfKeyAndMovements,   
  setInput,
  ITetromino,
  setAction,
  IBoard,
  putTetrominoInsideBoard,
  preserveTetromino,
  willCollide
} from "./util.js";

const pressedKeys = setInput();
const inputsMaps = mapOfKeyAndMovements();
let board: IBoard = buildBoardArray();
let tetromino: ITetromino = getRandomTetromino();
board = putTetrominoInsideBoard(board, tetromino);
function update(){
    console.clear(); 
    const preservedTetromino = preserveTetromino(tetromino);
    inputsMaps.forEach((action: action, key: key) => {        
        if (pressedKeys.has(key))
            if(!willCollide(board, tetromino, action))          
              tetromino = setAction(tetromino, action);       
    }); 
    board = clearTetrominosFromBoard(board, preservedTetromino);      
    board = putTetrominoInsideBoard(board, tetromino);
    console.table(formatToRenderConsole(board));
  }
 
//update();
//update();
//update();
setInterval(update, UPDATE_FRAME_IN_MILLISECONDS);