import Scene from "./Scene.js";

export default class SceneManager
{
    private static _scenes: Scene[] = [];   
    private static _containerId: string;

    static add(scene: Scene): void
    {
        SceneManager._scenes.push(scene);
    }

    static setActive(containerId: string):void 
    {    
        if(!SceneManager._scenes.some(scene => scene.containerId === containerId))
            throw new Error('Scene not found!');

        SceneManager._scenes.forEach(scene  => {

            if(scene.containerId === containerId)
            {
                scene.container.style.display = 'flex';
                scene.isActive = true;                
            }
            else
            {
                scene.container.style.display = 'none';
                scene.isActive = false;         
            }

        });        
    }

    static getActive(): Scene
    {
        const scene = SceneManager._scenes.find(scene => scene.isActive);

        if(scene == undefined) 
            throw new Error('Active scene not found!');

       return scene;
    }
}