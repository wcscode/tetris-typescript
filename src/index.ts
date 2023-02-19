import {
  UPDATE_FRAME_IN_MILLISECONDS,
  action,
  IBoard,
  ITetromino,
 // key,
  ITickManager, 
} from "./const.js";

import { 
  buildBoardArray, 
  clearTetrominoFromBoard, 
  getRandomTetromino,
  setInput,
  setAction,
  putTetrominoInsideBoard,
  willCollide,
  buildDivBoard,
  render,
  isTickFall,
  freezeTetromino,
  destroyFilledRow,
  applyGravity,
  tryKickRotation
} from "./util.js";

//const {pressedKeys, inputs, keydown, keyup} = setInput();
const {pressedKeys, cancelAction} = setInput();
const tick: ITickManager = {count:0, rate:10};  
let board: IBoard = buildBoardArray();
let score = 0;

buildDivBoard(board, "board");

let tetromino: ITetromino = getRandomTetromino();
board = putTetrominoInsideBoard(board, tetromino);

function update() {

    pressedKeys.forEach((action: action, key: string) => { 
        
      const isRotation = action == "clockwise" || action === "counterClockwise";

        if(willCollide(board, tetromino, action)){
        
          if(isRotation)           
            tetromino = tryKickRotation(board, tetromino, action); 
        }
        else {

          tetromino = setAction(tetromino, action);
        }

        if(isRotation)
          cancelAction(key);
    });
    
    if(isTickFall(tick)){

      if(willCollide(board, tetromino, "down")){

        tetromino = freezeTetromino(tetromino);             
        board = putTetrominoInsideBoard(board, tetromino);                
        tetromino = getRandomTetromino();        
      }
      else{

        tetromino = setAction(tetromino, "down");
      }

      board = destroyFilledRow(board);
      score += board.destroyedRows.length;
      board = applyGravity(board);      
    }

    board = clearTetrominoFromBoard(board); 
    board = putTetrominoInsideBoard(board, tetromino);

    render(board, score, /* tetromino, pressedKeys*/);
  }

setInterval(update, UPDATE_FRAME_IN_MILLISECONDS);