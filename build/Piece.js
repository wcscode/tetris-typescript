class Piece {
    constructor(parentBoard) {
        this._pieces = [];
        this._state = "inactive";
        this._parentBoard = parentBoard;
    }
    update(deltaTime) {
        this._parentBoard.setCell(1, 1);
    }
    render() {
    }
}
export class IPiece extends Piece {
    build() {
        this._pieces = [
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
        ];
    }
}
export class OPiece extends Piece {
    build() {
        this._pieces = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ];
    }
}
export class LPiece extends Piece {
    build() {
        this._pieces = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ];
    }
}
export class SPiece extends Piece {
    build() {
        this._pieces = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ];
    }
}
