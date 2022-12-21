export class Game
{ 
    private readonly _build: Function;    
    private readonly _update: ((deltaTime: number) => void);
    private readonly _render: Function;
    private _previousTimestamp: number = 0;

    constructor(config: GameConfig)
    { 
        this._build = config.build;
        this._update = config.update;
        this._render = config.render;

        this._build();
    } 

    private _getDeltaTime(timestamp: number): number
    {
        const deltaTime: number = (timestamp - this._previousTimestamp) * 0.001;
        this._previousTimestamp = timestamp;

        return deltaTime;
    }

    private _loop = (timestamp: number): void => {

       const deltaTime: number = this._getDeltaTime(timestamp);
        
       this._update(deltaTime);
       this._render();
        
        window.requestAnimationFrame(this._loop);    
    }
    
    init() 
    {
        this._loop(0);
    }
}

export interface  GameConfig
{   
    build: Function;
    update: (deltaTime: number) => void;
    render: Function;
}