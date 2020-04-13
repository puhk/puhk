const { host, join, Renderer, Events } = window['puhk'];
const renderer = new Renderer();

const $mount = document.getElementById('mount');
let controller;

const render = () => {
	controller.initKeyboard($mount);

	renderer
		.setParent($mount)
		.setWidth($mount.offsetWidth)
		.setHeight($mount.offsetHeight)
		.center()
		.attach();
};

const hostGame = (name, avatar) => {
	host({
		host: 'localhost',
		port: 9000,
		player: { name, avatar },
		renderer,
	}).then(res => {
		controller = res;
		render();
	});
};

const joinGame = (host, name, avatar) => {
	join({
		host: 'localhost',
		port: 9000,
		roomId: host,
		player: { name, avatar },
		renderer,
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
