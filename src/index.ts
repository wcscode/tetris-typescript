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
  createDeepCopyFromTetromino,
  willCollide,
  buildDivBoard,
  render
} from "./util.js";

const pressedKeys = setInput();
const inputsMaps = mapOfKeyAndMovements();
let board: IBoard = buildBoardArray();
buildDivBoard(board, "board");
let tetromino: ITetromino = getRandomTetromino();
board = putTetrominoInsideBoard(board, tetromino);
function update(){
    //console.clear(); 
    const preservedTetromino = createDeepCopyFromTetromino(tetromino);
    inputsMaps.forEach((action: action, key: key) => {        
        if (pressedKeys.has(key)){
            if(!willCollide(board, tetromino, action))            
                tetromino = setAction(tetromino, action);      
                
            } 
    }); 
    //console.log(willCollide(board, tetromino, "clockwise"))
    //tetromino = setAction(tetromino, "clockwise");
    //willCollide(board, tetromino, "right");
     
    board = clearTetrominosFromBoard(board, preservedTetromino);      
    board = putTetrominoInsideBoard(board, tetromino);
    //console.table(formatToRenderConsole(board));
    render(board, preservedTetromino, tetromino);
  }
 
update();
//update();
//update();
setInterval(update, UPDATE_FRAME_IN_MILLISECONDS);