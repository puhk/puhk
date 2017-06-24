const {host, join, Renderer, Events} = window['nojball-game'];
const renderer = new Renderer;

const $mount = document.getElementById('mount');
let game;

const render = () => {
    game.initKeyboard($mount);

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
        game = res;
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
        game = res;
        render();
    });
};

const moveToTeam = (player, team) => {
    const event = new Events.ChangeTeam(game.getMe(), {
        clientId: player,
        team
    });

    game.addEvent(event);
};
