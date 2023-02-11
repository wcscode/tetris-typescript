import {
  UPDATE_FRAME_IN_MILLISECONDS,
  action,
  IBoard,
  ITetromino,
  key, 
} from "./const.js";
import { 
  buildBoardArray, 
  clearTetrominosFromBoard, 
  getRandomTetromino, 
  mapOfKeyAndMovements,   
  setInput,
  setAction,
  putTetrominoInsideBoard,
  createDeepCopyFromTetromino,
  willCollide,
  buildDivBoard,
  render,
  tryKick
} from "./util.js";

const pressedKeys = setInput();
const inputsMaps = mapOfKeyAndMovements();
let board: IBoard = buildBoardArray();
buildDivBoard(board, "board");
let tetromino: ITetromino = getRandomTetromino();
board = putTetrominoInsideBoard(board, tetromino);
function update(){
    const preservedTetromino = createDeepCopyFromTetromino(tetromino);
    inputsMaps.forEach((action: action, key: key) => {        
        if (pressedKeys.has(key)) {
            const tempTetromino =  createDeepCopyFromTetromino(tetromino);
            if(!willCollide(board, tempTetromino, action)) {          
              tetromino = setAction(tetromino, action);
            }else{
             // console.log('ac',tetromino)
              tetromino = tryKick(board, tetromino, action);
             // console.log('dc',tetromino)
            }
        }            
    });        
    board = clearTetrominosFromBoard(board, preservedTetromino);      
    board = putTetrominoInsideBoard(board, tetromino);
    render(board, preservedTetromino, tetromino);
  }
 
update();
//update();
//update();
setInterval(update, UPDATE_FRAME_IN_MILLISECONDS);