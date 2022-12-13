import ILoop from "./Engine/ILoop.js";
import InputManager from "./Engine/InputManager.js";
import  * as CONST  from './const.js';
import SceneManager from "./Engine/SceneManager.js";


export default class StartMenu implements ILoop
{
    build(): void {
        
    }
    update(deltaTime: number): void {

        const pressedKeys = InputManager.getPressedKeys();
        
        if(pressedKeys.some(pressedKey => pressedKey == CONST.EVENT_CODE_KEY_ENTER))
            SceneManager.setActive(CONST.SCENE_PLAY_CONTAINER_ID);        
    }

    render(): void {
        
    }
    

}