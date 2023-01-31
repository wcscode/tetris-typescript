import { UPDATE_FRAME_IN_MILLISECONDS } from "./const.js";
import { buildBoardArray, fillBoardWithTetrominoInInitialPosition, formatToRenderConsole, getRandomTetromino } from "./util.js";
const boards = buildBoardArray();
const tetrominos = getRandomTetromino();
fillBoardWithTetrominoInInitialPosition(boards, tetrominos);
function update() {
    console.clear();
    console.table(formatToRenderConsole(boards));
}
setInterval(update, UPDATE_FRAME_IN_MILLISECONDS);
