import { BOARD_WIDTH, BOARD_HEIGHT, CELL_TETROMINO, CELL_EMPTY, CELL_WALL, I_TETROMINO,
//TETROMINO_LENGTH,
//  L_TETROMINO
 } from "./const.js";
;
function rotate(tetromino, direction) {
    tetromino.indices = tetromino.indices.map(index => index);
    return tetromino;
}
export function mapOfKeyAndMovements() {
    const mapOfMovements = new Map();
    mapOfMovements.set("ArrowLeft", "left");
    mapOfMovements.set("ArrowRight", "right");
    mapOfMovements.set("ArrowDown", "down");
    mapOfMovements.set("a", "rotateLeft");
    mapOfMovements.set("s", "rotateRight");
    return mapOfMovements;
}
export function setInput() {
    const pressedKeys = new Set();
    document.addEventListener("keydown", function (event) {
        pressedKeys.add(event.key);
    });
    document.addEventListener("keyup", function (event) {
        pressedKeys.delete(event.key);
    });
    return pressedKeys;
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
    /* board.indices.forEach( (value, index) => {
         if(value == CELL_TETROMINO)
             board.indices[index] = CELL_EMPTY
     });*/
    return board;
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
        case "rotateLeft": {
            const { indices } = tetromino;
            const length = Math.sqrt(indices.length);
            //const indices = tetromino;
            const currentIndices = Array.from(indices);
            //console.log(currentIndices)          
            for (let y = 0; y < length; ++y) {
                for (let x = 0; x < length; ++x) {
                    // console.log(xyToIndex({x:y, y:x}, length))
                    //  console.log("In " + xyToIndex({x:x, y:y}, length)+ ' = ' + xyToIndex({x:y, y:x}, length))
                    //  console.log( tetromino.indices[xyToIndex({x:x, y:y}, length)] + ' = ' + currentIndices[xyToIndex({x:y, y:x}, length)]
                    //   )
                    //  console.log(currentIndices)       
                    tetromino.indices[xyToIndex({ x: x, y: y }, length)] = currentIndices[xyToIndex({ x: y, y: x }, length)];
                    //tetromino.indices[xyToIndex({x:x, y:y}, length)] = 3; 
                }
            }
            // console.table(tetromino.indices)
        }
    }
    return tetromino;
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
    tetrominos.push(I_TETROMINO);
    //tetrominos.push(L_TETROMINO);
    return tetrominos[Math.floor(Math.random() * tetrominos.length)];
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
export function formatToRenderConsole(board) {
    const newBoards = [];
    for (let y = 0; y < BOARD_HEIGHT; ++y) {
        const xBoards = [];
        for (let x = 0; x < BOARD_WIDTH; ++x) {
            xBoards.push(board.indices[xyToIndex({ x, y }, BOARD_WIDTH)]);
        }
        newBoards[y] = xBoards;
    }
    return newBoards;
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
