import { Game, GameConfig }  from './Engine/Game.js';
import SceneManager from './Engine/SceneManager.js';
import StartScene from './StartScene.js';
import PlayScene from './PlayScene.js';
import  * as CONST  from './const.js';
import InputManager from './Engine/InputManager.js';

window.addEventListener('load', () => {

    InputManager.allowedKeys(
        CONST.EVENT_CODE_KEY_ARROW_DOWN, 
        CONST.EVENT_CODE_KEY_ARROW_LEFT,
        CONST.EVENT_CODE_KEY_ARROW_RIGHT,
        CONST.EVENT_CODE_KEY_ARROW_UP,
        CONST.EVENT_CODE_KEY_W,
        CONST.EVENT_CODE_KEY_ENTER
    );

    InputManager.listen();    

    SceneManager.add(new StartScene(CONST.SCENE_START_CONTAINER_ID));    
    SceneManager.add(new PlayScene(CONST.SCENE_PLAY_CONTAINER_ID));   

    //SET ACTIVE SCENE
   // SceneManager.setActive(CONST.SCENE_START_CONTAINER_ID); 
    SceneManager.setActive(CONST.SCENE_PLAY_CONTAINER_ID);
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
