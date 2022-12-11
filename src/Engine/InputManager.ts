export default  class InputManager
{
    private static _eventsCodes: string[] = [];

    static allowedKeys(...eventsCodes: string[]): void
    {
        this._eventsCodes.push(...eventsCodes);
    }
}