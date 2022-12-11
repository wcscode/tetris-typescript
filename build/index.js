import { Game } from './Engine/Game.js';
import SceneManager from './Engine/SceneManager.js';
import StartScene from './StartScene.js';
import PlayScene from './PlayScene.js';
import * as CONST from './const.js';
window.addEventListener('load', () => {
    SceneManager.add(new StartScene(CONST.SCENE_START_CONTAINER_ID));
    SceneManager.add(new PlayScene(CONST.SCENE_PLAY_CONTAINER_ID));
    //SET ACTIVE SCENE
    //SceneManager.setActive(CONST.SCENE_START_CONTAINER_ID); 
    SceneManager.setActive(CONST.SCENE_PLAY_CONTAINER_ID);
    let scene = SceneManager.getActive();
    function build() {
        scene.build();
    }
    function update(deltaTime) {
        scene.update(deltaTime);
    }
    function render() {
        scene.render();
    }
    const config = {
        build: build,
        update: update,
        render: render
    };
    const game = new Game(config);
    game.init();
});
