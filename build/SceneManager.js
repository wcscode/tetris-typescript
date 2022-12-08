export default class SceneManager {
    static add(scene) {
        SceneManager._scenes.push(scene);
    }
    static setActive(name) {
        SceneManager._name = name;
        SceneManager._scenes.forEach(scene => {
            const sceneContainer = document.getElementById(scene.name);
            if (sceneContainer == null)
                throw new Error('Scene container not found!');
            sceneContainer.style.display = scene.name === name ? 'block' : 'none';
        });
    }
    static getActive() {
        const scene = SceneManager._scenes.find(scene => scene.name == SceneManager._name);
        if (scene == undefined)
            throw new Error('Scene not found');
        return scene;
    }
}
SceneManager._scenes = [];
