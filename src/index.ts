import {UPDATE_FRAME_IN_MILLISECONDS} from "./const.js";
import { 
  buildBoardArray, 
  clearTetrominosFromBoard, 
  direction, 
  key,
  fillBoardWithTetrominoInInitialPosition, 
  formatToRenderConsole, 
  getRandomTetromino, 
  getTetromino, 
  mapOfKeyAndMovements, 
  move,
  putTetrominosInsideBoard,
  setInput,
  ITetromino
} from "./util.js";

const pressedKeys = setInput();
const inputsMaps = mapOfKeyAndMovements();
let boards: number[] = buildBoardArray();
let tetromino: ITetromino = getRandomTetromino();
boards = fillBoardWithTetrominoInInitialPosition(boards, tetromino);

function update(){
    //console.clear();      
    tetromino = getTetromino(boards, tetromino.name);       
    inputsMaps.forEach((direction: direction, key: key) => {        
        if (pressedKeys.has(key))          
            tetromino.indices = move(tetromino, direction);       
    });
    //tetrominosIndices = move(tetrominosIndices, "down");  
    boards = clearTetrominosFromBoard(boards); 
    boards = putTetrominosInsideBoard(boards, tetromino); 
    console.table(formatToRenderConsole(boards));
}

update();
//update();
//update();
//setInterval(update, UPDATE_FRAME_IN_MILLISECONDS);