export default class Scene {
    constructor(name) {
        this._gamesObjects = [];
        this.name = name;
    }
    build() {
        this._gamesObjects.forEach(gameObjct => gameObjct.build());
    }
    update(deltaTime) {
        this._gamesObjects.forEach(gameObjct => gameObjct.update(deltaTime));
    }
    render() {
        this._gamesObjects.forEach(gameObjct => gameObjct.render());
    }
    add(gameObject) {
        this._gamesObjects.push(gameObject);
    }
}
