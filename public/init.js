const { host, join, Renderer, Events } = window['nojball-game'];
const renderer = new Renderer;

const $mount = document.getElementById('mount');
let controller;

const render = () => {
    controller.initKeyboard($mount);

    renderer.setParent($mount)
        .setWidth($mount.offsetWidth)
        .setHeight($mount.offsetHeight)
        .center()
        .attach();
};

const hostGame = (name, avatar) => {
    host({
        host: 'localhost',
        path: 'p2p',
        player: { name, avatar },
        renderer
    }).then(res => {
        controller = res;
        render();
    });
};

const joinGame = (name, avatar) => {
    join({
        host: 'localhost',
        path: 'p2p',
        roomId: 'host',
        player: { name, avatar },
        renderer
    }).then(res => {
        controller = res;
        render();
    });
};

const moveToTeam = (clientId, team) => {
    const frame = controller.getCurrentState().frame;
    const event = new Events.ChangeTeam(frame, controller.getMe(), { clientId, team });
    controller.addEvent(event);
};
