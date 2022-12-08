//import * as f from './functions.js';
import { Game, GameConfig }  from './Game.js';
import Scene from './Scene.js';
import Board from './Board.js';
import { IPiece, OPiece, LPiece, SPiece } from './Piece.js';
import SceneManager from './SceneManager.js';
import * as CONST from './const.js';

window.addEventListener('load', () => {
    
    const board = new Board({ boardId: 'board', numRow: 20, numColumn: 10 });
    const nextBoard = new Board({ boardId: 'next', numRow: 6, numColumn: 6 });

    //ADD START SCENE ELEMENTS
    const startScene = new Scene(CONST.SCENE_START_NAME);

    SceneManager.add(startScene);

    //ADD PLAY SCENE ELEMENTS
    const playScene = new Scene(CONST.SCENE_PLAY_NAME);
    
    playScene.add(board);
    playScene.add(nextBoard);
    playScene.add(new IPiece());
    playScene.add(new OPiece());   

    SceneManager.add(playScene);   

    //SET ACTIVE SCENE
    SceneManager.setActive(CONST.SCENE_START_NAME);   

    /*const countdown: HTMLElement | null = document.getElementById('countdown');

    if(countdown == null)
        throw new Error('Start scene container not found!');
    
    countdown.addEventListener('keypress', (e) => {
        
        if(e.key === 'enter')
        {

        }

        
    });*/

    let scene = SceneManager.getActive();

    function build() 
    {
        scene.build(); 
    }

    function update(deltaTime: number) 
    {
        scene.update(deltaTime); 
    }

    function render()
    {
        scene.render();
    }

    const config: GameConfig = {
        build: build, 
        update: update,
        render: render
    } 
    
    const game = new Game(config);
    game.init();
});
