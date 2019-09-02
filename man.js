export default class Man {
	constructor(game) {
		this.Game_Width = 350;
		this.Game_Height = 520;
		this.image = document.getElementById("man");
		this.game = game;
		this.width = 35;
		this.height = 50;
		this.speed = 0;
		this.maxSpeed = 3;
		// 사람이 맨처음에 그려지는 위치
		this.position = {
			x: this.Game_Width / 2,
			y: this.Game_Height - 51
		};
	}
	moveLeft() {
		this.speed = -this.maxSpeed;
	}

	moveRight() {
		this.speed = +this.maxSpeed;
	}

	moveStop() {
		this.speed = this.maxSpeed * 0;
	}

	draw(ctx) {
		ctx.drawImage(
			this.image,
			this.position.x,
			this.position.y,
			this.width,
			this.height
		);
		// 체력 바, 게이지 그리기
		ctx.fillStyle = "#ff6464";
		ctx.fillRect(
			this.position.x - 2,
			this.position.y - 13,
			(40 / 100) * this.game.hp,
			10
		);
		ctx.font = "10px Comic Sans MS";
		ctx.fillStyle = "rgba(0,0,0,0.8)";
		ctx.fillText(this.game.hp, this.position.x + 17, this.position.y - 4);
	}

	update() {
		this.position.x = this.position.x + this.speed;
		if (this.position.x < 0) {
			this.position.x = this.Game_Width;
		}
		if (this.position.x > this.Game_Width) {
			this.position.x = 0;
		}
	}
}
