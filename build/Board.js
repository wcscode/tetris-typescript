import { Cell, CellStatus } from './Cell.js';
class Board {
    constructor({ width, height }) {
        this.getCell = (x, y) => this._cells[y * this._width + x];
        this.getCells = () => this._cells;
        this.getWidth = () => this._width;
        this.getHeight = () => this._height;
        this._width = width;
        this._height = height;
        this._cells = [];
        for (let y = 0; y < this._height; ++y) {
            for (let x = 0; x < this._width; ++x) {
                let cellStatus = CellStatus.Empty;
                if (x == 0 || x == this._width - 1)
                    cellStatus = CellStatus.Wall;
                if (y == this._height - 1)
                    cellStatus = CellStatus.Wall;
                this._cells.push(new Cell(x, y, cellStatus));
            }
        }
    }
}
export default Board;
