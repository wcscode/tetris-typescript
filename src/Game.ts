export class Game
{ 
    private readonly _build: Function;    
    private readonly _update: ((deltaTime: number) => void);
    private readonly _render: Function;

    constructor(config: GameConfig)
    { 
        this._build = config.build;
        this._update = config.update;
        this._render = config.render;

        this._build();
    } 

    private _loop = (timestamp: number): void => {

       const deltaTime: number = 1 // f.getDeltaTime(timestamp);
        
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