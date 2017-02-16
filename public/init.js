const {GameCreator, Renderer} = window['nojball-game'];
const renderer = new Renderer;

const $mount = document.getElementById('mount');
let game;

const render = () => {
    game.initKeyboard($mount);

    renderer.setParent($mount)
        .setWidth($mount.offsetWidth)
        .setHeight($mount.offsetHeight)
        .render();
};

const host = (name, avatar) => {
    game = GameCreator.host(renderer);
    game.setLocalPlayer({ name, avatar });
    render();
};
