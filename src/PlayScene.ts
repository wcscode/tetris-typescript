import Board from "./Board.js";
import { OPiece } from "./Piece.js";
import Scene from "./Engine/Scene.js";

export default class PlayScene extends Scene
{
    build(): void {
       
        const board = new Board({ boardId: 'board', numRow: 20, numColumn: 10 });
        const nextBoard = new Board({ boardId: 'next', numRow: 6, numColumn: 6 });

        this._gamesObjects.push(board);
        this._gamesObjects.push(nextBoard);
        this._gamesObjects.push(new OPiece());       
    }
    
}