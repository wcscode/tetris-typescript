export default class Board 
{
    readonly board: HTMLElement;   
    readonly tileX: number;
    readonly tileY: number;

    constructor(board: HTMLElement, tileX: number = 10, tileY: number = 20) 
    {
        this.board = board;
        this.tileX = tileX;
        this.tileY = tileY;        
    }

    update(deltaTime: number): void 
    {

    }

    render(): void 
    {
        for(let y: number = 0; y < this.tileY; ++y)
        {
            const row: Element = this.board.children[y];

            for(let x = 0; x < this.tileX; ++x)
            {
                const cell: Element = this.board.children[y].children[x];                

                if(cell.getAttribute("data-busy") === "true")
                    cell.classList.add("busy");
            }
        }
    }
}