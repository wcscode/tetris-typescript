import Scene from "./Scene";

export default class SceneManager
{
    private static _scenes: Scene[] = [];
    private static _name: string;

    static add(scene: Scene): void
    {
        SceneManager._scenes.push(scene);
    }

    static setActive(name: string):void 
    {
        SceneManager._name = name;

        SceneManager._scenes.forEach(scene  => {

            const sceneContainer: HTMLElement | null = document.getElementById(scene.name);

            if(sceneContainer == null)
                throw new Error('Scene container not found!');

            sceneContainer.style.display = scene.name === name ? 'block' : 'none';
        });
        
    }

    static getActive(): Scene
    {
        const scene = SceneManager._scenes.find(scene => scene.name == SceneManager._name);

        if(scene == undefined) 
            throw new Error('Scene not found');

        return scene;
    }
}