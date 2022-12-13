import Scene from "./Engine/Scene.js";
import StartMenu from "./StartMenu.js";
export default class StartScene extends Scene {
    build() {
        const startMenu = new StartMenu();
        this._gamesObjects.push(startMenu);
    }
}
