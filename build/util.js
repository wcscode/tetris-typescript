import { BOARD_WIDTH, BOARD_HEIGHT, CELL_TETROMINO, CELL_EMPTY, CELL_WALL, CELL_FROZEN, L_TETROMINO, rotateTo, ROTATIONS_STATES_LENGTH, ROTATIONS_STATES, I_TETROMINO_WALL_KICK_DATA, JLTSZ_TETROMINO_WALL_KICK_DATA, BOARD_INNER_HEIGHT, BOARD_INNER_WIDTH, J_TETROMINO, I_TETROMINO, T_TETROMINO, S_TETROMINO, Z_TETROMINO, O_TETROMINO } from "./const.js";
export function freezeTetromino(tetromino) {
    const newTetromino = createDeepCopyFromTetromino(tetromino);
    for (let i = 0; i < newTetromino.indices.length; i++) {
        if (newTetromino.indices[i] === CELL_TETROMINO)
            newTetromino.indices[i] = CELL_FROZEN;
    }
    return newTetromino;
}
export function isTickFall(tick) {
    tick.count++;
    return tick.count % tick.rate === 0;
}
export function tryKickRotation(board, tetromino, action) {
    let newTetromino = createDeepCopyFromTetromino(tetromino);
    const wallsKicksDatas = newTetromino.name == "I" ?
        I_TETROMINO_WALL_KICK_DATA :
        JLTSZ_TETROMINO_WALL_KICK_DATA;
    const wallKickData = wallsKicksDatas.find(f => f.from == newTetromino.rotationState &&
        f.to == newRotationState(newTetromino.rotationState, action == "clockwise" ?
            rotateTo.right : rotateTo.left));
    for (let i = 0; i < wallKickData.tests.length; ++i) {
        newTetromino.coord = addVec2(tetromino.coord, wallKickData.tests[i]);
        if (!willCollide(board, newTetromino, action)) {
            newTetromino = setAction(newTetromino, action);
            return newTetromino;
        }
    }
    ;
    return tetromino;
}
export function willCollide(board, tetromino, action) {
    const newTetromino = createDeepCopyFromTetromino(tetromino);
    const { indices, coord } = setAction(newTetromino, action);
    const length = Math.sqrt(indices.length);
    for (let y = 0; y < length; ++y) {
        for (let x = 0; x < length; ++x) {
            const indice = indices[xyToIndex({ x, y }, length)];
            if (indice === CELL_TETROMINO || indice === CELL_FROZEN) {
                if (isBusyCell(board, addVec2({ x, y }, coord)))
                    return true;
            }
        }
    }
    return false;
}
export function setAction(tetromino, action) {
    const newTetromino = createDeepCopyFromTetromino(tetromino);
    switch (action) {
        case "right": {
            newTetromino.coord = addVec2(newTetromino.coord, { x: 1, y: 0 });
            break;
        }
        case "left": {
            newTetromino.coord = addVec2(newTetromino.coord, { x: -1, y: 0 });
            break;
        }
        case "down": {
            newTetromino.coord = addVec2(newTetromino.coord, { x: 0, y: 1 });
            break;
        }
        case "clockwise": {
            const { indices, rotationState } = newTetromino;
            const length = Math.sqrt(indices.length);
            const currentIndices = Array.from(indices);
            let index = 0;
            for (let x = 0; x < length; ++x) {
                for (let y = length - 1; y >= 0; --y) {
                    indices[index] = currentIndices[xyToIndex({ x, y }, length)];
                    ++index;
                }
            }
            newTetromino.rotationState = newRotationState(rotationState, rotateTo.right);
            break;
        }
        case "counterClockwise": {
            const { indices, rotationState } = newTetromino;
            const length = Math.sqrt(indices.length);
            const currentIndices = Array.from(indices);
            let index = 0;
            for (let x = length - 1; x >= 0; --x) {
                for (let y = 0; y < length; ++y) {
                    newTetromino.indices[index] = currentIndices[xyToIndex({ x, y }, length)];
                    ++index;
                }
            }
            newTetromino.rotationState = newRotationState(rotationState, rotateTo.left);
        }
    }
    return newTetromino;
}
export function setInput() {
    const allowedInputs = new Map();
    allowedInputs.set("ArrowLeft", "left");
    allowedInputs.set("ArrowRight", "right");
    allowedInputs.set("ArrowDown", "down");
    allowedInputs.set("a", "counterClockwise");
    allowedInputs.set("s", "clockwise");
    allowedInputs.set("A", "counterClockwise");
    allowedInputs.set("S", "clockwise");
    const pressedKeys = new Map();
    const canceledKeys = new Set();
    window.addEventListener("keydown", (event) => {
        if (allowedInputs.has(event.key)) {
            if (!canceledKeys.has(event.key))
                pressedKeys.set(event.key, allowedInputs.get(event.key));
        }
    });
    window.addEventListener("keyup", (event) => {
        pressedKeys.delete(event.key);
        if (canceledKeys.has(event.key))
            canceledKeys.delete(event.key);
    });
    return {
        pressedKeys,
        //keydown: (...keys: key[]): void => { keys.forEach(key => { pressedKeys.add(key); }); }, 
        cancelAction: (...keys) => {
            keys.forEach(key => {
                pressedKeys.delete(key);
                canceledKeys.add(key);
            });
        }
    };
}
export function createDeepCopyFromTetromino(tetromino) {
    return {
        name: tetromino.name,
        rotationState: tetromino.rotationState,
        coord: { x: tetromino.coord.x, y: tetromino.coord.y },
        indices: Array.from(tetromino.indices)
    };
}
export function createDeepCopyFromBoard(board) {
    return {
        indices: Array.from(board.indices),
        destroyedRows: Array.from(board.destroyedRows)
    };
}
export function clearTetrominoFromBoard(board) {
    const newBoard = createDeepCopyFromBoard(board);
    newBoard.indices.forEach((_, index) => {
        if (newBoard.indices[index] == CELL_TETROMINO)
            newBoard.indices[index] = CELL_EMPTY;
    });
    return newBoard;
}
function newRotationState(rotationState, rotateTo) {
    return ROTATIONS_STATES[((ROTATIONS_STATES.indexOf(rotationState) + rotateTo) %
        ROTATIONS_STATES_LENGTH + ROTATIONS_STATES_LENGTH) % ROTATIONS_STATES_LENGTH];
}
export function putTetrominoInsideBoard(board, tetromino) {
    const newBoard = createDeepCopyFromBoard(board);
    const { coord, indices } = tetromino;
    const length = Math.sqrt(indices.length);
    for (let y = 0; y < length; ++y) {
        for (let x = 0; x < length; ++x) {
            const cellValue = indices[xyToIndex({ x, y }, length)];
            if (cellValue === CELL_TETROMINO || cellValue === CELL_FROZEN)
                newBoard.indices[xyToIndex(addVec2({ x, y }, coord), BOARD_WIDTH)] = cellValue;
        }
    }
    return newBoard;
}
export function getRandomTetromino() {
    const tetrominos = [];
    tetrominos.push(J_TETROMINO);
    tetrominos.push(L_TETROMINO);
    tetrominos.push(T_TETROMINO);
    tetrominos.push(S_TETROMINO);
    tetrominos.push(Z_TETROMINO);
    tetrominos.push(O_TETROMINO);
    tetrominos.push(I_TETROMINO);
    return createDeepCopyFromTetromino(tetrominos[Math.floor(Math.random() * tetrominos.length)]);
}
export function buildBoardArray() {
    const indices = [];
    for (let y = 0; y < BOARD_HEIGHT; ++y) {
        for (let x = 0; x < BOARD_WIDTH; ++x) {
            let status = CELL_EMPTY;
            if (x == 0 || x == BOARD_WIDTH - 1 || y == BOARD_HEIGHT - 1)
                status = CELL_WALL;
            indices.push(status);
        }
    }
    return { indices: indices, destroyedRows: [] };
}
export function stateScene() {
    //const scenes: sceneName[] =["gameOver", "play", "restart", "start", "startPlay"];
    let currentScene = "start";
    return {
        setScene: function (name) { currentScene = name; },
        getScene: function () { return currentScene; }
    };
}
export function isGameOver(board) {
    for (let x = 1; x <= BOARD_INNER_WIDTH; ++x)
        if (board.indices[xyToIndex({ x, y: 1 }, BOARD_WIDTH)] == CELL_FROZEN)
            return true;
    return false;
}
export function destroyFilledRow(board) {
    const newBoard = createDeepCopyFromBoard(board);
    for (let y = BOARD_INNER_HEIGHT; y >= 0; --y) {
        let rowIsBusy = true;
        for (let x = 1; x <= BOARD_INNER_WIDTH; ++x) {
            if (newBoard.indices[xyToIndex({ x, y }, BOARD_WIDTH)] == CELL_EMPTY) {
                rowIsBusy = false;
                break;
            }
        }
        if (rowIsBusy) {
            for (let x = 1; x < BOARD_INNER_WIDTH; ++x)
                newBoard.indices[xyToIndex({ x, y }, BOARD_WIDTH)] = CELL_EMPTY;
            newBoard.destroyedRows.push(y);
        }
    }
    return newBoard;
}
export function applyGravity(board) {
    const newBoard = createDeepCopyFromBoard(board);
    for (let y = BOARD_INNER_HEIGHT; y > 0; --y) {
        const stepsDown = board.destroyedRows.filter(f => f > y).length;
        if (stepsDown > 0) {
            for (let x = 1; x < BOARD_INNER_WIDTH; ++x) {
                const cellValue = board.indices[xyToIndex({ x, y }, BOARD_WIDTH)];
                const coordCellBelow = addVec2({ x, y }, { x: 0, y: stepsDown });
                newBoard.indices[xyToIndex(coordCellBelow, BOARD_WIDTH)] = cellValue;
            }
        }
    }
    newBoard.destroyedRows = [];
    return newBoard;
}
export function render(board, score /* tetromino:ITetromino, pressedKeys: Map<string, action>*/) {
    board.indices.forEach((_, index) => {
        if (board.indices[index] !== CELL_WALL) {
            const cellElement = document.querySelector(`[data-cell-id="${index}"]`);
            //cellElement.innerHTML =  board.indices[index] == CELL_EMPTY ? "" : board.indices[index].toString();
            cellElement.setAttribute("data-cell-type", board.indices[index].toString());
        }
    });
    document.getElementById('score').innerHTML = score.toString();
    // document.getElementById('coord').innerHTML = `x:${tetromino.coord.x} y:${tetromino.coord.y}`;
    // document.getElementById('rotationState').innerHTML = `${tetromino.rotationState}`;
    // document.getElementById('pressedKeys').innerHTML = `${Array.from(pressedKeys.keys()).reduce((a, b) => a + " " + b, "")}`;
}
export function buildDivBoard(board, containerId) {
    const container = document.getElementById(containerId);
    if (container == null)
        throw new Error("Container not found!");
    for (let y = 0; y < BOARD_HEIGHT; ++y) {
        const row = document.createElement('div');
        for (let x = 0; x < BOARD_WIDTH; ++x) {
            const cell = document.createElement('span');
            const index = xyToIndex({ x, y }, BOARD_WIDTH).toString();
            cell.setAttribute("data-cell-id", index);
            //cell.style.display = "inline-block";
            //cell.style.width = cell.style.height = "1.2rem";
            // cell.innerHTML = board.indices[index] == 0 ? "" : board.indices[index];
            cell.setAttribute("data-cell-type", board.indices[index]);
            row.append(cell);
        }
        container.appendChild(row);
    }
}
function isBusyCell(board, coord) {
    const freeCellsStates = [CELL_EMPTY, CELL_TETROMINO];
    return !freeCellsStates.some(cellState => cellState == board.indices[xyToIndex(coord, BOARD_WIDTH)]);
}
function xyToIndex(coord, maxX) {
    return coord.y * maxX + coord.x;
}
function addVec2(coord1, coord2) {
    return { x: coord1.x + coord2.x, y: coord1.y + coord2.y };
}
function indexToXy(index, maxX) {
    let y = Math.floor(index / maxX);
    let x = index - maxX * y;
    return { x, y };
}
