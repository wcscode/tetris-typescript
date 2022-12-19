//type PieceState =  "inactive" | "active" | "waiting";

export abstract class Piece// implements ILoop
{
    protected _pieces: Array<number> = [];
    // protected  _state: PieceState =  "inactive";   
    public isNext: boolean = false;

    getPieces() 
    {
        return this._pieces;
    }   
}

export class IPiece extends Piece
{
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

export class OPiece extends Piece
{
    constructor(){

        super();

        this._pieces = [
            0, 0, 0, 0,
            0, 1, 1, 0,
            0, 1, 1, 0,
            0, 0, 0, 0,
        ]
    }    
}

export class LPiece extends Piece
{
    constructor() {

        super();

        this._pieces = [
            0, 1, 0, 0,
            0, 1, 0, 0,
            0, 1, 1, 0,
            0, 0, 0, 0,
        ]
    }    
}

export class SPiece extends Piece
{
    constructor()  {

        super();

        this._pieces = [
            0, 1, 0, 0,
            0, 1, 1, 0,
            0, 0, 1, 0,
            0, 0, 0, 0,
        ]
    }    
}