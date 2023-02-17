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

    const newTetromino = createDeepCopyFromTetromino(tetromino);     

    for(let i = 0; i < newTetromino.indices.length; i++) {

        if(newTetromino.indices[i] === CELL_TETROMINO)
            newTetromino.indices[i] = CELL_FROZEN;        
    }

    return newTetromino;
}

export function isTickFall(tick :ITickManager): boolean {

    tick.count ++;   

    return tick.count % tick.rate === 0;
}

export function tryKick(board: IBoard, tetromino: ITetromino, action: action): ITetromino {    

    const newTetromino = createDeepCopyFromTetromino(tetromino);
    const wallsKicksDatas = newTetromino.name == "I" ? 
        I_TETROMINO_WALL_KICK_DATA : 
        JLTSZ_TETROMINO_WALL_KICK_DATA;        

    const wallKickData = wallsKicksDatas.find(

            f => f.from == newTetromino.rotationState && 
            f.to == newRotationState(newTetromino.rotationState, action == "clockwise" ? 
            rotateTo.right : rotateTo.left
    ));

    for(let i = 0; i < wallKickData.tests.length; ++i) { 

        newTetromino.coord = addVec2(newTetromino.coord, wallKickData.tests[i]);            

        if(!willCollide(board, newTetromino, action)){

            tetromino = newTetromino;               
            break;               
        }
    };  

    return tetromino;      
}

export function willCollide(board: IBoard, tetromino: ITetromino, action: action): boolean {

    const newTetromino = createDeepCopyFromTetromino(tetromino);   
    const {indices, coord} = setAction(newTetromino, action);
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

    const newTetromino = createDeepCopyFromTetromino(tetromino);  
    
    switch(action){          
        case "right": {

            newTetromino.coord = addVec2(newTetromino.coord, {x:1, y:0})
            break; 
        }
        case "left": {

            newTetromino.coord = addVec2(newTetromino.coord, {x:-1, y:0})
            break; 
        }
        case "down": {

            newTetromino.coord = addVec2(newTetromino.coord, {x:0, y:1})
            break; 
        }
        case "clockwise":{   

            const {indices, rotationState} = newTetromino;
            const length = Math.sqrt(indices.length);     
            const currentIndices = Array.from(indices);
            let index = 0;    

            for(let x = 0; x < length; ++x){

                for(let y = length - 1; y >= 0; --y){                   

                    indices[index] = currentIndices[xyToIndex({x, y}, length)];
                    ++index;                  
                }        
            } 

            newTetromino.rotationState = newRotationState(rotationState, rotateTo.right);
            break;
        }
        case "counterClockwise": {  

            const {indices, rotationState} = newTetromino;
            const length = Math.sqrt(indices.length);     
            const currentIndices = Array.from(indices);
            let index = 0;    

            for(let x = length - 1; x >= 0; --x){  

                for(let y = 0; y < length; ++y){                                 

                    newTetromino.indices[index] = currentIndices[xyToIndex({x, y}, length)]
                    ++index;                  
                }        
            } 

            newTetromino.rotationState = newRotationState(rotationState, rotateTo.left);
        }
    } 

    return newTetromino;
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

export function createDeepCopyFromTetromino(tetromino: ITetromino): ITetromino {

    return {

        name: tetromino.name, 
        rotationState: tetromino.rotationState,
        coord:{x:tetromino.coord.x, y:tetromino.coord.y},        
        indices: Array.from(tetromino.indices)
    };
}

export function createDeepCopyFromBoard(board: IBoard): IBoard {

    return { indices: Array.from(board.indices) };
}

export function clearTetrominoFromBoard(board: IBoard): IBoard {   

    const newBoard = createDeepCopyFromBoard(board);

    newBoard.indices.forEach((_, index) => {

        if(newBoard.indices[index] == CELL_TETROMINO)
            newBoard.indices[index] = CELL_EMPTY;
    });

    return newBoard;
}

function newRotationState(rotationState: rotationState, rotateTo: rotateTo): rotationState {

    return ROTATIONS_STATES[((ROTATIONS_STATES.indexOf(rotationState) + rotateTo) % 
           ROTATIONS_STATES_LENGTH + ROTATIONS_STATES_LENGTH) % ROTATIONS_STATES_LENGTH];
}

export function putTetrominoInsideBoard(board:IBoard, tetromino: ITetromino): IBoard {

    const newBoard = createDeepCopyFromBoard(board);
    const {coord, indices} = tetromino;
    const length = Math.sqrt(indices.length);

    for(let y = 0; y <length; ++y){

        for(let x = 0; x <length; ++x){

            const cellValue = indices[xyToIndex({x, y}, length)];

            if(cellValue === CELL_TETROMINO || cellValue === CELL_FROZEN)
                newBoard.indices[xyToIndex(addVec2({x, y}, coord), BOARD_WIDTH)] = cellValue;              
        } 
    }

    return newBoard;
}

export function getRandomTetromino(): ITetromino {

    const tetrominos: ITetromino[] = []; 

    tetrominos.push(L_TETROMINO);   

    return createDeepCopyFromTetromino(tetrominos[Math.floor(Math.random() * tetrominos.length)]);    
}

export function buildBoardArray(): IBoard {

    const indices: number[] = [];

    for(let y: number = 0; y < BOARD_HEIGHT; ++y){

        for(let x: number = 0; x < BOARD_WIDTH; ++x){

            let status = CELL_EMPTY;

            if(x == 0 || x == BOARD_WIDTH - 1 || y == BOARD_HEIGHT - 1) 
                status = CELL_WALL; 
            
            indices.push(status);
        }
    }

    return {indices: indices};    
}

export function gravity(board: IBoard) {
  
    const newBoard = createDeepCopyFromBoard(board);

    for(let y: number = BOARD_HEIGHT -1; y >= 0; --y){

        for(let x: number = 0; x < BOARD_WIDTH; ++x){

            const bottomRow:vec2 = addVec2({x,y}, {x:0, y:1});
            //console.log(BOARD_HEIGHT -1)
            if(board[xyToIndex(bottomRow, BOARD_WIDTH)] == CELL_EMPTY)
                newBoard[xyToIndex({x, y}, BOARD_WIDTH)] = board[xyToIndex(bottomRow, BOARD_WIDTH)]
        }
    }
 
    return newBoard;
}

export function render(board: IBoard, tetromino:ITetromino, pressedKeys: Set<string>): void {
  
    board.indices.forEach((_, index) => {

        const cellElement: HTMLElement = document.querySelector(`[data-cell-id="${index}"]`);
        cellElement.innerHTML =  board.indices[index] == CELL_EMPTY ? "" : board.indices[index].toString();
    });
   
    document.getElementById('coord').innerHTML = `x:${tetromino.coord.x} y:${tetromino.coord.y}`;
    document.getElementById('rotationState').innerHTML = `${tetromino.rotationState}`;
    document.getElementById('pressedKeys').innerHTML = `${Array.from(pressedKeys).reduce((a, b) => a + " " + b, "")}`;
}

export function buildDivBoard(board: IBoard, containerId: string): void {

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

function isBusyCell(board: IBoard, coord:vec2): boolean {

    const freeCellsStates: number[] = [CELL_EMPTY, CELL_TETROMINO];

    return !freeCellsStates.some(cellState => cellState == board.indices[xyToIndex(coord, BOARD_WIDTH)]);
}

function xyToIndex(coord:vec2, maxX: number ): number {

     return coord.y * maxX + coord.x;
}

function addVec2(coord1:vec2, coord2: vec2): vec2 {

    return {x: coord1.x + coord2.x, y: coord1.y + coord2.y};
}

function indexToXy(index: number, maxX: number ): vec2 {

    let y = Math.floor(index / maxX);   
    let x = index - maxX * y;

    return {x, y};
}