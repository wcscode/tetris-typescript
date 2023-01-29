import {Cell} from './Cell';

class Board {

    private _cells: Cell[];
    private _width: number;
    private _height: number;

    constructor(width:number, height:number){

        this._width = width;
        this._height = height;
        this._cells = [];
    }
    getCells = (): Cell[] => this._cells;
    getWidth = (): number => this._width;
    getHeight = (): number => this._height;
}

export default Board;