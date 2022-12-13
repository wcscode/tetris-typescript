export default class Scene {
    constructor(containerId) {
        this._gamesObjects = [];
        this.containerId = containerId;
        this.isActive = false;
        const container = document.getElementById(containerId);
        if (container == null)
            throw new Error('Container not found!');
        this.container = container;
    }
    // abstract build(): void;
    build() {
        this._gamesObjects.forEach(gameObject => gameObject.build());
    }
    update(deltaTime) {
        this._gamesObjects.forEach(gameObject => gameObject.update(deltaTime));
    }
    render() {
        this._gamesObjects.forEach(gameObjct => gameObjct.render());
    }
}
