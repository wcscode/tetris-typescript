import * as CONST from "./const.js";
export class Cell extends HTMLElement {
    constructor(index, cellStatus = 'empty') {
        super();
        this.className = "cell";
        this.setAttribute("data-status", cellStatus);
        this.setAttribute("data-id", index.toString());
    }
    static setStatus(board, x, y, cellStatus) {
        const cell = board.children[y].children[x];
        cell.setAttribute(CONST.DATA_STATUS, cellStatus);
    }
    static getStatus(board, x, y) {
        const cell = board.children[y].children[x];
        return cell.getAttribute(CONST.DATA_STATUS);
    }
}
customElements.define("board-cell", Cell);
