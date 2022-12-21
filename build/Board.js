import { Cell } from "./Cell.js";
import Row from "./Row.js";
import * as CONST from "./const.js";
export default class Board {
    constructor({ boardId, numColumn = 10, numRow = 17 }) {
        //  this._boardId = boardId;
        this._activesPieces = [];
        this._pieces = [];
        this._tick = 0;
        const board = document.getElementById(boardId);
        if (board == null)
            throw new Error('Object board not found');
        this._board = board;
        this._numColumn = numColumn;
        this._numRow = numRow;
    }
    _getRandom() {
        return Math.floor(Math.random() * this._pieces.length);
    }
    _isTick(deltaTime) {
        if (deltaTime != undefined)
            this._tick += deltaTime;
        if (this._tick > 2) {
            this._tick = 0;
            return true;
        }
        return false;
    }
    setActivePiece() {
        let activePiece = this._pieces.find((piece) => piece.isNext);
        if (activePiece == null) {
            activePiece = this._pieces[this._getRandom()];
        }
        this._pieces.forEach((piece, index) => {
            piece.isActive = activePiece === piece ? true : false;
        });
        this._activesPieces = activePiece.getPieces();
    }
    add(pieces) {
        this._pieces = pieces;
    }
    build() {
        let index = 0;
        for (let y = 0; y < this._numRow; ++y) {
            const row = new Row();
            for (let x = 0; x < this._numColumn; ++x) {
                const cellStatus = Board._busy.some((value => value == index)) ? 'fixed' : 'empty';
                const cell = new Cell(index, cellStatus);
                row.appendChild(cell);
                index++;
            }
            this._board.appendChild(row);
        }
        this.setActivePiece();
    }
    update(deltaTime) {
        if (this._isTick(deltaTime)) {
            let index = 0;
            [0, 1, 2, 3].forEach((y) => {
                const row = this._board.children[y];
                [3, 4, 5, 6].forEach((x) => {
                    if (this._activesPieces[index] == 1) {
                        const cell = this._board.children[y].children[x];
                        cell.setAttribute(CONST.DATA_STATUS, CONST.DATA_STATUS_BUSY);
                    }
                    index++;
                });
            });
        }
    }
    render() {
        //  console.log('tick render')
        if (this._isTick()) {
            for (let y = 0; y < this._numRow; ++y) {
                const row = this._board.children[y];
                for (let x = 0; x < this._numColumn; ++x) {
                    const cell = this._board.children[y].children[x];
                    if (cell.getAttribute(CONST.DATA_STATUS) === "true")
                        cell.classList.add("busy");
                }
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
