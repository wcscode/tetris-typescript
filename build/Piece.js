//type PieceState =  "inactive" | "active" | "waiting";
export class Piece // implements ILoop
 {
    constructor() {
        this._pieces = [];
        // protected  _state: PieceState =  "inactive";   
        this.isNext = false;
        this.isActive = false;
    }
    getPieces() {
        return this._pieces;
    }
}
export class IPiece extends Piece {
    constructor() {
        super();
        this._pieces = [
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
        ];
    }
}
export class OPiece extends Piece {
    constructor() {
        super();
        this._pieces = [
            0, 0, 0, 0,
            0, 1, 1, 0,
            0, 1, 1, 0,
            0, 0, 0, 0,
        ];
    }
}
export class LPiece extends Piece {
    constructor() {
        super();
        this._pieces = [
            0, 1, 0, 0,
            0, 1, 0, 0,
            0, 1, 1, 0,
            0, 0, 0, 0,
        ];
    }
}
export class SPiece extends Piece {
    constructor() {
        super();
        this._pieces = [
            0, 1, 0, 0,
            0, 1, 1, 0,
            0, 0, 1, 0,
            0, 0, 0, 0,
        ];
    }
}
