import Board from "./Board.js";
import { OPiece } from "./Piece.js";
import Scene from "./Engine/Scene.js";
import * as CONST from './const.js';
export default class PlayScene extends Scene {
    build() {
        const board = new Board({ boardId: 'board', numRow: 20, numColumn: 10 });
        const nextBoard = new Board({ boardId: 'next', numRow: 6, numColumn: 6 });
        this._gamesObjects.push(board);
        this._gamesObjects.push(nextBoard);
        this._gamesObjects.push(new OPiece());
        const countdownContainer = document.getElementById(CONST.COUNTDOWN_CONTAINER_ID);
        if (countdownContainer == null)
            throw new Error('Container not found!');
        countdownContainer.addEventListener('animationend', function () {
            this.style.display = 'none';
        });
        super.build();
    }
}
