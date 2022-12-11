import ILoop from "./ILoop.js";

export default abstract class Scene implements ILoop
{
    protected _gamesObjects: ILoop[] = [];
    public readonly containerId: string; 
    public isActive: boolean;
    public readonly container: HTMLElement;      

    constructor(containerId: string)
    {
        this.containerId = containerId;
        this.isActive = false;
        const container = document.getElementById(containerId);

        if(container == null)
            throw new Error('Container not found!');

        this.container = container;       
    }   

    abstract build(): void;

    update(deltaTime: number): void
    {
        this._gamesObjects.forEach(gameObject => gameObject.update(deltaTime));
    }

    render(): void
    {
       this._gamesObjects.forEach(gameObjct => gameObjct.render());
    }   
}
