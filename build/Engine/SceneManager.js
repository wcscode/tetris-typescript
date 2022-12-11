export default class SceneManager {
    static add(scene) {
        SceneManager._scenes.push(scene);
    }
    static setActive(containerId) {
        if (!SceneManager._scenes.some(scene => scene.containerId === containerId))
            throw new Error('Scene not found!');
        SceneManager._scenes.forEach(scene => {
            if (scene.containerId === containerId) {
                scene.container.style.display = 'flex';
                scene.isActive = true;
            }
            else {
                scene.container.style.display = 'none';
                scene.isActive = false;
            }
        });
    }
    static getActive() {
        const scene = SceneManager._scenes.find(scene => scene.isActive);
        if (scene == undefined)
            throw new Error('Active scene not found!');
        return scene;
    }
}
SceneManager._scenes = [];
