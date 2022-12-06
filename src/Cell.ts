export type cellStatus = 'empty' | 'busy' | 'fixed';

export class Cell extends HTMLElement{

    constructor(index: number, cellStatus: cellStatus = 'empty')
    {
        super();
 
        this.className = "cell";
        this.setAttribute("data-status", cellStatus);       
        this.setAttribute("data-id", index.toString());
    }
}
customElements.define("board-cell", Cell);