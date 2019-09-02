import Game from "/src/game";

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let game = new Game();

function gameLoop() {
	ctx.clearRect(0, 0, 350, 520);
	game.update();
	game.draw(ctx);

	requestAnimationFrame(gameLoop);
}

gameLoop();
