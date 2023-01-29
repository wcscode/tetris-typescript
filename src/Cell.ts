enum CellStatus{

    Empty,
    Wall,
    Frozen,
    InMovement

}

class Cell {

    private _status: CellStatus;

    constructor(status: CellStatus){
        this._status = status;
    }

    getStatus = (): CellStatus => this._status;
}

export {Cell, CellStatus}