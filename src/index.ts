import {UPDATE_FRAME_IN_MILLISECONDS} from "./const.js";
import { 
  buildBoardArray, 
  clearTetrominosFromBoard, 
  action, 
  key,
  fillBoardWithTetrominoInInitialPosition, 
  formatToRenderConsole, 
  getRandomTetromino, 
  getTetromino, 
  mapOfKeyAndMovements, 
  putTetrominosInsideBoard,
  setInput,
  ITetromino,
  setAction
} from "./util.js";

const pressedKeys = setInput();
const inputsMaps = mapOfKeyAndMovements();
let boards: number[] = buildBoardArray();
let tetromino: ITetromino = getRandomTetromino();
boards = fillBoardWithTetrominoInInitialPosition(boards, tetromino);

function update(){
    //console.clear();
    tetromino = getTetromino(boards, tetromino);       
    inputsMaps.forEach((action: action, key: key) => {        
        if (pressedKeys.has(key))          
            tetromino = setAction(tetromino, action);       
    });  
    tetromino = setAction(tetromino, "rotateLeft");
    tetromino = setAction(tetromino, "right");        
    boards = clearTetrominosFromBoard(boards, tetromino);     
    boards = putTetrominosInsideBoard(boards, tetromino); 
    console.table(formatToRenderConsole(boards));
}

update();
//update();
//update();
//setInterval(update, UPDATE_FRAME_IN_MILLISECONDS);