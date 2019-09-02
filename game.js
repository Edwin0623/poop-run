import Man from "/src/man";
import { DDong } from "/src/ddong";
import { Candy } from "/src/candy";
import InputHandler from "/src/input";
// 이 이미지들은 <게임 잘하는 방법> 설명용으로 쓰임
let ddong1 = document.getElementById("ddong");
let candy1 = document.getElementById("candy");
let man1 = document.getElementById("man");
var i;
// 게임 상태
const GAMESTATE = {
	PAUSE: 0,
	RUNNING: 1,
	MENU: 2,
	GAMEOVER: 3
};

const DDONG_DAMAGE = 5;
const HEAL_AMOUNT = 1;

export default class Game {
	constructor() {
		this.ddongs = [];
		this.candies = [];
		this.gamestate = GAMESTATE.MENU;
		this.man = new Man(this);
		new InputHandler(this.man, this);
	}

	start() {
		if (this.gamestate !== GAMESTATE.MENU) return;
		this.gamestate = GAMESTATE.RUNNING;
		this.audio1 = document.getElementById("audio1");
		this.audio2 = document.getElementById("audio2");
		this.audio3 = document.getElementById("audio3");
		this.audio1.currentTime = 0;
		this.audio1.play();
		this.score = 0;
		this.gameClock = 0;
		this.hp = 100;

		var ddongs = this.ddongs;
		var candies = this.candies;

		// 처음에 똥 10개를 배열에 넣고, 정해진 타임마다 똥을 1개씩 배열에 넣는다.
		for (i = 0; i < 10; i++) {
			var ddong = new DDong(Math.random() * 350, 0, 0, 2, 20);
			ddongs.push(ddong);
		}
		
		// 처음에 캔디 0개를 배열에 넣고, 정해진 타임마다 캔디를 1개씩 배열에 넣는다.
		for (i = 0; i < 0; i++) {
			var candy = new Candy(
				350 * Math.random(),
				0,
				6 * Math.random() - 3,
				3,
				18
			);
			candies.push(candy);
		}
		
	}

	update() {
		if (this.gamestate !== GAMESTATE.RUNNING) return;

		if (this.gameClock % 15 === 0) {
			var ddong = new DDong(Math.random() * 350, 0, 0, 2, 20);
			this.ddongs.push(ddong);
		}

		if (this.gameClock % 150 === 0) {
			var candy = new Candy(
				350 * Math.random(),
				0,
				6 * Math.random() - 3,
				3,
				18
			);
			this.candies.push(candy);
		}

		if (this.gameClock / 150 >= 1) {
			this.gameClock = 0;
		}

		if (this.gamestate === GAMESTATE.RUNNING) {
			this.man.update();
			for (i = 0; i < this.ddongs.length; i++) {
				this.ddongs[i].update();
			}
			for (i = 0; i < this.candies.length; i++) {
				this.candies[i].update();
			}
			this.score++;
		}

		var ddongCollisionIndex = this.detectCollision();
		if (ddongCollisionIndex > -1) {
			this.hp -= DDONG_DAMAGE;
			this.audio2.play();
			this.ddongs.splice(ddongCollisionIndex, 1);
		}

		var candyCollisionIndex = this.detectCandy();
		if (candyCollisionIndex > -1) {
			if (this.hp + HEAL_AMOUNT < 100 ) {
				this.audio3.play();
				this.hp += HEAL_AMOUNT;
			}
			else {
				this.hp = 100;
			}

			this.candies.splice(candyCollisionIndex, 1);
		}

		if (this.hp <= 0) {
			this.gamestate = GAMESTATE.GAMEOVER;
		}

		this.gameClock++;
	}
	draw(ctx) {
		if (this.gamestate === GAMESTATE.RUNNING) {
			this.man.draw(ctx);
			for (i = 0; i < this.ddongs.length; i++) {
				this.ddongs[i].draw(ctx);
			}
			for (i = 0; i < this.candies.length; i++) {
				this.candies[i].draw(ctx);
			}
			// 점수
			ctx.font = "15px Comic Sans MS";
			ctx.fillStyle = "#45454D";
			ctx.fillText("Score: " + this.score, 310, 17);
		}
		if (this.gamestate === GAMESTATE.PAUSE) {
			ctx.rect(0, 0, 350, 520);
			ctx.fillStyle = "rgba(0,0,0,0.6)";
			ctx.fill();

			ctx.font = "30px Comic Sans MS";
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.fillText("PAUSED", 350 / 2, 520 / 2);
		}
		if (this.gamestate === GAMESTATE.MENU) {
			ctx.rect(0, 0, 350, 520);
			ctx.fillStyle = "rgba(0,0,0,0.6)";
			ctx.fill();

			ctx.font = "31px Arial";
			ctx.fillStyle = "#ffffea";
			ctx.textAlign = "center";
			ctx.strokeStyle = "white";
			ctx.rect(40, 50, 270, 230);
			ctx.stroke();
			ctx.rect(100, 110, 150, 95);
			ctx.stroke();
			ctx.fillText("<게임 잘하는 방법>", 350 / 2, 90);
			ctx.font = "15px Arial";
			ctx.fillStyle = "white";
			ctx.drawImage(man1, 162, 120, 20, 30);
			ctx.fillText("←Left       Right→", 350 / 2, 140);
			ctx.fillText("↓Stop", 350 / 2, 165);
			ctx.drawImage(ddong1, 75, 210, 35, 35);
			ctx.drawImage(candy1, 83, 245, 25, 25);
			ctx.fillText("    : 피한다. 닿으면 HP깎임", 180, 235);
			ctx.fillText(": 먹는다. HP 회복됨.", 178, 264);
			ctx.font = "15px Arial";
			ctx.fillText("* Pause는 'esc'", 350 / 2, 190);
			ctx.font = "20px Comic Sans MS";
			ctx.fillText("PRESS 'SPACE BAR' TO START", 350 / 2, 330);
		}
		if (this.gamestate === GAMESTATE.GAMEOVER) {
			ctx.rect(0, 0, 350, 520);
			ctx.fillStyle = "rgba(0,0,0,0.5)";
			ctx.fill();

			ctx.font = "40px Comic Sans MS";
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.fillText("DEAD", 350 / 2, 180);
			ctx.font = "30px Comic Sans MS";
			ctx.fillText("YOUR SCORE: " + this.score, 350 / 2, 240);
			ctx.font = "22px Comic Sans MS";
			ctx.fillText("PRESS 'ENTER' TO RESTART", 350 / 2, 300);
		}
	}

	togglePause() {
		if (this.gamestate === GAMESTATE.PAUSE) {
			this.gamestate = GAMESTATE.RUNNING;
			this.audio1.play();
		} else {
			this.gamestate = GAMESTATE.PAUSE;
			this.audio1.pause();
		}
	}

	detectCollision() {
		for (var i = 0; i < this.ddongs.length; i++) {
			let dx = this.man.position.x - this.ddongs[i].x;
			let dy = this.man.position.y - this.ddongs[i].y;
			let dy1 = this.man.height - this.ddongs[i].size;
			let distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < dy1) {
				//console.log("shit!");
				return i;
			}
		}

		return -1;

	}
	detectCandy() {
		for (var i = 0; i < this.candies.length; i++) {
			let dx = this.man.position.x - this.candies[i].x;
			let dy = this.man.position.y - this.candies[i].y;
			let dy1 = this.man.height - this.candies[i].size;
			let distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < dy1) {
				//console.log("candy!");
				return i;
			} 
		}

		return -1;
	}

	restart() {
		if (this.gamestate !== GAMESTATE.GAMEOVER) {
			return;
		} else {
			this.ddongs = [];
			this.candies = [];
			this.score = 0;
			this.hp = 100;
			this.gameClock = 0;
			this.gamestate = GAMESTATE.RUNNING;
		}
	}
}
