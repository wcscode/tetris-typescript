class Piece {
    constructor() {
        this._pieces = [];
    }
    update(deltaTime) {
    }
    render() {
        for (let i = 0; i < this._pieces.length; ++i) {
        }
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
