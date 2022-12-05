import Cell from "./Cell.js";
import Row from "./Row.js";
export default class Board {
    constructor(boardId, numColumn = 10, numRow = 17) {
        const board = document.getElementById(boardId);
        if (board == null)
            throw new Error('Object board not found');
        this._board = board;
        this._numColumn = numColumn;
        this._numRow = numRow;
    }
    build() {
        for (let y = 0; y < this._numRow; ++y) {
            const row = new Row();
            for (let x = 0; x < this._numColumn; ++x) {
                const index = parseInt(y.toString() + x.toString());
                const cell = new Cell(index, false);
                row.appendChild(cell);
            }
            this._board.appendChild(row);
        }
    }
    update(deltaTime) {
    }
    render() {
        for (let y = 0; y < this._numRow; ++y) {
            const row = this._board.children[y];
            for (let x = 0; x < this._numColumn; ++x) {
                const cell = this._board.children[y].children[x];
                if (cell.getAttribute("data-busy") === "true")
                    cell.classList.add("busy");
            }
        }
    }
}
