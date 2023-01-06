//type PieceState =  "inactive" | "active" | "waiting";

import { cellStatus } from "./Cell";
import ILoop from "./Engine/ILoop";

export abstract class Tetromino implements ILoop
{   
    protected _tetrominos: Array<number> = [];
    // protected  _state: PieceState =  "inactive";   
   // public isNext: boolean = false;
    //public isActive: boolean = false;

    build(): void {
        throw new Error("Method not implemented.");
    }
    update(deltaTime: number): void {
        throw new Error("Method not implemented.");
    }
    render(): void {
        throw new Error("Method not implemented.");
    }
    getPieces() 
    {
        return this._tetrominos;
    }   
    getCellStatus(x: number, y: number) :cellStatus
    {     
     //   console.log(((4 * y) + x) + ' - y ' + y + ' - x ' + x)  
       // console.log(this._tetrominos[(3 * y) + x])   
        return this._tetrominos[(4 * y) + x] === 0 ? 'empty' : 'busy';        
    }   
}

export class ITetromino extends Tetromino
{
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

export class OTetromino extends Tetromino
{
    constructor(){

        super();

        this._tetrominos = [
            0, 0, 0, 0,
            0, 1, 1, 0,
            0, 1, 1, 0,
            0, 0, 0, 0,
        ]
    }    
}

export class LTetromino extends Tetromino
{
    constructor() {

        super();

        this._tetrominos = [
            0, 1, 0, 0,
            0, 1, 0, 0,
            0, 1, 1, 0,
            0, 0, 0, 0,
        ]
    }    
}

export class STetromino extends Tetromino
{
    constructor()  {

        super();

        this._tetrominos = [
            0, 1, 0, 0,
            0, 1, 1, 0,
            0, 0, 1, 0,
            0, 0, 0, 0,
        ]
    }    
}