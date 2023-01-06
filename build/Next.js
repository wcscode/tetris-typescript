import { Cell } from "./Cell.js";
import { ITetromino, LTetromino, OTetromino, STetromino } from "./Tetromino.js";
import Row from "./Row.js";
import * as CONST from "./const.js";
export default class Next {
    constructor({ nextId, numColumn = 10, numRow = 17 }) {
        this._tetrominos = [];
        this._nextsTetrominos = [];
        this._nextId = nextId;
        const next = document.getElementById(nextId);
        if (next == null)
            throw new Error('Object next not found');
        this._next = next;
        this._numColumn = numColumn;
        this._numRow = numRow;
        this._tetrominos = [
            new ITetromino(),
            new OTetromino(),
            new LTetromino(),
            new STetromino()
        ];
        this._nextTetromino = this._tetrominos[this._getRandom()];
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
    }
    _getRandom() {
        return Math.floor(Math.random() * this._tetrominos.length);
    }
    getNextTetromino() {
        return this._nextTetromino;
    }
    setNextTetromino() {
        this._nextTetromino = this._tetrominos[this._getRandom()];
    }
    // private _teste:boolean = true;
    update(deltaTime) {
        //  if(this._teste)
        //  {
        [1, 2, 3, 4].forEach((y) => {
            const row = this._next.children[y];
            [1, 2, 3, 4].forEach((x) => {
                if (this._nextTetromino.getCellStatus(x - 1, y - 1) === 'busy')
                    Cell.setStatus(this._next, x, y, 'busy');
            });
        });
        //  this._teste = false
        //  }
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
