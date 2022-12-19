import Board from "./Board.js";
import ILoop from "./Engine/ILoop.js";

type PieceState =  "inactive" | "active" | "waiting";

abstract class Piece implements ILoop
{
    protected _pieces: Array<number> = [];
    protected  _state: PieceState =  "inactive"; 
    protected  _parentBoard: Board; 

    constructor(parentBoard: Board)
    {
        this._parentBoard = parentBoard;
    }

    abstract build(): void;

    update(deltaTime: number): void
    {
        this._parentBoard.setCell(1, 1);   
    }

    render(): void
    {
       
      
          
       
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