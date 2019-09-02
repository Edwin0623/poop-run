export default class InputHandler {
	constructor(man, game) {
		document.addEventListener("keydown", event => {
			switch (event.keyCode) {
				case 37:
					man.moveLeft();
					break;

				case 39:
					man.moveRight();
					break;

				case 40:
					man.moveStop();
					break;

				case 27:
					game.togglePause();
					break;

				case 32:
					game.start();
					break;

				case 13:
					game.restart();
					break;
			}
		});
	}
}
