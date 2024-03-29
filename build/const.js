export var rotateTo;
(function (rotateTo) {
    rotateTo[rotateTo["left"] = -1] = "left";
    rotateTo[rotateTo["right"] = 1] = "right";
})(rotateTo || (rotateTo = {}));
;
;
export const BOARD_WIDTH = 12;
export const BOARD_HEIGHT = 21;
export const BOARD_INNER_WIDTH = BOARD_WIDTH - 1;
export const BOARD_INNER_HEIGHT = BOARD_HEIGHT - 2;
export const CELL_EMPTY = 0;
export const CELL_WALL = 1;
export const CELL_FROZEN = 2;
export const CELL_TETROMINO = 3;
export const UPDATE_FRAME_IN_MILLISECONDS = 70;
export const ROTATIONS_STATES = ["left", "spawn", "right", "twoRotation"];
export const ROTATIONS_STATES_LENGTH = ROTATIONS_STATES.length;
export const JLTSZ_TETROMINO_WALL_KICK_DATA = [
    { from: "spawn", to: "right", tests: [{ x: 1, y: 0 } /**/, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: -2 }, { x: -1, y: -2 }] },
    { from: "right", to: "spawn", tests: [{ x: -1, y: 0 } /**/, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: 2 }, { x: 1, y: 2 }] },
    { from: "right", to: "twoRotation", tests: [{ x: -1, y: 0 } /**/, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: 2 }, { x: 1, y: 2 }] },
    { from: "twoRotation", to: "right", tests: [{ x: 1, y: 0 } /**/, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: -2 }, { x: -1, y: -2 }] },
    { from: "twoRotation", to: "left", tests: [{ x: -1, y: 0 } /**/, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: -2 }, { x: 1, y: -2 }] },
    { from: "left", to: "twoRotation", tests: [{ x: 1, y: 0 } /**/, { x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: 2 }, { x: -1, y: 2 }] },
    { from: "left", to: "spawn", tests: [{ x: 1, y: 0 } /**/, { x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: 2 }, { x: -1, y: 2 }] },
    { from: "spawn", to: "left", tests: [{ x: -1, y: 0 } /**/, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: -2 }, { x: 1, y: -2 }] },
];
export const I_TETROMINO_WALL_KICK_DATA = [
    { from: "spawn", to: "right", tests: [{ x: -2, y: 0 }, { x: 1, y: 0 }, { x: -2, y: -1 }, { x: 1, y: 2 }] },
    { from: "right", to: "spawn", tests: [{ x: 2, y: 0 }, { x: -1, y: 0 }, { x: 2, y: 1 }, { x: -1, y: -2 }] },
    { from: "right", to: "twoRotation", tests: [{ x: -1, y: 0 }, { x: 2, y: 0 }, { x: -1, y: 2 }, { x: 2, y: -1 }] },
    { from: "twoRotation", to: "right", tests: [{ x: 2, y: 0 } /**/, { x: 1, y: 0 }, { x: -2, y: 0 }, { x: 1, y: -2 }, { x: -2, y: 1 }] },
    { from: "twoRotation", to: "left", tests: [{ x: 2, y: 0 }, { x: -1, y: 0 }, { x: 2, y: 1 }, { x: -1, y: -2 }] },
    { from: "left", to: "twoRotation", tests: [{ x: -2, y: 0 }, { x: 1, y: 0 }, { x: -2, y: -1 }, { x: 1, y: 2 }] },
    { from: "left", to: "spawn", tests: [{ x: 1, y: 0 }, { x: -2, y: 0 }, { x: 1, y: -2 }, { x: -2, y: 1 }] },
    { from: "spawn", to: "left", tests: [{ x: -2, y: 0 } /**/, { x: -1, y: 0 }, { x: 2, y: 0 }, { x: -1, y: 2 }, { x: 2, y: -1 }] },
];
export const J_TETROMINO = {
    name: "J",
    coord: { x: 5, y: 0 },
    rotationState: "spawn",
    indices: [
        0, CELL_TETROMINO, 0,
        0, CELL_TETROMINO, 0,
        CELL_TETROMINO, CELL_TETROMINO, 0,
    ]
};
export const L_TETROMINO = {
    name: "L",
    coord: { x: 5, y: 0 },
    rotationState: "spawn",
    indices: [
        0, CELL_TETROMINO, 0,
        0, CELL_TETROMINO, 0,
        0, CELL_TETROMINO, CELL_TETROMINO,
    ]
};
export const T_TETROMINO = {
    name: "T",
    coord: { x: 5, y: 0 },
    rotationState: "spawn",
    indices: [
        0, 0, 0,
        CELL_TETROMINO, CELL_TETROMINO, CELL_TETROMINO,
        0, CELL_TETROMINO, 0,
    ]
};
export const S_TETROMINO = {
    name: "S",
    coord: { x: 5, y: 0 },
    rotationState: "spawn",
    indices: [
        0, CELL_TETROMINO, CELL_TETROMINO,
        CELL_TETROMINO, CELL_TETROMINO, 0,
        0, 0, 0,
    ]
};
export const Z_TETROMINO = {
    name: "Z",
    coord: { x: 5, y: 0 },
    rotationState: "spawn",
    indices: [
        CELL_TETROMINO, CELL_TETROMINO, 0,
        0, CELL_TETROMINO, CELL_TETROMINO,
        0, 0, 0,
    ]
};
export const O_TETROMINO = {
    name: "O",
    coord: { x: 5, y: 0 },
    rotationState: "spawn",
    indices: [
        CELL_TETROMINO, CELL_TETROMINO,
        CELL_TETROMINO, CELL_TETROMINO,
    ]
};
export const I_TETROMINO = {
    name: "I",
    coord: { x: 5, y: 0 },
    rotationState: "spawn",
    indices: [
        0, CELL_TETROMINO, 0, 0,
        0, CELL_TETROMINO, 0, 0,
        0, CELL_TETROMINO, 0, 0,
        0, CELL_TETROMINO, 0, 0
    ]
};
