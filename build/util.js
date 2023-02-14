import { BOARD_WIDTH, BOARD_HEIGHT, CELL_TETROMINO, CELL_EMPTY, CELL_WALL, CELL_FROZEN, L_TETROMINO, rotateTo, ROTATIONS_STATES_LENGTH, ROTATIONS_STATES, I_TETROMINO_WALL_KICK_DATA, JLTSZ_TETROMINO_WALL_KICK_DATA, } from "./const.js";
export function freezeTetromino(tetromino) {
    const freezedTetromino = createDeepCopyFromTetromino(tetromino);
    for (let i = 0; i < freezedTetromino.indices.length; i++) {
        if (freezedTetromino.indices[i] === CELL_TETROMINO)
            freezedTetromino.indices[i] = CELL_FROZEN;
    }
    return freezedTetromino;
}
export function isTickFall(tick) {
    tick.count++;
    return tick.count % tick.rate === 0;
}
export function tryKick(board, tetromino, action) {
    if (action != "clockwise" && action != "counterClockwise")
        return tetromino;
    const wallsKicksDatas = tetromino.name == "I" ?
        I_TETROMINO_WALL_KICK_DATA :
        JLTSZ_TETROMINO_WALL_KICK_DATA;
    const wallKickData = wallsKicksDatas.find(f => f.from == tetromino.rotationState &&
        f.to == newRotationState(tetromino.rotationState, action == "clockwise" ?
            rotateTo.right : rotateTo.left));
    for (let i = 0; i < wallKickData.tests.length; ++i) {
        const tempTetromino = createDeepCopyFromTetromino(tetromino);
        tempTetromino.coord = addVec2(tempTetromino.coord, wallKickData.tests[i]);
        if (!willCollide(board, tempTetromino, action)) {
            tetromino = tempTetromino;
            break;
        }
    }
    ;
    return tetromino;
}
export function willCollide(board, tempTetromino, action) {
    // console.log('willCollide')  
    const { indices, coord } = setAction(tempTetromino, action);
    const length = Math.sqrt(indices.length);
    for (let y = 0; y < length; ++y) {
        for (let x = 0; x < length; ++x) {
            if (indices[xyToIndex({ x, y }, length)] === CELL_TETROMINO) {
                if (isBusyCell(board, addVec2({ x, y }, coord)))
                    return true;
            }
        }
    }
    return false;
}
export function setAction(tetromino, action) {
    switch (action) {
        case "right": {
            tetromino.coord = addVec2(tetromino.coord, { x: 1, y: 0 });
            break;
        }
        case "left": {
            tetromino.coord = addVec2(tetromino.coord, { x: -1, y: 0 });
            break;
        }
        case "down": {
            tetromino.coord = addVec2(tetromino.coord, { x: 0, y: 1 });
            break;
        }
        case "clockwise": {
            const { indices, rotationState } = tetromino;
            const length = Math.sqrt(indices.length);
            const currentIndices = Array.from(indices);
            let index = 0;
            for (let x = 0; x < length; ++x) {
                for (let y = length - 1; y >= 0; --y) {
                    indices[index] = currentIndices[xyToIndex({ x, y }, length)];
                    ++index;
                }
            }
            tetromino.rotationState = newRotationState(rotationState, rotateTo.right);
            break;
        }
        case "counterClockwise": {
            const { indices, rotationState } = tetromino;
            const length = Math.sqrt(indices.length);
            const currentIndices = Array.from(indices);
            let index = 0;
            for (let x = length - 1; x >= 0; --x) {
                for (let y = 0; y < length; ++y) {
                    tetromino.indices[index] = currentIndices[xyToIndex({ x, y }, length)];
                    ++index;
                }
            }
            tetromino.rotationState = newRotationState(rotationState, rotateTo.left);
        }
    }
    return tetromino;
}
export function setInput() {
    const inputs = new Map();
    inputs.set("ArrowLeft", "left");
    inputs.set("ArrowRight", "right");
    inputs.set("ArrowDown", "down");
    inputs.set("a", "counterClockwise");
    inputs.set("s", "clockwise");
    const pressedKeys = new Set();
    window.addEventListener("keydown", (event) => { pressedKeys.add(event.key); });
    window.addEventListener("keyup", (event) => { pressedKeys.delete(event.key); });
    return { pressedKeys, inputs };
}
export function forceUserClickButton(pressedKeys, ...keys) {
    keys.forEach(key => {
        pressedKeys.delete(key);
    });
}
export function createDeepCopyFromTetromino(tetromino) {
    return {
        name: tetromino.name,
        rotationState: tetromino.rotationState,
        coord: { x: tetromino.coord.x, y: tetromino.coord.y },
        indices: Array.from(tetromino.indices)
    };
}
export function clearTetrominosFromBoard(board, tetromino) {
    const { coord, indices } = tetromino;
    const length = Math.sqrt(indices.length);
    for (let y = 0; y < length; ++y) {
        for (let x = 0; x < length; ++x) {
            if (indices[xyToIndex({ x, y }, length)] === CELL_TETROMINO) {
                board.indices[xyToIndex(addVec2({ x, y }, coord), BOARD_WIDTH)] = CELL_EMPTY;
            }
        }
    }
    return board;
}
function newRotationState(rotationState, rotateTo) {
    return ROTATIONS_STATES[((ROTATIONS_STATES.indexOf(rotationState) + rotateTo) %
        ROTATIONS_STATES_LENGTH + ROTATIONS_STATES_LENGTH) % ROTATIONS_STATES_LENGTH];
}
export function putTetrominoInsideBoard(board, tetromino) {
    const { coord, indices } = tetromino;
    const length = Math.sqrt(indices.length);
    for (let y = 0; y < length; ++y) {
        for (let x = 0; x < length; ++x) {
            if (indices[xyToIndex({ x, y }, length)] === CELL_TETROMINO) {
                board.indices[xyToIndex(addVec2({ x, y }, coord), BOARD_WIDTH)] = CELL_TETROMINO;
            }
        }
    }
    return board;
}
export function getRandomTetromino() {
    const tetrominos = [];
    tetrominos.push(L_TETROMINO);
    //tetrominos.push(L_TETROMINO);
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
    return { indices: indices };
}
export function render(board, preservedTetromino, tetromino) {
    const length = Math.sqrt(tetromino.indices.length);
    for (let y = 0; y < length; ++y) {
        for (let x = 0; x < length; ++x) {
            const cellValue = tetromino.indices[xyToIndex({ x, y }, length)];
            if (cellValue === CELL_TETROMINO) {
                const index = xyToIndex(addVec2({ x, y }, preservedTetromino.coord), BOARD_WIDTH);
                const cellElement = document.querySelector(`[data-cell-id="${index}"]`);
                cellElement.innerHTML = "";
            }
        }
    }
    for (let y = 0; y < length; ++y) {
        for (let x = 0; x < length; ++x) {
            const cellValue = tetromino.indices[xyToIndex({ x, y }, length)];
            if (cellValue === CELL_TETROMINO || cellValue === CELL_FROZEN) {
                const index = xyToIndex(addVec2({ x, y }, tetromino.coord), BOARD_WIDTH);
                const cellElement = document.querySelector(`[data-cell-id="${index}"]`);
                cellElement.innerHTML = cellValue.toString();
            }
        }
    }
    document.getElementById('coord').innerHTML = `x:${tetromino.coord.x} y:${tetromino.coord.y}`;
    document.getElementById('rotationState').innerHTML = `${tetromino.rotationState}`;
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
            cell.style.display = "inline-block";
            cell.style.width = cell.style.height = "1.2rem";
            cell.innerHTML = board.indices[index] == 0 ? "" : board.indices[index];
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
