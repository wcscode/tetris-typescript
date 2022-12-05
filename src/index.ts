//import * as f from './functions.js';
import { Game, GameConfig }  from './Game.js';
import Scene from './Scene.js';
import Board from './Board.js';
import { IPiece, OPiece, LPiece, SPiece } from './Piece.js';

const playScene = new Scene('play');
const board = new Board('board');
const iPiece = new IPiece();
const oPiece = new OPiece();
const lPiece = new LPiece();
const sPiece = new SPiece();

playScene.add(board);
playScene.add(iPiece);
playScene.add(oPiece);
playScene.add(lPiece);
playScene.add(sPiece);

function build() 
{
    playScene.build(); 
}

function update(deltaTime: number) 
{
    playScene.update(deltaTime); 
}

function render()
{
    playScene.render();
}

const config: GameConfig = {
    build: build, 
    update: update,
    render: render
} 
 
const game = new Game(config);
game.init();
