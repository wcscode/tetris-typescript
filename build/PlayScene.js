import Board from "./Board.js";
import { IPiece, LPiece, OPiece, SPiece } from "./Piece.js";
import Scene from "./Engine/Scene.js";
import * as CONST from './const.js';
import Next from "./Next.js";
export default class PlayScene extends Scene {
    build() {
        const board = new Board({ boardId: 'board', numRow: 20, numColumn: 10 });
        const next = new Next({ nextId: 'next-board', numRow: 6, numColumn: 6 });
        const pieces = [
            new IPiece(),
            new OPiece(),
            new LPiece(),
            new SPiece()
        ];
        board.add(pieces);
        next.add(pieces);
        this._gamesObjects.push(board);
        this._gamesObjects.push(next);
        //this._gamesObjects.push(iPiece);
        //   this._gamesObjects.push()
        const countdownContainer = document.getElementById(CONST.COUNTDOWN_CONTAINER_ID);
        if (countdownContainer == null)
            throw new Error('Container not found!');
        countdownContainer.style.display = 'none';
        /*countdownContainer.addEventListener('animationend', function() {
          
            this.style.display = 'none';
        });*/
        super.build();
    }
}
