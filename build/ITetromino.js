//import { Cell, CellStatus } from './Cell.js';
import Tetromino from './Tetromino.js';
class ITetromino extends Tetromino {
    constructor() {
        super();
        this.add({ x: 2, y: 1 });
        this.add({ x: 2, y: 2 });
        this.add({ x: 2, y: 3 });
        this.add({ x: 2, y: 4 });
    }
}
export default ITetromino;
