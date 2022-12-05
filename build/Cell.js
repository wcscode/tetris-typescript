export default class Cell extends HTMLElement {
    constructor(index, isBusy) {
        super();
        const cell = document.createElement('div');
        cell.className = "cell";
        cell.setAttribute("data-busy", "false");
        cell.setAttribute("data-id", index.toString());
    }
}
customElements.define("board-cell", Cell);
