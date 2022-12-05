import ILoop from "./ILoop.js";

abstract class Piece implements ILoop
{
    protected _pieces: Array<number> = [];
   
    abstract build(): void;

    update(deltaTime: number): void
    {

    }

    render(): void
    {
        for(let i: number = 0; i< this._pieces.length; ++i)
        {

        }
    }
}

export class IPiece extends Piece
{
    build(): void {
       this._pieces = [
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
        ]
    }    
}

export class OPiece extends Piece
{
    build(): void {
        this._pieces = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ]
    }    
}

export class LPiece extends Piece
{
    build(): void {
        this._pieces = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ]
    }    
}

export class SPiece extends Piece
{
    build(): void {
        this._pieces = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ]
    }    
}