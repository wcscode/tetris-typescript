export default  class InputManager
{
    private static _eventsCodes: string[] = [];
    private static _pressedKeys: string[] =[];

    static allowedKeys(...eventsCodes: string[]): void
    {
        this._eventsCodes.push(...eventsCodes);       
    }

    static listen(): void
    {
        window.addEventListener('keydown',(event: KeyboardEvent) => {

            if(InputManager._eventsCodes.some(eventCode => eventCode === event.code))
               InputManager._pressedKeys.push(event.code); 

            console.table(InputManager._pressedKeys);
        });

        window.addEventListener('keyup',(event) => {

            if(InputManager._eventsCodes.some(eventCode => eventCode == event.code))
                InputManager._pressedKeys = InputManager._pressedKeys.filter(eventCode => eventCode !== event.code); 

            console.table(InputManager._pressedKeys);
        });
    }
}