enum CellStatus{

    Empty,
    Wall,
    Frozen,
    Tetromino

}

class Cell {

    private _status: CellStatus;
    private readonly _id: number;
    private readonly _x: number;
    private readonly _y: number;  

    constructor({id, x, y, status}:{id:number, x:number, y: number, status: CellStatus}){
        this._id = id;
        this._x = x;
        this._y = y;
        this._status = status;
    }    

    getStatus = (): CellStatus => this._status;
    setStatus = (cellStatus: CellStatus): void => { this._status = cellStatus };
    getX = (): number => this._x;
    getY = (): number => this._y;
    getId = (): string => `${this._id}`;
}

export {Cell, CellStatus}