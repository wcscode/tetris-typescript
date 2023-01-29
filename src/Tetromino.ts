import { Cell } from "./Cell";

abstract class Tetromino{

    protected _cells: Cell[];

    constructor(){
        this._cells = [];
    }

    protected abstract build(): void;

    getCells = ():Cell[] => this._cells;
}

export default Tetromino;