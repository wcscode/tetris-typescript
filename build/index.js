import { UPDATE_FRAME_IN_MILLISECONDS, } from "./const.js";
import { buildBoardArray, clearTetrominoFromBoard, getRandomTetromino, setInput, setAction, putTetrominoInsideBoard, willCollide, buildDivBoard, render, tryKick, isTickFall, freezeTetromino, gravity } from "./util.js";
const { pressedKeys, inputs, keydown, keyup } = setInput();
const tick = { count: 0, rate: 10 };
let board = buildBoardArray();
buildDivBoard(board, "board");
let tetromino = getRandomTetromino();
board = putTetrominoInsideBoard(board, tetromino);
function update() {
    const tickFall = isTickFall(tick);
    if (tickFall)
        board = gravity(board);
    inputs.forEach((action, key) => {
        if (pressedKeys.has(key)) {
            if (willCollide(board, tetromino, action)) {
                switch (action) {
                    case "clockwise":
                    case "counterClockwise": {
                        tetromino = tryKick(board, tetromino, action);
                        break;
                    }
                    case "down": {
                        if (tickFall) {
                            tetromino = freezeTetromino(tetromino);
                            board = putTetrominoInsideBoard(board, tetromino);
                            tetromino = getRandomTetromino();
                        }
                    }
                }
            }
            else {
                tetromino = setAction(tetromino, action);
            }
        }
    });
    //   keyup("a", "s"); 
    // if(tickFall) 
    //   keyup("ArrowDown");
    board = clearTetrominoFromBoard(board);
    board = putTetrominoInsideBoard(board, tetromino);
    render(board, tetromino, pressedKeys);
}
setInterval(update, UPDATE_FRAME_IN_MILLISECONDS);
