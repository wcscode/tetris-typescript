var CellStatus;
(function (CellStatus) {
    CellStatus[CellStatus["Empty"] = 0] = "Empty";
    CellStatus[CellStatus["Wall"] = 1] = "Wall";
    CellStatus[CellStatus["Frozen"] = 2] = "Frozen";
    CellStatus[CellStatus["InMovement"] = 3] = "InMovement";
})(CellStatus || (CellStatus = {}));
class Cell {
    constructor(x, y, status) {
        this.getStatus = () => this._status;
        this.setStatus = (cellStatus) => { this._status = cellStatus; };
        this.getX = () => this._x;
        this.getY = () => this._y;
        this.getId = () => `${this._y}${this._x}`;
        this._x = x;
        this._y = y;
        this._status = status;
    }
}
export { Cell, CellStatus };
