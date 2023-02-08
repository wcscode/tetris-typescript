//export const TETROMINO_LENGTH = 4;
export const BOARD_WIDTH = 12;
export const BOARD_HEIGHT = 21;
export const CELL_EMPTY = 0;
export const CELL_WALL = 1;
export const CELL_FROZEN = 2;
export const CELL_TETROMINO = 3;
export const UPDATE_FRAME_IN_MILLISECONDS = 1000;
/*export const I_TETROMINO: ITetromino =
{
    name: "I",
    coord: {x:4 , y:0},
    indices: [
        0, CELL_TETROMINO, 0, 0,
        0, CELL_TETROMINO, 0, 0,
        0, CELL_TETROMINO, 0, 0,
        0, CELL_TETROMINO, 0, 0
    ]
}*/
export const L_TETROMINO = {
    name: "L",
    coord: { x: 5, y: 0 },
    rotationState: "spawn",
    indices: [
        0, CELL_TETROMINO, 0,
        0, CELL_TETROMINO, 0,
        0, CELL_TETROMINO, CELL_TETROMINO,
    ]
};
/*
export const O_TETROMINO: ITetromino =
{
    name: "O",
    indices: [
        1, 1,
        1, 1
        
    ]
}*/
