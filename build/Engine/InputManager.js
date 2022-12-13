export default class InputManager {
    static allowedKeys(...eventsCodes) {
        this._eventsCodes.push(...eventsCodes);
    }
    static listen() {
        window.addEventListener('keydown', (event) => {
            if (InputManager._eventsCodes.some(eventCode => eventCode === event.code)) {
                if (!InputManager._pressedKeys.some(pressedKey => pressedKey == event.code))
                    InputManager._pressedKeys.push(event.code);
            }
        });
        window.addEventListener('keyup', (event) => {
            if (InputManager._eventsCodes.some(eventCode => eventCode == event.code)) {
                if (InputManager._pressedKeys.some(pressedKey => pressedKey == event.code))
                    InputManager._pressedKeys = InputManager._pressedKeys.filter(eventCode => eventCode !== event.code);
            }
        });
    }
    static getPressedKeys() {
        return InputManager._pressedKeys;
    }
}
InputManager._eventsCodes = [];
InputManager._pressedKeys = [];
