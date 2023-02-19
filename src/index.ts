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
  tryKickRotation,
  stateScene,
  isGameOver
} from "./util.js";

const {setScene, getScene} = stateScene();
const {pressedKeys, cancelAction} = setInput();

const tick: ITickManager = {count:0, rate:10};  
let board: IBoard = buildBoardArray();
let score = 0;

buildDivBoard(board, "board");

let tetromino: ITetromino = getRandomTetromino();
board = putTetrominoInsideBoard(board, tetromino);

let interval = 0;

window.addEventListener("keydown", function(event) { 

  if(event.key == "Enter"){

    if(getScene() == "start") {

      document.getElementById("start-scene").style.display = "none";
      document.getElementById("play-scene").style.display = "flex";
      document.getElementById('game-over').style.display = "none";

      setScene("play");
      
      tick.count = 0;
      tick.rate = 10;  
      board = buildBoardArray();
      score = 0;
    //  buildDivBoard(board, "board");
      tetromino = getRandomTetromino();
      board = putTetrominoInsideBoard(board, tetromino);
      interval = setInterval(update, UPDATE_FRAME_IN_MILLISECONDS);
    }

    return;     
  }

  if(event.key == "Escape"){

    if(getScene() == "play") {

      document.getElementById("start-scene").style.display = "flex";
      document.getElementById("play-scene").style.display = "none";
      setScene("start");  
      clearInterval(interval);
    }

    return;     
  }
});

function update() {

  if(isGameOver(board)) {

    document.getElementById('game-over').style.display = "block";
    clearInterval(interval);
    return;  
  }

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
    //tick.rate -= board.destroyedRows.length;   
  }

  board = clearTetrominoFromBoard(board); 
  board = putTetrominoInsideBoard(board, tetromino);

  render(board, score, /* tetromino, pressedKeys*/);

   
}


