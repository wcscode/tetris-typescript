import {
    BOARD_WIDTH, 
    BOARD_HEIGHT,
    CELL_TETROMINO, 
    CELL_EMPTY, 
    CELL_WALL, 
    CELL_FROZEN, 
    I_TETROMINO,
    //TETROMINO_LENGTH,
  //  L_TETROMINO
} from "./const.js";

export type action = "left" | "right" | "down" | "rotateLeft" | "rotateRight";
export type key = "ArrowLeft" | "ArrowRight" | "ArrowDown" | "a" | "s";
export type tetrominoName = "I" | "L" | "T" | "O" | "S" | "Z"; 
interface vec2 {x: number, y:number};

export interface ITetromino {    
    name: tetrominoName;
    coord: vec2;
    indices: number[];
}

export function mapOfKeyAndMovements(){
    const mapOfMovements = new Map<key, action>();
    mapOfMovements.set("ArrowLeft", "left");
    mapOfMovements.set("ArrowRight", "right");
    mapOfMovements.set("ArrowDown", "down");
    mapOfMovements.set("a", "rotateLeft");    
    mapOfMovements.set("s", "rotateRight");
    return mapOfMovements;
}

export function setInput(): Set<string> {
    const pressedKeys = new Set<string>();
    document.addEventListener("keydown", function(event) {    
        pressedKeys.add(event.key);       
    });
    document.addEventListener("keyup", function(event) {
        pressedKeys.delete(event.key);        
    });
    return pressedKeys;
}

export function clearTetrominosFromBoard(boards: number[], tetromino: ITetromino): number[] {
    const {indices} = getTetromino(boards, tetromino);
    indices.forEach((indice: number) => boards[indice] = CELL_EMPTY )
    return boards;
}
 
export function putTetrominosInsideBoard(boards: number[], tetromino: ITetromino): number[] {
    for (let i = 0; i < tetromino.indices.length; i++) {
        boards[tetromino.indices[i]] = CELL_TETROMINO;
    }
    return boards;
}

export function getTetromino(boards: number[], tetromino: ITetromino): ITetromino{    
    let index: number = boards.indexOf(CELL_TETROMINO);
    const indices: number[] = [];
    while (index !== -1) {
        indices.push(index);
        index = boards.indexOf(CELL_TETROMINO, index + 1);
      }

     tetromino.indices = indices;
    return tetromino;  
}

export function setAction(tetromino: ITetromino, action: action): number[] {
    switch(action){          
        case "right":
            return translate(tetromino.indices, 1);                            
        case "left":            
            return translate(tetromino.indices, -1);                
        case "down":           
            return translate(tetromino.indices, 1 + BOARD_WIDTH);   
        default:                         
            return rotate(tetromino.indices, action);
    }   
}

export function fillBoardWithTetrominoInInitialPosition(boards: number[], tetromino: ITetromino): number[]{
    const sideLength = Math.sqrt(tetromino.indices.length);        
    tetromino.indices.forEach((cell, index) => {
        const {x, y}: vec2 = indexToXy(index, sideLength);
        const boardIndex: number = xyToIndex(x + tetromino.coord.x, y + tetromino.coord.y, BOARD_WIDTH);       
        boards[boardIndex] = cell;        
    });  
    return boards;
}

export function getRandomTetromino(): ITetromino{
    const tetrominos: ITetromino[] = []; 
    tetrominos.push(I_TETROMINO);
    //tetrominos.push(L_TETROMINO);
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

const xyToIndex = (x:number, y: number, maxX: number ): number => y * maxX + x;

const translate = (indices: number[], position: number): number[] =>  indices.map(index => index + position);

const rotate = (indices: number[], direction: string): number[] => indices.map(index => index);

function indexToXy(index: number, maxX: number ): vec2{
    let y = Math.floor(index / maxX);   
    let x = index - maxX * y;
    return {x, y};
}