enum CellStatus{

    Empty,
    Wall,
    Frozen,
    InMovement

}

class Cell {

    private _status: CellStatus;
    private readonly _x: number;
    private readonly _y: number;

    constructor(x:number, y: number, status: CellStatus){
        this._x = x;
        this._y = y;
        this._status = status;
    }

    getStatus = (): CellStatus => this._status;
    setStatus = (cellStatus: CellStatus): void => { this._status = cellStatus };
    getX = (): number => this._x;
    getY = (): number => this._y;
    getId = (): string => `${this._y}${this._x}`;
}

export {Cell, CellStatus}