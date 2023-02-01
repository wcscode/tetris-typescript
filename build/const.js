//export const TETROMINO_LENGTH = 4;
export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const CELL_EMPTY = 0;
export const CELL_WALL = 1;
export const CELL_FROZEN = 2;
export const CELL_TETROMINO = 3;
export const UPDATE_FRAME_IN_MILLISECONDS = 2000;
export const I_TETROMINO = {
    name: "I",
    indices: [
        0, CELL_TETROMINO, 0, 0,
        0, CELL_TETROMINO, 0, 0,
        0, CELL_TETROMINO, 0, 0,
        0, CELL_TETROMINO, 0, 0
    ]
};
/*export const L_TETROMINO: ITetromino =
{
    name: "L",
    indices: [
        0, 1, 0,
        0, 1, 0,
        0, 1, 1,
        
    ]
}

export const O_TETROMINO: ITetromino =
{
    name: "O",
    indices: [
        1, 1,
        1, 1
        
    ]
}*/
