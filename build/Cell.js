export class Cell extends HTMLElement {
    constructor(index, cellStatus = 'empty') {
        super();
        this.className = "cell";
        this.setAttribute("data-status", cellStatus);
        this.setAttribute("data-id", index.toString());
    }
}
customElements.define("board-cell", Cell);
