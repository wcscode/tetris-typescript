import { Cell } from "./Cell.js";
import Row from "./Row.js";
export default class Board {
    constructor({ boardId, numColumn = 10, numRow = 17 }) {
        this._boardId = boardId;
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
                const cellStatus = Board._busy.some((value => value == index)) ? 'fixed' : 'empty';
                const cell = new Cell(index, cellStatus);
                row.appendChild(cell);
            }
            this._board.appendChild(row);
        }
    }
    setCell(x, y) {
        const index = this._numColumn * y + x;
        console.log(index);
        const cell = document.querySelector(`#${this._boardId} [data-id="${index}"]`);
        if (cell == null)
            throw new Error('Cell not found!');
        cell.dataset.status = "busy";
    }
    getCell(x, y) {
        return new Cell(0);
    }
    update(deltaTime) {
    }
    render() {
        for (let y = 0; y < this._numRow; ++y) {
            const row = this._board.children[y];
            for (let x = 0; x < this._numColumn; ++x) {
                const cell = this._board.children[y].children[x];
                // if(cell.getAttribute("data-busy") === "true")
                //    cell.classList.add("busy");
            }
        }
    }
}
Board._busy = [
    0, 1, 2, 7, 8, 9,
    10, 11, 12, 17, 18, 19,
    20, 21, 22, 27, 28, 29,
    30, 31, 32, 37, 38, 39,
];
