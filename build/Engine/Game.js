export class Game {
    constructor(config) {
        this._previousTimestamp = 0;
        this._loop = (timestamp) => {
            const deltaTime = this._getDeltaTime(timestamp);
            this._update(deltaTime);
            this._render();
            window.requestAnimationFrame(this._loop);
        };
        this._build = config.build;
        this._update = config.update;
        this._render = config.render;
        this._build();
    }
    _getDeltaTime(timestamp) {
        const deltaTime = (timestamp - this._previousTimestamp) * 0.001;
        this._previousTimestamp = timestamp;
        return deltaTime;
    }
    init() {
        this._loop(0);
    }
}
