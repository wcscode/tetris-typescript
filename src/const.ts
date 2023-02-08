export type action = "left" | "right" | "down" | "up" | "clockwise" | "counterClockwise";
export type key = "ArrowLeft" | "ArrowRight" | "ArrowDown" | "a" | "s";
export type tetrominoName = "I" | "L" | "T" | "O" | "S" | "Z"; 
export type rotationState = "spawn" | "right" | "left" | "twoRotation";
export enum rotateTo { left = -1, right = + 1};

export interface vec2 {x: number, y:number};

export interface IBoard{
    indices: number[];
}

export interface ITetromino {    
    name: tetrominoName;
    rotationState: rotationState;
    coord: vec2;
    indices: number[];
}
export interface IRotationState{
    from: rotationState;
    to: rotationState;
    test1: vec2;
    test2: vec2;
    test3: vec2;
    test4: vec2;
}
//export const TETROMINO_LENGTH = 4;
export const BOARD_WIDTH: number = 12;
export const BOARD_HEIGHT: number = 21;
export const CELL_EMPTY: number = 0;
export const CELL_WALL: number = 1;
export const CELL_FROZEN: number = 2;
export const CELL_TETROMINO: number = 3;
export const UPDATE_FRAME_IN_MILLISECONDS = 1000;
export const ROTATIONS_STATES: rotationState[] = ["right", "spawn", "left", "twoRotation"];
export const ROTATIONS_STATES_LENGTH: number = ROTATIONS_STATES.length;
export const JLTSZ_TETROMINO_WALL_KICK_DATA: IRotationState[] =  [
    {from: "spawn", to: "right", test1: {x:-1, y:0}, test2: {x:-1, y:1}, test3: {x:0, y:-2}, test4: {x:-1, y:-2}}, 
    {from: "right", to: "spawn", test1: {x:1, y:0}, test2: {x:1, y:-1}, test3: {x:0, y:2}, test4: {x:1, y:2}},
    {from: "right", to: "twoRotation", test1: {x:1, y:0}, test2: {x:1, y:-1}, test3: {x:0, y:2}, test4: {x:1, y:2}},
    {from: "twoRotation", to: "right", test1: {x:-1, y:0}, test2: {x:-1, y:1}, test3: {x:0, y:-2}, test4: {x:-1, y:-2}},
    {from: "twoRotation", to: "left", test1: {x:1, y:0}, test2: {x:1, y:1}, test3: {x:0, y:-2}, test4: {x:1, y:-2}},
    {from: "left", to: "twoRotation", test1: {x:-1, y:0}, test2: {x:-1, y:-1}, test3: {x:0, y:2}, test4: {x:-1, y:2}},
    {from: "left", to: "spawn", test1: {x:-1, y:0}, test2: {x:-1, y:-1}, test3: {x:0, y:2}, test4: {x:-1, y:2}},
    {from: "spawn", to: "left", test1: {x:1, y:0}, test2: {x:1, y:1}, test3: {x:0, y:-2}, test4: {x:1, y:-2}},
]
export const I_TETROMINO_WALL_KICK_DATA: IRotationState[] = [
    {from: "spawn", to: "right", test1: {x:-2, y:0}, test2: {x:1, y:0}, test3: {x:-2, y:-1}, test4: {x:1, y:2}},
    {from: "right", to: "spawn", test1: {x:2, y:0}, test2: {x:-1, y:0}, test3: {x:2, y:1}, test4: {x:-1, y:-2}},
    {from: "right", to: "twoRotation", test1: {x:-1, y:0}, test2: {x:2, y:0}, test3: {x:-1, y:2}, test4: {x:2, y:-1}},
    {from: "twoRotation", to: "right", test1: {x:1, y:0}, test2: {x:-2, y:0}, test3: {x:1, y:-2}, test4: {x:-2, y:1}},
    {from: "twoRotation", to: "left", test1: {x:2, y:0}, test2: {x:-1, y:0}, test3: {x:2, y:1}, test4: {x:-1, y:-2}},
    {from: "left", to: "twoRotation", test1: {x:-2, y:0}, test2: {x:1, y:0}, test3: {x:-2, y:-1}, test4: {x:1, y:2}},
    {from: "left", to: "spawn", test1: {x:1, y:0}, test2: {x:-2, y:0}, test3: {x:1, y:-2}, test4: {x:-2, y:1}},
    {from: "spawn", to: "left", test1: {x:-1, y:0}, test2: {x:2, y:0}, test3: {x:-1, y:2}, test4: {x:2, y:-1}},
]


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
export const L_TETROMINO: ITetromino =
{
    name: "L",  
    coord: {x:5 , y:0},
    rotationState: "spawn",  
    indices: [
        0, CELL_TETROMINO, 0,  
        0, CELL_TETROMINO, 0,  
        0, CELL_TETROMINO, CELL_TETROMINO,  
        
    ]
}
/*
export const O_TETROMINO: ITetromino =
{
    name: "O",    
    indices: [
        1, 1,
        1, 1
        
    ]
}*/
