import * as f from './functions.js';
import Game from 'game';
import Board from 'board';


Game.load(() => {
    
});

Game.update((deltaTime: number) => {

});

Game.render(() => {

});


const load = (): void =>  {

    board =  document.getElementById('board') || new HTMLElement();


    loop(0);
}

function update(dt: number) 
{
    const counter: number = f.counter(dt, 10, .6);
}

function render()
{
   
}


