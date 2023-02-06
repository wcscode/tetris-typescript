import {
    BOARD_WIDTH, 
    BOARD_HEIGHT,
    CELL_TETROMINO, 
    CELL_EMPTY, 
    CELL_WALL, 
    CELL_FROZEN, 
    L_TETROMINO,
    //TETROMINO_LENGTH,
  //  L_TETROMINO
} from "./const.js";

export type action = "left" | "right" | "down" | "clockwise" | "counterClockwise";
export type key = "ArrowLeft" | "ArrowRight" | "ArrowDown" | "a" | "s";
export type tetrominoName = "I" | "L" | "T" | "O" | "S" | "Z"; 
interface vec2 {x: number, y:number};

export interface IBoard{
    indices: number[];
}

export interface ITetromino {    
    name: tetrominoName;
    coord: vec2;
    indices: number[];
}

export function willCollide(board: IBoard, tetromino: ITetromino, action: action): boolean{
    return true;   
}

export function mapOfKeyAndMovements(){
    const mapOfMovements = new Map<key, action>();
    mapOfMovements.set("ArrowLeft", "left");
    mapOfMovements.set("ArrowRight", "right");
    mapOfMovements.set("ArrowDown", "down");
    mapOfMovements.set("a", "counterClockwise");    
    mapOfMovements.set("s", "clockwise");
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
export function preserveTetromino(tetromino: ITetromino): ITetromino{
    return {
        name: tetromino.name, 
        coord:{x:tetromino.coord.x, y:tetromino.coord.y},        
        indices: Array.from(tetromino.indices)}
}

export function clearTetrominosFromBoard(board: IBoard, tetromino:ITetromino): IBoard {   
    const {coord, indices} = tetromino;   
    const length = Math.sqrt(indices.length);   
    for(let y = 0; y <length; ++y){
        for(let x = 0; x <length; ++x){          
           if(indices[xyToIndex({x, y}, length)] === CELL_TETROMINO){             
                board.indices[xyToIndex(addVec2({x, y}, coord), BOARD_WIDTH)] =  CELL_EMPTY;  
           }
        } 
    }
    return board;
}

export function setAction(tetromino: ITetromino, action: action): ITetromino {
    switch(action){          
        case "right":{
            tetromino.coord = addVec2(tetromino.coord, {x:1, y:0})
            break; 
        }  
        case "left":{
            tetromino.coord = addVec2(tetromino.coord, {x:-1, y:0})
            break; 
        }    
        case "down":{
            tetromino.coord = addVec2(tetromino.coord, {x:0, y:1})
            break; 
        }
        case "clockwise":{
            const {indices} = tetromino;
            const length = Math.sqrt(indices.length);     
            const currentIndices = Array.from(indices);
            let index = 0;    
            for(let x = 0; x < length; ++x){
                for(let y = length - 1; y >= 0; --y){                   
                    tetromino.indices[index] = currentIndices[xyToIndex({x, y}, length)]
                    ++index;                  
                }        
            } 
            break;
        }
        case "counterClockwise": {
            const {indices} = tetromino;
            const length = Math.sqrt(indices.length);     
            const currentIndices = Array.from(indices);
            let index = 0;    
            for(let x = length - 1; x >= 0; --x){  
            for(let y = 0; y < length; ++y){
                                 
                    tetromino.indices[index] = currentIndices[xyToIndex({x, y}, length)]
                    ++index;                  
                }        
            } 
        }
    }   
    
    return tetromino;
}

export function putTetrominoInsideBoard(board:IBoard, tetromino: ITetromino): IBoard{
    const {coord, indices} = tetromino;
    const length = Math.sqrt(indices.length);
    for(let y = 0; y <length; ++y){
        for(let x = 0; x <length; ++x){
            if(indices[xyToIndex({x, y}, length)] === CELL_TETROMINO){
                board.indices[xyToIndex(addVec2({x, y}, coord), BOARD_WIDTH)] = CELL_TETROMINO;  
            }
        } 
    }  
    
    return board;
}

export function getRandomTetromino(): ITetromino{
    const tetrominos: ITetromino[] = []; 
    tetrominos.push(L_TETROMINO);
    //tetrominos.push(L_TETROMINO);
    return tetrominos[Math.floor(Math.random() * tetrominos.length)];    
}

export function buildBoardArray(): IBoard {
    const indices: number[] = [];
    for(let y: number = 0; y < BOARD_HEIGHT; ++y){
        for(let x: number = 0; x < BOARD_WIDTH; ++x){
            let status = CELL_EMPTY;
            if(x == 0 || x == BOARD_WIDTH - 1 || y == BOARD_HEIGHT - 1) status = CELL_WALL; 
            indices.push(status);
        }
    }
    return {indices: indices};    
}

export function formatToRenderConsole(board: IBoard): number[][]{
    const newBoards: number[][] = [];
    for(let y: number = 0; y < BOARD_HEIGHT; ++y){
        const xBoards: number[] = [];
        for(let x: number = 0; x < BOARD_WIDTH; ++x){
           xBoards.push(board.indices[xyToIndex({x, y}, BOARD_WIDTH)]);           
        }
        newBoards[y] = xBoards;
    }
    return newBoards;
}

function xyToIndex(coord:vec2, maxX: number ): number {
     return coord.y * maxX + coord.x;
}

function addVec2(coord1:vec2, coord2: vec2): vec2 {
    return {x: coord1.x + coord2.x, y: coord1.y + coord2.y};
}

function indexToXy(index: number, maxX: number ): vec2{
    let y = Math.floor(index / maxX);   
    let x = index - maxX * y;
    return {x, y};
}