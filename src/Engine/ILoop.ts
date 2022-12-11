export default interface ILoop
{
    build(): void;
    update(deltaTime: number): void;
    render(): void;
}