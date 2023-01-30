class Tetromino {
    constructor() {
        // protected abstract build(): void;
        this.getCells = () => this._cells;
        this._cells = [];
    }
}
export default Tetromino;
