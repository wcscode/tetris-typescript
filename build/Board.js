import { Cell } from "./Cell.js";
import Row from "./Row.js";
import * as CONST from "./const.js";
export default class Board {
    constructor({ boardId, numColumn = 10, numRow = 17 }) {
        this._activesTetrominos = [];
        this._tick = 0;
        this._oldYPosition = [0, 1, 2, 3];
        const board = document.getElementById(boardId);
        if (board == null)
            throw new Error('Object board not found');
        this._board = board;
        this._numColumn = numColumn;
        this._numRow = numRow;
    }
    /* private _getRandom(): number
     {
         return Math.floor(Math.random() * this._tetrominos.length);
     }*/
    _isTick(deltaTime) {
        if (deltaTime != undefined)
            this._tick += deltaTime;
        if (this._tick > .3) {
            this._tick = 0;
            return true;
        }
        return false;
    }
    /* private _setActiveTetromino() : void
     {
         let activeTetromino: Tetromino | undefined = this._tetrominos.find((Tetromino: Tetromino) => Tetromino.isNext);
 
         if(activeTetromino == null)
         {
             activeTetromino = this._tetrominos[this._getRandom()];
         }
 
         this._tetrominos.forEach( (Tetromino: Tetromino, index: number) => {
             Tetromino.isActive = activeTetromino === Tetromino ? true : false;
         });
        
         this._activesTetrominos = activeTetromino.getTetrominos();
     }*/
    _setTetrominoStatus(yPosition, cellStatus) {
        let index = 0;
        yPosition.forEach((y) => {
            [3, 4, 5, 6].forEach((x) => {
                if (this._activesTetrominos[index] == 1)
                    Cell.setStatus(this._board, x, y, cellStatus);
                index++;
            });
        });
    }
    _willCollide(newYPosition) {
        let index = 0;
        newYPosition.forEach((y) => {
            if (y >= this._numRow) {
                return true;
            }
            [3, 4, 5, 6].forEach((x) => {
                if (this._activesTetrominos[index] == 1)
                    if (Cell.getStatus(this._board, x, y) == 'busy')
                        return true;
                index++;
            });
        });
        return false;
    }
    add(tetromino) {
        this._tetromino = tetromino;
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
        //  this._setActiveTetromino();
    }
    update(deltaTime) {
        if (this._isTick(deltaTime)) {
            this._setTetrominoStatus(this._oldYPosition, CONST.DATA_STATUS_EMPTY);
            let newYPosition = this._oldYPosition.map(m => m + 1);
            if (this._willCollide(newYPosition)) {
                newYPosition = this._oldYPosition;
            }
            this._setTetrominoStatus(newYPosition, CONST.DATA_STATUS_BUSY);
            this._oldYPosition = newYPosition;
        }
    }
    render() {
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
