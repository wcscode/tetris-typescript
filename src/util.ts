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

export interface IBoard{
    indices: number[];
}

export interface ITetromino {    
    name: tetrominoName;
    coord: vec2;
    indices: number[];
}

function rotate(tetromino: ITetromino, direction: string): ITetromino{
     tetromino.indices = tetromino.indices.map(index => index);
     return tetromino;
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

export function clearTetrominosFromBoard(board: IBoard, oldTetromino:ITetromino): IBoard {   
    const {coord, indices} = oldTetromino;
   
    const length = Math.sqrt(indices.length);
    for(let y = 0; y <length; ++y){
        for(let x = 0; x <length; ++x){
            if(indices[xyToIndex({x, y}, length)] === CELL_TETROMINO){
                console.log(addVec2({x, y}, coord))
                board.indices[xyToIndex(addVec2({x, y}, coord), BOARD_WIDTH)] = CELL_EMPTY;  
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
    tetrominos.push(I_TETROMINO);
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