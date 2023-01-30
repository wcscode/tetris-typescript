import { Cell, CellStatus } from "./Cell.js";

abstract class Tetromino{

    protected _cells: Cell[];
    protected _id: number = 0;

    constructor(){

        this._cells = [];
    }

    protected add = ({x, y}:{x:number, y:number}): void => {

        this._cells.push(new Cell({id:this._id, x:x, y:y, status:CellStatus.Tetromino}))
        this._id++;    
   }

    getCells = ():Cell[] => this._cells;
}

export default Tetromino;