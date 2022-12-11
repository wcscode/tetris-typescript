export class Game {
    constructor(config) {
        this._loop = (timestamp) => {
            const deltaTime = 1; // f.getDeltaTime(timestamp);
            this._update(deltaTime);
            this._render();
            window.requestAnimationFrame(this._loop);
        };
        this._build = config.build;
        this._update = config.update;
        this._render = config.render;
        this._build();
    }
    init() {
        this._loop(0);
    }
}
