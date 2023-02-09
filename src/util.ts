import {
    BOARD_WIDTH, 
    BOARD_HEIGHT,
    CELL_TETROMINO, 
    CELL_EMPTY, 
    CELL_WALL, 
    CELL_FROZEN, 
    L_TETROMINO,
    IBoard,
    vec2,
    action,
    key,
    rotationState,
    rotateTo,
    ITetromino,
    ROTATIONS_STATES_LENGTH,
    ROTATIONS_STATES,
    I_TETROMINO_WALL_KICK_DATA,
    JLTSZ_TETROMINO_WALL_KICK_DATA,
   
} from "./const.js";

function isBusyCell(board: IBoard, coord:vec2): boolean{
    const freeCellsStates: number[] = [CELL_EMPTY, CELL_TETROMINO];
    return !freeCellsStates.some(cellState => cellState == board.indices[xyToIndex(coord, BOARD_WIDTH)]);
}

export function tryKick(board: IBoard, tetromino: ITetromino, action: action): ITetromino {
    if(action != "clockwise" && action != "counterClockwise")   
        return tetromino;       
    const wallsKicksDatas = tetromino.name == "I" ? 
        I_TETROMINO_WALL_KICK_DATA : 
        JLTSZ_TETROMINO_WALL_KICK_DATA;        
        const wallKickData = wallsKicksDatas.find(
            f => f.from == tetromino.rotationState && 
            f.to == newRotationState(tetromino.rotationState, action == "clockwise" ? 
            rotateTo.right : rotateTo.left));           
        wallKickData.tests.forEach(testCoord => {    
            const tempTetromino =  createDeepCopyFromTetromino(tetromino);
            tempTetromino.coord = addVec2(tempTetromino.coord, testCoord);            
            if(!willCollide(board, tempTetromino, action)){ 
                console.log("temp" , tempTetromino.coord)               
                return setAction(tempTetromino, action);
            }
        });  
        return tetromino;      
}

export function willCollide(board: IBoard, tempTetromino: ITetromino, action: action): boolean{  
    const {indices, coord} = setAction(tempTetromino, action);
    const length = Math.sqrt(indices.length); 
    for(let y = 0; y <length; ++y){
        for(let x = 0; x <length; ++x){          
           if(indices[xyToIndex({x, y}, length)] === CELL_TETROMINO){                  
                if(isBusyCell(board, addVec2({x, y}, coord)))
                    return true;                
           }
        } 
    }
    return false;  
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
export function createDeepCopyFromTetromino(tetromino: ITetromino): ITetromino{
    return {
        name: tetromino.name, 
        rotationState: tetromino.rotationState,
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

function newRotationState(rotationState: rotationState, rotateTo: rotateTo): rotationState{
    return ROTATIONS_STATES[((ROTATIONS_STATES.indexOf(rotationState) + rotateTo) % 
    ROTATIONS_STATES_LENGTH + ROTATIONS_STATES_LENGTH) % ROTATIONS_STATES_LENGTH];
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
            console.log("clock", tetromino.coord)
            const {indices, rotationState} = tetromino;
            const length = Math.sqrt(indices.length);     
            const currentIndices = Array.from(indices);
            let index = 0;    
            for(let x = 0; x < length; ++x){
                for(let y = length - 1; y >= 0; --y){                   
                    indices[index] = currentIndices[xyToIndex({x, y}, length)]
                    ++index;                  
                }        
            }           
            tetromino.rotationState = newRotationState(rotationState, rotateTo.right);
            break;
        }
        case "counterClockwise": {
            console.log("counter", tetromino.coord)
            const {indices, rotationState} = tetromino;
            const length = Math.sqrt(indices.length);     
            const currentIndices = Array.from(indices);
            let index = 0;    
            for(let x = length - 1; x >= 0; --x){  
                for(let y = 0; y < length; ++y){                                 
                    tetromino.indices[index] = currentIndices[xyToIndex({x, y}, length)]
                    ++index;                  
                }        
            } 
            tetromino.rotationState = newRotationState(rotationState, rotateTo.left);
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

export function render(board: IBoard, preservedTetromino: ITetromino, tetromino:ITetromino): void{
    const length = Math.sqrt(tetromino.indices.length);
    for(let y = 0; y <length; ++y){
        for(let x = 0; x <length; ++x){
            if(preservedTetromino.indices[xyToIndex({x, y}, length)] === CELL_TETROMINO){
                const index = xyToIndex(addVec2({x, y}, preservedTetromino.coord), BOARD_WIDTH);                
                const cell: HTMLElement = document.querySelector(`[data-cell-id="${index}"]`)
                cell.innerHTML = "";                
            }
        }
    }
    for(let y = 0; y <length; ++y){
        for(let x = 0; x <length; ++x){
            if(tetromino.indices[xyToIndex({x, y}, length)] === CELL_TETROMINO){
                const index = xyToIndex(addVec2({x, y}, tetromino.coord), BOARD_WIDTH);                
                const cell: HTMLElement = document.querySelector(`[data-cell-id="${index}"]`)
                cell.innerHTML =  CELL_TETROMINO.toString();                
            }
        }
    }
    document.getElementById('coord').innerHTML = `x:${tetromino.coord.x} y:${tetromino.coord.y}`
}

export function buildDivBoard(board: IBoard, containerId: string): void{
    const container: HTMLElement | null = document.getElementById(containerId);
    if(container == null)
        throw new Error("Container not found!");         
    for(let y: number = 0; y < BOARD_HEIGHT; ++y){
        const row: HTMLElement = document.createElement('div');
        for(let x: number = 0; x < BOARD_WIDTH; ++x){
           const cell: HTMLElement = document.createElement('span');
           const index: string = xyToIndex({x, y}, BOARD_WIDTH).toString();
           cell.setAttribute("data-cell-id", index);
           cell.style.display = "inline-block";
           cell.style.width = cell.style.height = "1.2rem";
           cell.innerHTML = board.indices[index] == 0 ? "" : board.indices[index];
           row.append(cell);           
        }
        container.appendChild(row);
    }   
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