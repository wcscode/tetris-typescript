import ILoop from "./ILoop.js";

export default class Scene implements ILoop
{
    private _gamesObjects: ILoop[] = [];
    public readonly name: string;  

    constructor(name: string)
    {
        this.name = name;       
    }

    build(): void
    {
        this._gamesObjects.forEach(gameObjct => gameObjct.build());
    }

    update(deltaTime: number): void 
    {
        this._gamesObjects.forEach(gameObjct => gameObjct.update(deltaTime));
    }

    render(): void
    {
       this._gamesObjects.forEach(gameObjct => gameObjct.render());
    }

    add(gameObject: ILoop)
    {
        this._gamesObjects.push(gameObject);
    }
}
