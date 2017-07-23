const {host, join, Renderer, Events} = window['nojball-game'];
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

const hostGame = () => {
    host({
        host: 'localhost',
        path: 'p2p',
        player: {
            name: 'noj',
            avatar: -1
        },
        renderer
    }).then(res => {
        controller = res;
        render();
    });
};

const joinGame = () => {
    join({
        host: 'localhost',
        path: 'p2p',
        roomId: 'host',
        player: {
            name: 'noj',
            avatar: -1
        },
        renderer
    }).then(res => {
        controller = res;
        render();
    });
};

const moveToTeam = (player, team) => {
    const event = new Events.ChangeTeam(controller.getMe(), {
        clientId: player,
        team
    });

    controller.addEvent(event);
};
