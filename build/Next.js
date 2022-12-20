import { Cell } from "./Cell.js";
import Row from "./Row.js";
import * as CONST from "./const.js";
export default class Next {
    constructor({ nextId, numColumn = 10, numRow = 17 }) {
        this._pieces = [];
        this._nextsPieces = [];
        this._nextId = nextId;
        const next = document.getElementById(nextId);
        if (next == null)
            throw new Error('Object next not found');
        this._next = next;
        this._numColumn = numColumn;
        this._numRow = numRow;
    }
    build() {
        let index = 0;
        for (let y = 0; y < this._numRow; ++y) {
            const row = new Row();
            for (let x = 0; x < this._numColumn; ++x) {
                const cell = new Cell(index, "empty");
                row.appendChild(cell);
                index++;
            }
            this._next.appendChild(row);
        }
        this.setNextPiece();
    }
    _getRandom() {
        return Math.floor(Math.random() * this._pieces.length);
    }
    setNextPiece() {
        const rnd = this._getRandom();
        this._pieces.forEach((piece, index) => {
            piece.isNext = index == rnd ? true : false;
        });
        this._nextsPieces = this._pieces[rnd].getPieces();
    }
    add(pieces) {
        this._pieces = pieces;
    }
    update(deltaTime) {
        let index = 0;
        [1, 2, 3, 4].forEach((y) => {
            const row = this._next.children[y];
            [1, 2, 3, 4].forEach((x) => {
                if (this._nextsPieces[index] == 1) {
                    const cell = this._next.children[y].children[x];
                    cell.setAttribute(CONST.DATA_STATUS, CONST.DATA_STATUS_BUSY);
                }
                index++;
            });
        });
    }
    render() {
        for (let y = 0; y < this._numRow; ++y) {
            const row = this._next.children[y];
            for (let x = 0; x < this._numColumn; ++x) {
                const cell = this._next.children[y].children[x];
                if (cell.getAttribute(CONST.DATA_STATUS) === CONST.DATA_STATUS_BUSY)
                    cell.classList.add("busy");
            }
        }
    }
}
