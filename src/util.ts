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
    IInputManager, 
    ITickManager,
   
} from "./const.js";

export function freezeTetromino(tetromino: ITetromino): ITetromino {    
    for(let i = 0; i < tetromino.indices.length; i++){
        if(tetromino.indices[i] === CELL_TETROMINO)
        tetromino.indices[i] = CELL_FROZEN;        
    }
    return tetromino;
}

export function isTickFall(tick :ITickManager): boolean {
    tick.count ++;
    return tick.count % tick.rate === 0;
}

export function tryKick(board: IBoard, tempTetromino: ITetromino, tetromino: ITetromino, action: action): ITetromino {      
    const wallsKicksDatas = tempTetromino.name == "I" ? 
        I_TETROMINO_WALL_KICK_DATA : 
        JLTSZ_TETROMINO_WALL_KICK_DATA;        
        const wallKickData = wallsKicksDatas.find(
            f => f.from == tempTetromino.rotationState && 
            f.to == newRotationState(tempTetromino.rotationState, action == "clockwise" ? 
            rotateTo.right : rotateTo.left));
        for(let i = 0; i < wallKickData.tests.length; ++i) { 
            tempTetromino.coord = addVec2(tempTetromino.coord, wallKickData.tests[i]);            
            if(!willCollide(board, tempTetromino, action)){
                tetromino = tempTetromino;               
                break;               
            }
        };  
        return tetromino;      
}

export function willCollide(board: IBoard, tempTetromino: ITetromino, action: action): boolean{
   // console.log('willCollide')  
    const {indices, coord} = setAction(tempTetromino, action);
    const length = Math.sqrt(indices.length); 
    for(let y = 0; y <length; ++y){
        for(let x = 0; x <length; ++x){    
           const indice = indices[xyToIndex({x, y}, length)];       
           if(indice === CELL_TETROMINO || indice === CELL_FROZEN){                  
                if(isBusyCell(board, addVec2({x, y}, coord)))
                    return true;                
           }
        } 
    }
    return false;  
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

export function setInput(): IInputManager {
    const inputs = new Map<key, action>();
    inputs.set("ArrowLeft", "left");
    inputs.set("ArrowRight", "right");
    inputs.set("ArrowDown", "down");
    inputs.set("a", "counterClockwise");    
    inputs.set("s", "clockwise");
    const pressedKeys = new Set<string>();    
    window.addEventListener("keydown", (event) => {  pressedKeys.add(event.key); }); 
    window.addEventListener("keyup", (event) => {  pressedKeys.delete(event.key); });   
    return {
        pressedKeys, 
        inputs, 
        keydown: (...keys: key[]): void => { keys.forEach(key => { pressedKeys.add(key); }); }, 
        keyup : (...keys: key[]): void => { keys.forEach(key => { pressedKeys.delete(key); })}
    };
}

export function createDeepCopyFromTetromino(tetromino: ITetromino): ITetromino{
    return {
        name: tetromino.name, 
        rotationState: tetromino.rotationState,
        coord:{x:tetromino.coord.x, y:tetromino.coord.y},        
        indices: Array.from(tetromino.indices)}
}

export function clearTetrominoFromBoard(board: IBoard, tetromino:ITetromino): IBoard {   
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

export function putTetrominoInsideBoard(board:IBoard, tetromino: ITetromino): IBoard{
    const {coord, indices} = tetromino;
    const length = Math.sqrt(indices.length);
    for(let y = 0; y <length; ++y){
        for(let x = 0; x <length; ++x){
            const cellValue = indices[xyToIndex({x, y}, length)];
            if(cellValue === CELL_TETROMINO || cellValue === CELL_FROZEN){
                board.indices[xyToIndex(addVec2({x, y}, coord), BOARD_WIDTH)] = cellValue;  
            }
        } 
    }      
    return board;
}

export function getRandomTetromino(): ITetromino{
    const tetrominos: ITetromino[] = []; 
    tetrominos.push(L_TETROMINO);
    //tetrominos.push(L_TETROMINO);
    return createDeepCopyFromTetromino(tetrominos[Math.floor(Math.random() * tetrominos.length)]);    
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

export function render(board: IBoard, tetromino:ITetromino): void{
  
    board.indices.forEach((cell, index) => {
        const cellElement: HTMLElement = document.querySelector(`[data-cell-id="${index}"]`);
        cellElement.innerHTML =  board.indices[index] == CELL_EMPTY ? "" : board.indices[index].toString();
    });
   
    document.getElementById('coord').innerHTML = `x:${tetromino.coord.x} y:${tetromino.coord.y}`;
    document.getElementById('rotationState').innerHTML = `${tetromino.rotationState}`;
}
/*export function render(board: IBoard, preservedTetromino: ITetromino, tetromino:ITetromino): void{
    const length = Math.sqrt(tetromino.indices.length);
    for(let y = 0; y <length; ++y){
        for(let x = 0; x <length; ++x){
            const cellValue = tetromino.indices[xyToIndex({x, y}, length)];           
            if(cellValue === CELL_TETROMINO){
                const index = xyToIndex(addVec2({x, y}, preservedTetromino.coord), BOARD_WIDTH);                
                const cellElement: HTMLElement = document.querySelector(`[data-cell-id="${index}"]`)
                cellElement.innerHTML = "";
            }
        }
    }  
    for(let y = 0; y <length; ++y){
        for(let x = 0; x <length; ++x){
            const cellValue = tetromino.indices[xyToIndex({x, y}, length)]            
            if(cellValue === CELL_TETROMINO || cellValue === CELL_FROZEN){
                const index = xyToIndex(addVec2({x, y}, tetromino.coord), BOARD_WIDTH);                
                const cellElement: HTMLElement = document.querySelector(`[data-cell-id="${index}"]`)
                cellElement.innerHTML =  cellValue.toString();                
            }
        }
    }
    document.getElementById('coord').innerHTML = `x:${tetromino.coord.x} y:${tetromino.coord.y}`;
    document.getElementById('rotationState').innerHTML = `${tetromino.rotationState}`;
}*/

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

function isBusyCell(board: IBoard, coord:vec2): boolean{
    const freeCellsStates: number[] = [CELL_EMPTY, CELL_TETROMINO];
    return !freeCellsStates.some(cellState => cellState == board.indices[xyToIndex(coord, BOARD_WIDTH)]);
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