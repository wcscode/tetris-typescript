export default class InputManager {
    static allowedKeys(...eventsCodes) {
        this._eventsCodes.push(...eventsCodes);
    }
    static listen() {
        window.addEventListener('keydown', (event) => {
            if (InputManager._eventsCodes.some(eventCode => eventCode === event.code))
                InputManager._pressedKeys.push(event.code);
            console.table(InputManager._pressedKeys);
        });
        window.addEventListener('keyup', (event) => {
            if (InputManager._eventsCodes.some(eventCode => eventCode == event.code))
                InputManager._pressedKeys = InputManager._pressedKeys.filter(eventCode => eventCode !== event.code);
            console.table(InputManager._pressedKeys);
        });
    }
}
InputManager._eventsCodes = [];
InputManager._pressedKeys = [];
