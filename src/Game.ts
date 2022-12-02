export default class Game
{    
    static _functionUpdate: Function;
    static _functionRender: Function;

    static load(functionInit: () => void)
    {

    }

    static update(functionUpdate: (deltaTime: number) => void) 
    {
        this._functionUpdate = functionUpdate;
    }
    
    static render(functionRender: () => void) 
    {        
        this._functionRender = functionRender;
    }
       
    static _loop = (timestamp: number): void => {

       const deltaTime: number = 1 // f.getDeltaTime(timestamp);
        
        this._functionUpdate(deltaTime);
        this._functionRender(deltaTime);        
       
        window.requestAnimationFrame(this._loop);    
    }
    
    
   // window.addEventListener('load', loadGame);
}