//type PieceState =  "inactive" | "active" | "waiting";
export class Tetromino {
    constructor() {
        this._tetrominos = [];
    }
    // protected  _state: PieceState =  "inactive";   
    // public isNext: boolean = false;
    //public isActive: boolean = false;
    build() {
        throw new Error("Method not implemented.");
    }
    update(deltaTime) {
        throw new Error("Method not implemented.");
    }
    render() {
        throw new Error("Method not implemented.");
    }
    getPieces() {
        return this._tetrominos;
    }
    getCellStatus(x, y) {
        return this._tetrominos[(3 * y) + x] == 0 ? 'empty' : 'busy';
    }
}
export class ITetromino extends Tetromino {
    constructor() {
        super();
        this._tetrominos = [
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
        ];
    }
}
export class OTetromino extends Tetromino {
    constructor() {
        super();
        this._tetrominos = [
            0, 0, 0, 0,
            0, 1, 1, 0,
            0, 1, 1, 0,
            0, 0, 0, 0,
        ];
    }
}
export class LTetromino extends Tetromino {
    constructor() {
        super();
        this._tetrominos = [
            0, 1, 0, 0,
            0, 1, 0, 0,
            0, 1, 1, 0,
            0, 0, 0, 0,
        ];
    }
}
export class STetromino extends Tetromino {
    constructor() {
        super();
        this._tetrominos = [
            0, 1, 0, 0,
            0, 1, 1, 0,
            0, 0, 1, 0,
            0, 0, 0, 0,
        ];
    }
}
