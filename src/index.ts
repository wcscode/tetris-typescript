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
  setInput,
  setAction,
  putTetrominoInsideBoard,
  createDeepCopyFromTetromino,
  willCollide,
  buildDivBoard,
  render,
  tryKick,
  forceUserClickButton
} from "./util.js";

const {pressedKeys, inputs} = setInput();
let board: IBoard = buildBoardArray();
buildDivBoard(board, "board");
let tetromino: ITetromino = getRandomTetromino();
board = putTetrominoInsideBoard(board, tetromino);
function update(){
    const preservedTetromino = createDeepCopyFromTetromino(tetromino);
    inputs.forEach((action: action, key: key) => {        
        if (pressedKeys.has(key)) {
            const tempTetromino =  createDeepCopyFromTetromino(tetromino);                      
            tetromino = !willCollide(board, tempTetromino, action) ?
              setAction(tetromino, action) :
              tryKick(board, tetromino, action);  
        }            
    }); 
    forceUserClickButton(pressedKeys, "a");  
    forceUserClickButton(pressedKeys, "s");  
    board = clearTetrominosFromBoard(board, preservedTetromino);      
    board = putTetrominoInsideBoard(board, tetromino);
    render(board, preservedTetromino, tetromino);
    
  }
 
update();
//update();
//update();
setInterval(update, UPDATE_FRAME_IN_MILLISECONDS);