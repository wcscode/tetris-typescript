var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("Cell", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CellStatus = exports.Cell = void 0;
    var CellStatus;
    (function (CellStatus) {
        CellStatus[CellStatus["Empty"] = 0] = "Empty";
        CellStatus[CellStatus["Wall"] = 1] = "Wall";
        CellStatus[CellStatus["Frozen"] = 2] = "Frozen";
        CellStatus[CellStatus["InMovement"] = 3] = "InMovement";
    })(CellStatus || (CellStatus = {}));
    exports.CellStatus = CellStatus;
    class Cell {
        constructor(status) {
            this.getStatus = () => this._status;
            this._status = status;
        }
    }
    exports.Cell = Cell;
});
define("Board", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Board {
        constructor(width, height) {
            this.getCells = () => this._cells;
            this.getWidth = () => this._width;
            this.getHeight = () => this._height;
            this._width = width;
            this._height = height;
            this._cells = [];
        }
    }
    exports.default = Board;
});
define("Tetromino", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Tetromino {
        constructor() {
            this.getCells = () => this._cells;
            this._cells = [];
        }
    }
    exports.default = Tetromino;
});
define("ITetromino", ["require", "exports", "Cell", "Tetromino"], function (require, exports, Cell_1, Tetromino_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Tetromino_1 = __importDefault(Tetromino_1);
    class ITetromino extends Tetromino_1.default {
        build() {
            this._cells.push(new Cell_1.Cell(Cell_1.CellStatus.InMovement));
        }
    }
});
define("util", ["require", "exports", "Cell"], function (require, exports, Cell_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buildInitialHtmlBoard = void 0;
    function buildInitialHtmlBoard(board) {
        const htmlBoard = document.getElementById('board');
        if (htmlBoard == null)
            throw Error('Board container not found!');
        for (let y = 0; y < board.getHeight(); ++y) {
            const rowDiv = document.createElement('div');
            for (let x = 0; x < board.getWidth(); ++x) {
                const cellSpan = document.createElement('span');
                const cellStatus = Cell_2.CellStatus.Empty;
                cellSpan.setAttribute('data-status', cellStatus.toString());
                cellSpan.innerHTML = cellStatus.toString();
                cellSpan.setAttribute('data-x', x.toString());
                cellSpan.setAttribute('data-y', y.toString());
                rowDiv.appendChild(cellSpan);
            }
            htmlBoard.appendChild(rowDiv);
        }
        return htmlBoard;
    }
    exports.buildInitialHtmlBoard = buildInitialHtmlBoard;
});
define("index", ["require", "exports", "Board", "util"], function (require, exports, Board_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Board_1 = __importDefault(Board_1);
    const board = new Board_1.default(10, 25);
    const htmlBoard = (0, util_1.buildInitialHtmlBoard)(board);
    function update(timestamp) {
    }
    function render() {
        for (let width = 0; width < board.getWidth(); ++width) {
            for (let height = 0; height < board.getHeight(); ++width) {
            }
        }
    }
    function loop(timestamp) {
        update(timestamp);
        render();
    }
    loop(0);
    requestAnimationFrame(loop);
});
