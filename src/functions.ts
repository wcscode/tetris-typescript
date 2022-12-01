export const setCellBusy = (board: any, x: number, y: number, busy: boolean) => { board.children[y].children[x].setAttribute("data-busy", busy) }
export const getCell = (board: any, x: number, y: number) => board.children[y].children[x];
export const countdownScene = (board: any, ct: number) => {
    
    board.children[0];
   // setAttribute("data-busy", true);

}

let accDeltaTime = 0;
let acc = 0;

export const counter = (dt: number, max: number = 10, slow: number = .6) => 
{ 
    accDeltaTime += dt;

    if(Math.trunc(accDeltaTime) > 1 * slow)
    {
        accDeltaTime = 0;
        ++acc;
    }
    
    if(acc > max)
        acc = 0;

    return acc;
}

let tick = 0;
let lastFrame = 0;

export const getDeltaTime = (timestamp: number) => {

    const dt = (timestamp - lastFrame) / 1000;
    lastFrame = timestamp;

    return dt;
}