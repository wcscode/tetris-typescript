import { Cell, CellStatus } from "./Cell.js";
class Tetromino {
    constructor() {
        this._id = 0;
        this.add = ({ x, y }) => {
            this._cells.push(new Cell({ id: this._id, x: x, y: y, status: CellStatus.Tetromino }));
            this._id++;
        };
        this.getCells = () => this._cells;
        this._cells = [];
    }
}
export default Tetromino;
