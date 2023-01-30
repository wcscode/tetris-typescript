import {Cell, CellStatus} from './Cell.js';

class Board {

    private _cells: Cell[];
    private _width: number;
    private _height: number;

    constructor({width, height} : {width:number, height:number}){

        this._width = width;
        this._height = height;
        this._cells = [];
        let id = 0;
        for(let y = 0; y < this._height; ++y){
            for(let x = 0; x < this._width; ++x){

                let status: CellStatus = CellStatus.Empty;

                if(x == 0 || x == this._width - 1) status = CellStatus.Wall;
                if(y == this._height - 1) status = CellStatus.Wall;

                this._cells.push(new Cell({id, x, y, status}));
                ++id
            }
        }
    }

    getCell = (x:number, y: number): Cell => this._cells[ y * this._width + x];
    getCells = (): Cell[] => this._cells;
    getWidth = (): number => this._width;
    getHeight = (): number => this._height;
}

export default Board;