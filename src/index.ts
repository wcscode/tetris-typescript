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
  //createDeepCopyFromTetromino,
  willCollide,
  buildDivBoard,
  render,
  tryKick, 
  isTickFall,
  freezeTetromino,
  destroyFilledRow,
  applyGravity
} from "./util.js";

//const {pressedKeys, inputs, keydown, keyup} = setInput();
const {pressedKeys} = setInput();
const tick: ITickManager = {count:0, rate:10};  
let board: IBoard = buildBoardArray();

buildDivBoard(board, "board");

let tetromino: ITetromino = getRandomTetromino();
board = putTetrominoInsideBoard(board, tetromino);

function update() {

    pressedKeys.forEach((action: action, _) => { 
        
        if(willCollide(board, tetromino, action)){
        
          if(action == "clockwise" || action === "counterClockwise")
            tetromino = tryKick(board, tetromino, action);          
        }
        else {

          tetromino = setAction(tetromino, action);
        }
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
      board = applyGravity(board);
    }

    board = clearTetrominoFromBoard(board); 
    board = putTetrominoInsideBoard(board, tetromino);

    render(board, tetromino, pressedKeys);
  }

setInterval(update, UPDATE_FRAME_IN_MILLISECONDS);