import {
  UPDATE_FRAME_IN_MILLISECONDS,
  action,
  IBoard,
  ITetromino,
  key,
  ITickManager, 
} from "./const.js";

import { 
  buildBoardArray, 
  clearTetrominoFromBoard, 
  getRandomTetromino,
  setInput,
  setAction,
  putTetrominoInsideBoard,
  createDeepCopyFromTetromino,
  willCollide,
  buildDivBoard,
  render,
  tryKick, 
  isTickFall,
  freezeTetromino
} from "./util.js";

const {pressedKeys, inputs, keydown, keyup} = setInput();
const tick: ITickManager = {count:0, rate:10};  
let board: IBoard = buildBoardArray();

buildDivBoard(board, "board");

let tetromino: ITetromino = getRandomTetromino();
board = putTetrominoInsideBoard(board, tetromino);

function update() {

    let preservedTetromino = createDeepCopyFromTetromino(tetromino);
    const tickFall = isTickFall(tick);

    if(tickFall)
      keydown("ArrowDown");

    inputs.forEach((action: action, key: key) => {        

      if (pressedKeys.has(key)) {        

        if(willCollide(board, tetromino, action)){                        

          switch(action){

            case "clockwise": 
            case "counterClockwise": {
              
              tetromino = tryKick(board, tetromino, action);
              break;
            }            
            case "down": {

              if(tickFall) {

                tetromino = freezeTetromino(tetromino);             
                board = putTetrominoInsideBoard(board, tetromino);
                preservedTetromino = tetromino = getRandomTetromino();
              }
            }
          }          

        } else {

          tetromino = setAction(tetromino, action);
        }
      }            
    }); 

    keyup("a", "s"); 

    if(tickFall) 
      keyup("ArrowDown");

    board = clearTetrominoFromBoard(board); 
    board = putTetrominoInsideBoard(board, tetromino);

    render(board, tetromino);
  }

setInterval(update, UPDATE_FRAME_IN_MILLISECONDS);