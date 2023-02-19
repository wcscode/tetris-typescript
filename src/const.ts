export type action = "left" | "right" | "down" | "up" | "clockwise" | "counterClockwise";
//export type key = "ArrowLeft" | "ArrowRight" | "ArrowDown" | "a" | "s";
export type tetrominoName = "I" | "L" | "T" | "O" | "S" | "Z"| "J"; 
export type rotationState = "spawn" | "right" | "left" | "twoRotation";
export enum rotateTo { left = -1, right = 1};

export interface vec2 {

    x: number, 
    y:number
};

export interface IBoard {

    indices: number[];
    destroyedRows: number[];
}

export interface IInputManager {

    pressedKeys: Map<string,action>;
    cancelAction: Function;
}
export interface ITickManager {

    count: number;
    rate: number;
}

export interface ITetromino { 

    name: tetrominoName;
    rotationState: rotationState;
    coord: vec2;
    indices: number[];
}

export interface IRotationState {

    from: rotationState;
    to: rotationState;
    tests: vec2[];
}

export const BOARD_WIDTH: number = 12;
export const BOARD_HEIGHT: number = 21;
export const BOARD_INNER_WIDTH: number = BOARD_WIDTH - 1;
export const BOARD_INNER_HEIGHT: number = BOARD_HEIGHT - 2;
export const CELL_EMPTY: number = 0;
export const CELL_WALL: number = 1;
export const CELL_FROZEN: number = 2;
export const CELL_TETROMINO: number = 3;
export const UPDATE_FRAME_IN_MILLISECONDS = 70;
export const ROTATIONS_STATES: rotationState[] = ["left", "spawn", "right", "twoRotation"];
export const ROTATIONS_STATES_LENGTH: number = ROTATIONS_STATES.length;

export const JLTSZ_TETROMINO_WALL_KICK_DATA: IRotationState[] =  [
    {from: "spawn", to: "right", tests: [{x:1, y:0}/**/, {x:-1, y:0}, {x:-1, y:1}, {x:0, y:-2}, {x:-1, y:-2}]}, 
    {from: "right", to: "spawn", tests: [{x:-1, y:0}/**/, {x:1, y:0}, {x:1, y:-1}, {x:0, y:2}, {x:1, y:2}]},
    {from: "right", to: "twoRotation", tests: [{x:-1, y:0}/**/,{x:1, y:0}, {x:1, y:-1}, {x:0, y:2}, {x:1, y:2}]},
    {from: "twoRotation", to: "right", tests: [{x:1, y:0}/**/, {x:-1, y:0}, {x:-1, y:1}, {x:0, y:-2}, {x:-1, y:-2}]},
    {from: "twoRotation", to: "left", tests: [{x:-1, y:0}/**/,{x:1, y:0}, {x:1, y:1}, {x:0, y:-2}, {x:1, y:-2}]},
    {from: "left", to: "twoRotation", tests: [{x:1, y:0}/**/, {x:-1, y:0}, {x:-1, y:-1}, {x:0, y:2}, {x:-1, y:2}]},
    {from: "left", to: "spawn", tests: [{x:1, y:0}/**/, {x:-1, y:0}, {x:-1, y:-1}, {x:0, y:2}, {x:-1, y:2}]},
    {from: "spawn", to: "left", tests: [{x:-1, y:0}/**/, {x:1, y:0}, {x:1, y:1}, {x:0, y:-2}, {x:1, y:-2}]},
];

export const I_TETROMINO_WALL_KICK_DATA: IRotationState[] = [
    {from: "spawn", to: "right",tests:[ {x:-2, y:0}, {x:1, y:0}, {x:-2, y:-1}, {x:1, y:2}]},
    {from: "right", to: "spawn",tests:[ {x:2, y:0}, {x:-1, y:0}, {x:2, y:1}, {x:-1, y:-2}]},
    {from: "right", to: "twoRotation",tests:[ {x:-1, y:0}, {x:2, y:0}, {x:-1, y:2}, {x:2, y:-1}]},
    {from: "twoRotation", to: "right",tests:[{x:2, y:0} /**/, {x:1, y:0}, {x:-2, y:0}, {x:1, y:-2}, {x:-2, y:1}]},
    {from: "twoRotation", to: "left",tests:[{x:2, y:0}, {x:-1, y:0}, {x:2, y:1}, {x:-1, y:-2}]},
    {from: "left", to: "twoRotation",tests:[ {x:-2, y:0}, {x:1, y:0}, {x:-2, y:-1}, {x:1, y:2}]},
    {from: "left", to: "spawn",tests: [{x:1, y:0}, {x:-2, y:0}, {x:1, y:-2}, {x:-2, y:1}]},
    {from: "spawn", to: "left",tests: [{x:-2, y:0} /**/, {x:-1, y:0}, {x:2, y:0}, {x:-1, y:2}, {x:2, y:-1}]},
];

export const J_TETROMINO: ITetromino = {

    name: "J",  
    coord: {x:5 , y:0},
    rotationState: "spawn",  
    indices: [

        0, CELL_TETROMINO, 0,  
        0, CELL_TETROMINO, 0,  
        CELL_TETROMINO, CELL_TETROMINO, 0,  
        
    ]
}

export const L_TETROMINO: ITetromino = {

    name: "L",  
    coord: {x:5 , y:0},
    rotationState: "spawn",  
    indices: [

        0, CELL_TETROMINO, 0,  
        0, CELL_TETROMINO, 0,  
        0, CELL_TETROMINO, CELL_TETROMINO,  
        
    ]
}

export const T_TETROMINO: ITetromino = {

    name: "T",  
    coord: {x:5 , y:0},
    rotationState: "spawn",  
    indices: [

        0, 0, 0,  
        CELL_TETROMINO, CELL_TETROMINO, CELL_TETROMINO,  
        0, CELL_TETROMINO, 0,  
        
    ]
}

export const S_TETROMINO: ITetromino = {

    name: "S",  
    coord: {x:5 , y:0},
    rotationState: "spawn",  
    indices: [

        0, CELL_TETROMINO, CELL_TETROMINO,  
        CELL_TETROMINO, CELL_TETROMINO, 0,  
        0, 0, 0,  
        
    ]
}

export const Z_TETROMINO: ITetromino = {

    name: "Z",  
    coord: {x:5 , y:0},
    rotationState: "spawn",  
    indices: [

        CELL_TETROMINO, CELL_TETROMINO, 0,  
        0, CELL_TETROMINO, CELL_TETROMINO,  
        0, 0, 0,  
        
    ]
}

export const O_TETROMINO: ITetromino = {

    name: "O",  
    coord: {x:5 , y:0},
    rotationState: "spawn",  
    indices: [

        CELL_TETROMINO, CELL_TETROMINO,  
        CELL_TETROMINO, CELL_TETROMINO, 
    ]
}

export const I_TETROMINO: ITetromino = {

    name: "I",  
    coord: {x:5 , y:0},
    rotationState: "spawn",  
    indices: [

        0, CELL_TETROMINO, 0, 0,  
        0, CELL_TETROMINO, 0, 0,  
        0, CELL_TETROMINO, 0, 0,  
        0, CELL_TETROMINO, 0, 0         
    ]
}