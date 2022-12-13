export default  class InputManager
{
    private static _eventsCodes: string[] = [];
    private static _pressedKeys: string[] = [];

    static allowedKeys(...eventsCodes: string[]): void
    {
        this._eventsCodes.push(...eventsCodes);       
    }

    static listen(): void
    {
        window.addEventListener('keydown',(event: KeyboardEvent) => {

            if(InputManager._eventsCodes.some(eventCode => eventCode === event.code))
            {
                if(!InputManager._pressedKeys.some(pressedKey => pressedKey == event.code))
                    InputManager._pressedKeys.push(event.code);  
            }
        });

        window.addEventListener('keyup',(event) => {
           
            if(InputManager._eventsCodes.some(eventCode => eventCode == event.code))
            {
                if(InputManager._pressedKeys.some(pressedKey => pressedKey == event.code))                  
                    InputManager._pressedKeys = InputManager._pressedKeys.filter(eventCode => eventCode !== event.code); 
            }           
        });
    }

    static getPressedKeys()
    {
       return InputManager._pressedKeys;
    } 
}