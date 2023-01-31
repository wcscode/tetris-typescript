import {
    BOARD_WIDTH, 
    BOARD_HEIGHT,
    CELL_TETROMINO, 
    CELL_EMPTY, 
    CELL_WALL, 
    CELL_FROZEN, 
    I_TETROMINO,
    TETROMINO_LENGTH
} from "./const.js";

export function fillBoardWithTetrominoInInitialPosition(boards: number[], tetrominos: number[]){
    //Try to center the tetromino
    const yFirstIndex = 0;
    const yLastIndex = yFirstIndex + TETROMINO_LENGTH;
    const xFirstIndex: number = BOARD_WIDTH / 2 - 2;
    const xLastIndex: number = xFirstIndex + TETROMINO_LENGTH;

    for(let y: number = yFirstIndex; y < yLastIndex; ++y){

        for(let x: number = xFirstIndex; x < xLastIndex; ++x){

            boards[y * TETROMINO_LENGTH + x] = CELL_TETROMINO;
        }
    }
}

export function getRandomTetromino(): number[]{

    const tetrominos: number[][] = []; 

    tetrominos.push(I_TETROMINO);

    return tetrominos[Math.floor(Math.random() * tetrominos.length)];
}

export function buildBoardArray(): number[] {

    const boards: number[] = [];

    for(let y: number = 0; y < BOARD_HEIGHT; ++y){

        for(let x: number = 0; x < BOARD_WIDTH; ++x){

            let status = CELL_EMPTY;

            if(x == 0 || x == BOARD_WIDTH - 1 || y == BOARD_HEIGHT - 1) status = CELL_WALL;           

            boards.push(status);
        }
    }

    return boards;    
}
export function formatToRenderConsole(boards: number[]): number[][]{

    const newBoards: number[][] = [];

    for(let y: number = 0; y < BOARD_HEIGHT; ++y){

        const xBoards: number[] = [];

        for(let x: number = 0; x < BOARD_WIDTH; ++x){

           xBoards.push(boards[y * BOARD_WIDTH + x])
           
        }

        newBoards[y] = xBoards;
    }

    return newBoards;
}