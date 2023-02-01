import { ITetromino } from "./util";

//export const TETROMINO_LENGTH = 4;
export const BOARD_WIDTH: number = 12;
export const BOARD_HEIGHT: number = 21;
export const CELL_EMPTY: number = 0;
export const CELL_WALL: number = 1;
export const CELL_FROZEN: number = 2;
export const CELL_TETROMINO: number = 3;
export const UPDATE_FRAME_IN_MILLISECONDS = 2000;

export const I_TETROMINO: ITetromino =
{
    name: "I",    
    indices: [
        0, CELL_TETROMINO, 0, 0,  
        0, CELL_TETROMINO, 0, 0,  
        0, CELL_TETROMINO, 0, 0,  
        0, CELL_TETROMINO, 0, 0
    ]
}
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
