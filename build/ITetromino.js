import { Cell, CellStatus } from './Cell.js';
import Tetromino from './Tetromino.js';
class ITetromino extends Tetromino {
    constructor() {
        super();
        this._cells.push(new Cell(2, 1, CellStatus.InMovement));
    }
}
export default ITetromino;
