export default class Row extends HTMLElement {
    constructor() {
        super();
        this.className = "row";
    }
}
customElements.define("board-row", Row);
