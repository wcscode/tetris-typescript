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
  forceUserClickButton,
  isTickFall,
  freezeTetromino
} from "./util.js";

const {pressedKeys, inputs} = setInput();
let board: IBoard = buildBoardArray();
buildDivBoard(board, "board");
let tetromino: ITetromino = getRandomTetromino();
board = putTetrominoInsideBoard(board, tetromino);
const tick:ITickManager = {count:0, rate:10};  
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
    forceUserClickButton(pressedKeys, "a", "s");  
    if(isTickFall(tick)){      
      const tempTetromino = createDeepCopyFromTetromino(tetromino);                      
      if(willCollide(board, tempTetromino, "down")) {      
        tetromino = freezeTetromino(tetromino);
        board = clearTetrominosFromBoard(board, preservedTetromino);      
        board = putTetrominoInsideBoard(board, tetromino);
        render(board, preservedTetromino, tetromino);
        tetromino = getRandomTetromino();     
      }else{
        tetromino = setAction(tetromino, "down");
        board = clearTetrominosFromBoard(board, preservedTetromino);      
        board = putTetrominoInsideBoard(board, tetromino);
        render(board, preservedTetromino, tetromino);
      }           
    }else{
      board = clearTetrominosFromBoard(board, preservedTetromino);      
      board = putTetrominoInsideBoard(board, tetromino);
      render(board, preservedTetromino, tetromino);
    }
    
   // if(tickFall)
     // tetromino = getRandomTetromino();
  }
 
update();
//update();
//update();
setInterval(update, UPDATE_FRAME_IN_MILLISECONDS);