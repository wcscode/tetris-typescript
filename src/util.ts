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

type direction = "left" | "right" | "down";
type vec2 = [number, number];

const xyToIndex = (x:number, y: number, maxX: number ): number => y * maxX + x;

function indexToXy(index: number, maxX: number ): vec2{
    let y = Math.floor(index / maxX);   
    let x = index - maxX * y;
    return [x, y];
} 


export function clearTetrominosFromBoard(boards: number[]): number[] {
    const tetrominosIndices = getTetrominosIndices(boards);
    tetrominosIndices.forEach((indice: number) => boards[indice] = CELL_EMPTY )
    return boards;
}

export function putTetrominosInsideBoard(boards: number[], tetrominosIndices: number[]): number[] {
    for (let i = 0; i < tetrominosIndices.length; i++) {
        boards[tetrominosIndices[i]] = CELL_TETROMINO;
    }
    return boards;
}

export function getTetrominosIndices(boards: number[]): number[]{    
    let index: number = boards.indexOf(CELL_TETROMINO);
    const indices: number[] = [];
    while (index !== -1) {
        indices.push(index);
        index = boards.indexOf(CELL_TETROMINO, index + 1);
      }
    return indices;
}

export function move(tetrominosIndices: number[], direction: direction): number[] {
        switch(direction){
            case "down":           
                return tetrominosIndices.map(index => index + BOARD_WIDTH);
            case "right":            
                return tetrominosIndices.map(index => index + 1);                
            case "left":            
                return tetrominosIndices.map(index => index - 1);      
        }   
}

export function fillBoardWithTetrominoInInitialPosition(boards: number[], tetrominos: number[]): void{

    for(let y: number = 0; y < TETROMINO_LENGTH; ++y){
        for(let x: number = 0; x < TETROMINO_LENGTH; ++x){
            const indexTetromino = xyToIndex(x, y, TETROMINO_LENGTH);
            const indexBoard =  (indexTetromino + TETROMINO_LENGTH) + (y * TETROMINO_LENGTH) * 2;
            boards[indexBoard] = tetrominos[indexTetromino] == 1 ? CELL_TETROMINO : CELL_EMPTY;
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
           xBoards.push(boards[xyToIndex(x, y, BOARD_WIDTH)]);           
        }
        newBoards[y] = xBoards;
    }
    return newBoards;
}