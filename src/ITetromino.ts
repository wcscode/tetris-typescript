import { Cell, CellStatus } from './Cell.js';
import Tetromino from './Tetromino';

class ITetromino extends Tetromino{
    protected build(): void {
        this._cells.push(new Cell(CellStatus.InMovement))
    }    
}