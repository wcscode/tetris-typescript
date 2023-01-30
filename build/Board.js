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
        let id = 0;
        for (let y = 0; y < this._height; ++y) {
            for (let x = 0; x < this._width; ++x) {
                let status = CellStatus.Empty;
                if (x == 0 || x == this._width - 1)
                    status = CellStatus.Wall;
                if (y == this._height - 1)
                    status = CellStatus.Wall;
                this._cells.push(new Cell({ id, x, y, status }));
                ++id;
            }
        }
    }
}
export default Board;
