import * as CONST from "./const.js";

export type cellStatus = 'empty' | 'busy' | 'fixed';

export class Cell extends HTMLElement{

    constructor(index: number, cellStatus: cellStatus = 'empty')
    {
        super();
 
        this.className = "cell";
        this.setAttribute("data-status", cellStatus);       
        this.setAttribute("data-id", index.toString());
    }

    static setStatus(board: HTMLElement, x: number, y: number, cellStatus: cellStatus): void
    {
        const cell: Element = board.children[y].children[x];                
        cell.setAttribute(CONST.DATA_STATUS, cellStatus);
    }  

    static getStatus(board: HTMLElement, x: number, y: number): cellStatus
    {
        const cell: Element = board.children[y].children[x];                
        return cell.getAttribute(CONST.DATA_STATUS) as cellStatus;
    }  

}
customElements.define("board-cell", Cell);